<template>
  <el-form
    ref="_wzw_el_form_chema"
    v-if="showForm"
    :model="model"
    v-bind="schema.config"
    class="el-form-schema"
    v-on="$listeners"
    @validate="_handleValidate"
  >
    <!-- form-item -->
    <template>
      <el-form-schema-item
        v-for="(innerSchema, prop) in schema.items"
        :parent-schema="schema"
        :ref="prop"
        :schema="innerSchema"
        :model="model"
        :key="prop"
        :prop="prop"
        :labelSuffix="labelSuffix"
        @add-field="_handleAdd"
        @remove-field="_handleRemove"
      >
      </el-form-schema-item>
    </template>
    <!-- slot -->
    <slot></slot>
    <!-- button -->
    <el-form-item
      class="el-form-schema-button-wrap"
      v-if="
        showButton.button ||
          showButton.cancelButton ||
          showButton.submitButton ||
          showButton.resetButton
      "
    >
      <common-button
        v-if="showButton.button || showButton.resetButton"
        :config="resetButtonConfig"
        prop="resetButton"
        @click="_reset"
      ></common-button>
      <common-button
        v-if="showButton.button || showButton.cancelButton"
        :config="cancelButtonConfig"
        prop="cancelButton"
        @click="$emit('cancel')"
      >
      </common-button>
      <common-button
        v-if="showButton.button || showButton.submitButton"
        :config="submitButtonConfig"
        prop="submitButton"
        @click="_submit"
      >
      </common-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
/* @ts-ignore */
import ElFormSchemaItem from "./Item";
/* @ts-ignore */
import CommonButton from "./Button";
import _ from "lodash";
import { isEmptyObject, hasOwnProperty, removeAttr } from "./util/index";
import { Schema } from "./util/interface";
import { Vue, Component, Prop, Provide } from "vue-property-decorator";

@Component({
  name: "ElFoemSchema",
  components: {
    ElFormSchemaItem,
    CommonButton
  }
})
export default class ElFoemSchema extends Vue {
  @Prop({ required: true }) schema!: Schema;
  @Prop({ required: true }) model!: object;
  @Prop({ required: false }) layout!: object;
  @Prop({ required: false, default: false }) cancelButton!: boolean | string;
  @Prop({ required: false, default: false }) submitButton!: boolean | string;
  @Prop({ required: false, default: false }) resetButton!: boolean | string;
  @Prop({ required: false, default: false }) button!: boolean | string;

  @Provide()
  gobleSchema = this.schema;

  @Provide()
  cacheProp = [];

  @Provide()
  gobleModel = this.model;

  @Provide()
  totalRefs = {};

  @Provide()
  totalItemRefs = {};

  @Provide()
  defaultModel = _.cloneDeep(this.model);

  @Provide()
  addField = this._handleAdd;

  @Provide()
  removeField = this._handleRemove;

  private formRef = "_wzw_el_form_chema";

  private cancelButtonConfig = ((this.schema.buttonConfig as any) &&
    (this.schema.buttonConfig as any).cancelButton) || { inner: "取消" };
  private submitButtonConfig = ((this.schema.buttonConfig as any) &&
    (this.schema.buttonConfig as any).submitButton) || { inner: "提交" };
  private resetButtonConfig = ((this.schema.buttonConfig as any) &&
    (this.schema.buttonConfig as any).resetButton) || {
    inner: "重置"
  };

  /* schema为空或不存在都不显示el-form */
  get showForm() {
    return (
      this.schema &&
      !isEmptyObject(this.schema) &&
      (hasOwnProperty(this.schema, "visible")
        ? (this.schema as any).visible
        : true)
    );
  }

  get showButton() {
    const button = this.button;
    const cancelButton = this.cancelButton;
    const submitButton = this.submitButton;
    const resetButton = this.resetButton;
    return {
      button: button === "" ? true : button,
      cancelButton: cancelButton === "" ? true : cancelButton,
      submitButton: submitButton === "" ? true : submitButton,
      resetButton: resetButton === "" ? true : resetButton
    };
  }

