<template>
  <el-form
    ref="_wzw_el_form_chema"
    v-if="showForm"
    :model="model"
    v-bind="schema.config"
    :class="{
      'el-form-schema': true,
      'el-form-schema-border': schema.border
    }"
    v-on="$listeners"
    @validate="_handleValidate"
  >
    <!-- form-item -->
    <h2>{{ schema.title }}</h2>
    <template v-for="(rowItem, rowIndex) in innerLayout">
      <div
        :class="{
          'el-form-schema-inner': true,
          'el-form-schema-border': schema.border
        }"
        :key="rowIndex"
      >
        <h3 v-if="rowItem.title" class="el-form-shcema-row-title">
          {{ rowItem.title }}
        </h3>
        <el-row v-bind="{ gutter: 0, ...rowItem.rowAttres }">
          <el-col
            v-for="(colItem, colIndex) in rowItem.col"
            :key="colIndex"
            v-bind="{ span: 24, ...colItem.colAttrs }"
          >
            <h4 v-if="colItem.title" class="el-schema-form-col-title">
              {{ colItem.title }}
            </h4>
            <template v-if="_colHasFields(colItem)">
              <el-form-schema-item
                v-for="(innerSchema, prop) in _filterFields(colItem.fields)
                  .items"
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
          </el-col>
        </el-row>
      </div>
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
        :config="{ ...resetButtonConfig, ...commonButtonConfig }"
        prop="resetButton"
        @click="_reset"
      ></common-button>
      <common-button
        v-if="showButton.button || showButton.cancelButton"
        :config="{ ...cancelButtonConfig, ...commonButtonConfig }"
        prop="cancelButton"
        @click="$emit('cancel')"
      >
      </common-button>
      <common-button
        v-if="showButton.button || showButton.submitButton"
        :config="{ ...submitButtonConfig, ...commonButtonConfig }"
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
import {
  isEmptyObject,
  hasOwnProperty,
  removeAttr,
  hasDuplicates
} from "./util/index";
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
  @Prop({ required: false }) layout!: any[];
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
  private commonButtonConfig =
    (this.schema.buttonConfig as any) &&
    (this.schema.buttonConfig as any).common;

  mounted() {
    console.log(this._filterFields(["date"]));
  }

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

  /* 布局配置只针对一级items,嵌套无效 */
  get innerLayout() {
    if (!this.layout || (this.layout as any).length === 0) {
      const fields: any[] = [];

      _.forIn(this.schema.items, (value, prop) => fields.push(prop));

      return [
        // row config
        // 默认只有一行
        {
          // title: '',
          // rowAttrs: {},
          // col config
          // 默认只有一列，且当前列拥有所有的表单项
          col: [
            {
              // title: '',
              colAttrs: {
                span: 24
              },
              fields: fields
            }
          ]
        }
      ];
    }

    let fields: any[] = [];

    this.layout.forEach(row => {
      row.col.forEach((item: any) => {
        fields = [...fields, ...item.fields];
      });
    });

    if (hasDuplicates(fields)) {
      throw new Error(`请检查 layout 的 fields，存在重复使用的情况，${fields}`);
    }

    return this.layout;
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

  private _colHasFields(col: {
    fields: string[];
    title: string;
    colAttrs: {};
  }) {
    return col && col.fields && col.fields.length > 0;
  }

  private _filterFields(fields: any[]) {
    const newFields = {};
    const cloneFields = _.cloneDeep(this.schema.items);
    // console.log(this.schema, '这里是')
    if (Array.isArray(fields) && fields.length > 0) {
      _.each(fields, prop => {
        if ((cloneFields as any)[prop]) {
          (newFields as any)[prop] = (cloneFields as any)[prop];
        }
      });
    }

    return {
      ...this.schema,
      items: newFields
    };
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
    this.$nextTick(() => {
      this.$emit("reset");
    });
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

<style lang="scss">
.el-form-schema {
  box-sizing: border-box;
}
.el-form-schema-border {
  border: 1px solid #e4e7ed;
}
.el-form-schema {
  padding: 15px;
  .el-form-schema-inner {
    padding: 15px;
    // border: 1px solid #e4e7ed;
  }
}
.el-form-schema-button-wrap {
  width: 100%;
  text-align: right;
  .el-button {
    display: inline-block;
  }
}
</style>
