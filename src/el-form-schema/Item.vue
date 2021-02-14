<template>
  <el-form-item
    :ref="`${prop}_wzw_item`"
    v-if="showItem"
    :prop="prop"
    :rules="schema.rules"
    :label="isLabelString ? schema.label : ''"
    :style="
      `width: ${schema.width}; height: ${schema.height}; border: ${
        schema.border ? '1px solid #e4e7ed;' : ''
      }`
    "
    :class="`el-schema-form-item-${prop} el-schema-form-item`"
    v-bind="schema.config"
  >
    <!-- label -->
    <template
      v-if="!isLabelString && !isBasicItem.flag && !schema.items"
      slot="label"
    >
      <component
        :is="schema.label"
        :for="prop"
        :class="`el-form-schema-item-label-${prop}`"
      ></component
      >{{ labelSuffix }}
    </template>
    <!-- 组件部分(基础数据类型) -->
    <field
      v-if="isBasicItem.flag"
      :ref="prop"
      :dynamic-component="getdDynamicComponent"
      :prop="prop"
      :model="model"
      :schema="schema"
      :parent-schema="parentSchema"
      v-bind="{ ...schema.field, ...schema.dynamicProps }"
    ></field>
    <!-- type === 'object' -->
    <template v-else-if="isBasicItem.type === 'object'">
      <el-form-schema-item
        v-for="(innerSchema, _prop) in schema.items"
        :ref="prop"
        :key="_prop"
        :prop="`${prop}.${_prop}`"
        :schema="innerSchema"
        :parent-schema="schema"
        :labelSuffix="labelSuffix"
      ></el-form-schema-item>
    </template>
    <!-- type === 'array' -->
    <template v-else>
      <!-- 之所以判断，是因为不能对model造成影响，没想到什么好方法，在model为[]时还能有一个默认的 -->
      <template v-if="getArrayModel.targetModel.length !== 0">
        <el-form-schema-item
          v-for="(item, index) in getArrayModel.targetModel"
          :key="`${prop.replace(/\./g, '.').replace(/\[\]/g, '_')}[${index}]`"
          :ref="prop"
          :prop="`${prop}[${index}]`"
          :model="model"
          :schema="schema.items"
          :parent-schema="schema"
          :labelSuffix="labelSuffix"
        ></el-form-schema-item>
      </template>
      <div :class="`${prop} array-item-button-wrap`">
        <common-button
          v-if="schema.addable === undefined ? true : schema.addable"
          :config="
            schema.addButton
              ? schema.addButton
              : {
                  inner: '增加'
                }
          "
          :prop="`addButton${prop}`"
          @click="_handleAddButton"
        ></common-button>
        <!-- 自由度放开 :disabled="getArrayModel.targetModel.length <= 1" -->
        <common-button
          v-if="schema.removeAble === undefined ? true : schema.removeAble"
          :config="
            schema.removeButton
              ? schema.removeButton
              : {
                  inner: '删除'
                }
          "
          :prop="`removeAble${prop}`"
          @click="_handleRemoveButton"
        ></common-button>
      </div>
    </template>
  </el-form-item>
</template>

<script lang="ts">
/* @ts-ignore */
import Field from "./Field";
/* @ts-ignore */
import CommonButton from "./Button";
import _ from "lodash";
import {
  isEmptyObject,
  hasOwnProperty,
  checkStringHaveHtml,
  getMatchFieldModel
} from "./util/index";
import { Item, Schema } from "./util/interface";
import { Vue, Component, Prop, Inject, Provide } from "vue-property-decorator";

@Component({
  name: "ElFormSchemaItem",
  components: {
    Field,
    CommonButton
  }
})
export default class ElFormSchemaItem extends Vue {
  @Prop({ required: true }) schema!: Item;
  @Prop({ required: true }) parentSchema!: Item | Schema;
  @Prop({ required: true }) prop!: string;
  @Prop({ required: false }) model!: object;
  @Prop({ required: false }) labelSuffix!: string;

  @Inject()
  gobleModel!: object;

  @Inject()
  gobleSchema!: object;

  @Inject()
  totalItemRefs!: any;

  @Provide()
  fieldModel = this.getArrayModel;

  @Inject()
  addField!: Function;

  @Inject()
  removeField!: Function;

  mounted() {
    this._exposeRef();
  }

  get getArrayModel() {
    return getMatchFieldModel(this.prop, this.gobleModel, this.gobleSchema);
  }

  get isNomalArrayItem() {
    return !this.schema.items && this.isBasicItem;
  }

  // 判断item是不是基础数据类型
  get isBasicItem() {
    if (this.schema.type === "object" || this.schema.type === "array") {
      if (!hasOwnProperty(this.schema, "items")) {
        // console.log(this.schema);
        console.error(
          `Please make sure, when item type === '${this.schema.type}', there must have 'items' attribute`
        );
      }
      return {
        flag: false,
        type: this.schema.type
      };
    } else {
      return {
        flag: true
      };
    }
  }

  get showItem() {
    return (
      this.schema &&
      !isEmptyObject(this.schema) &&
      (hasOwnProperty(this.schema, "visible")
        ? (this.schema as any).visible
        : true)
    );
  }

  get isLabelString() {
    if (typeof this.schema.label === "string") {
      return true;
    } else {
      return false;
    }
  }

  // component可以支持 标签名、Render语法
  get getdDynamicComponent() {
    // console.log(this.prop)
    // if (this.prop === "dd") {
    //   console.log(this.schema, this.prop)
    // }
    const component = this.schema.component;
    const cacheObj = { ...this.schema };
    this.$delete(cacheObj, "component");
    if (component) {
      if (typeof component === "string") {
        if (checkStringHaveHtml(component)) {
          console.error(
            "[el-form-schema] Error: Can't identify component, please checkout your schema 'component' attribute"
          );
          return null;
        } else {
          if (component.indexOf("el-") === 0) {
            return component;
          } else {
            // 判断radio等一类必须有options属性
            if (
              (component.includes("radio") ||
                component.includes("checkbox") ||
                component.includes("select")) &&
              !(
                (this.schema as any).field &&
                (this.schema as any).field.options &&
                (this.schema as any).field.options instanceof Array
              )
            ) {
              console.error(
                `[el-form-schema] Error: Please make sure ${this.prop} field have 'options' attribute and Array type, 'options' Must contain two attributes: value and label`
              );
              return "el-" + component;
            }
            // 给input这类字符串，添加上el-的前缀
            return "el-" + component;
          }
        }
      } else if (typeof component === "object") {
        return component;
      } else if (typeof component === "function") {
        return component;
      }
    }
    return "el-input";
  }

  // 暴露ref
  private _exposeRef() {
    _.forIn(this.$refs, (item: any, prop: any) => {
      if (prop.includes("_wzw_item")) {
        this.$set(this.totalItemRefs, prop, item);
      }
    });
  }

  private _handleAddButton() {
    this.addField(
      this.schema,
      _.get(this.gobleModel, this.prop, this.gobleModel),
      this.prop
    );
  }

  private _handleRemoveButton() {
    this.removeField(
      this.schema,
      _.get(this.gobleModel, this.prop, this.gobleModel),
      this.prop
    );
  }
}
</script>

<style lang="scss" scoped>
.el-form-schema-border {
  border: 1px solid #e4e7ed;
}
.el-schema-form-item {
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
}
.array-item-button-wrap {
  text-align: right;
  .el-button {
    display: inline-block;
  }
}
</style>