  // 这个form配置特殊，因为label重写了
  get labelSuffix() {
    return (
      this.schema &&
      this.schema.config &&
      (this.schema.config as any).labelSuffix
    );
  }

  // 处理一下获取的ref数组
  private initTotalProp() {
    const itemRef: any = {}; // 每一个field的form-item
    const wrapRef: any = {}; // 一整个区块的form-item
    const refKeys: any[] = Object.keys(this.totalRefs);
    _.forIn(this.totalItemRefs, (item, prop) => {
      const key = prop.replace(/_wzw_item/g, "");
      if (refKeys.includes(key)) {
        this.$set(itemRef, prop.replace(/_wzw_item/g, ""), item);
      } else {
        this.$set(wrapRef, prop.replace(/_wzw_item/g, ""), item);
      }
    });
    return {
      itemRef: itemRef,
      wrapRef: wrapRef
    };
  }

  // 获取ref
  public getRef(targetProp: string, type = "item") {
    if (!targetProp) {
      return removeAttr(this.$refs, this.formRef);
    }
    return this.commonGetRefFunc(
      targetProp,
      type === "item"
        ? this.initTotalProp().itemRef
        : type === "field"
        ? this.totalRefs
        : removeAttr(this.$refs, this.formRef)
    );
  }

  // 获取ref,暴露给外边了
  private commonGetRefFunc(targetProp: string, refs: any) {
    const modelStructObj = _.cloneDeep(this.model); // 具有model结构的
    const totalProp: any = [];
    _.forIn(refs, (ref: any, path: string) => {
      _.set(modelStructObj, path, ref);
      const propLevel: any = path
        .split(/\.|\[|\]|_wzw_item/g)
        .filter((item: string) => {
          return item === "" ? false : item;
        });
      if (propLevel.includes(targetProp)) {
        totalProp.push(propLevel);
      }
    });
    // 如果直接搜的最外层就直接返回
    if ((modelStructObj as any)[targetProp]) {
      return (modelStructObj as any)[targetProp];
    } else {
      const res: any[] = this.findTargetProp(totalProp, targetProp).map(
        (item: any) => {
          return _.get(modelStructObj, item, modelStructObj);
        }
      );
      return res.length === 1 ? res[0] : res;
    }
  }

  // 通过搜索ref的prop找到路径
  private findTargetProp(props: any[], targetProp: any) {
    const totalProp = _.cloneDeep(props);
    const targetPath: any[] = [];
    let mostShortCount = 0;

    totalProp.forEach((item: any) => {
      if (mostShortCount > item.length || mostShortCount === 0) {
        mostShortCount = item.length;
      }
    });
    // 最短的可能有多个
    totalProp.forEach((item: any) => {
      if (item.length === mostShortCount) {
        targetPath.push(item);
      }
    });
    // 这里截取targetprop的index
    targetPath.map((item: any) => {
      const index = item.indexOf(targetProp);
      item.splice(index + 1);
      return item;
    });
    return _.uniqWith(targetPath, _.isEqual);
  }

  private _handleValidate() {
    //
  }

  private _submit() {
    this.validate((valid: any) => {
      if (valid) {
        this.$emit("submit");
      }
    });
  }

  private _reset() {
    this.resetFields();
    this.clearValidate();
    this.$emit("reset");
  }

  private _handleAdd(schema: object, model: any, prop: any) {
    this.$emit("add", prop, model, schema);
  }

  private _handleRemove(schema: object, model: any, prop: any) {
    this.$emit("remove", prop, model, schema);
  }

  public validate(callback: any) {
    return (this.$refs[this.formRef] as any).validate(callback);
  }

  public validateField(callback: any) {
    return (this.$refs[this.formRef] as any).validateField(callback);
  }

  public clearValidate(callback?: any) {
    return (this.$refs[this.formRef] as any).clearValidate(callback);
  }

  public resetFields() {
    return (this.$refs[this.formRef] as any).resetFields();
  }

  private _get(obj: object, path: any, defaultValue: any) {
    return _.get(obj, path, defaultValue);
  }

  private _set(obj: object, path: any, value: any) {
    _.set(obj, path, value);
  }
}
</script>

<style lang="scss"></style>
