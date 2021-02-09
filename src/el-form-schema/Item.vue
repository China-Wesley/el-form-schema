<template>
  <el-form-item
    v-if="showItem"
    :prop="prop"
    :rules="schema.rules"
    :label="isLabelString ? schema.label : ''"
    :style="`width: ${schema.width}; height: ${schema.height}`"
    :class="`el-schema-form-item-${prop}`"
    v-bind="schema.config"
  >
    <!-- label -->
    <template v-if="!isLabelString" slot="label">
      <component
        :is="schema.label"
        :for="prop"
        :class="`el-form-schema-item-label-${prop}`"
      ></component
      >{{ labelSuffix }}
    </template>
    <!-- 组件部分 -->
    <field
      :dynamic-component="getdDynamicComponent"
      :prop="prop"
      :model="model"
      :schema="schema"
      v-bind="{ ...schema.field, ...schema.dynamicProps }"
    ></field>
    <!-- children -->
    <template v-if="haveChildren">
      <el-form-schema-item
        v-for="(innerSchema, prop) in schema.children"
        :key="prop"
        :model="model"
        :prop="prop"
        :schema="innerSchema"
        :labelSuffix="labelSuffix"
      ></el-form-schema-item>
    </template>
  </el-form-item>
</template>

<script lang="ts">
/* @ts-ignore */
import Field from "./Field";
import {
  isEmptyObject,
  hasOwnProperty,
  checkStringHaveHtml
} from "./util/index";
import { Item } from "./util/interface";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "ElFormSchemaItem",
  components: {
    Field
  }
})
export default class ElFormSchemaItem extends Vue {
  @Prop({ required: true }) schema!: Item;
  @Prop({ required: true }) model!: object;
  @Prop({ required: true }) prop!: string;
  @Prop({ required: false }) labelSuffix!: string;

  get haveChildren() {
    return hasOwnProperty(this.schema, "children");
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
              return null;
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
}
</script>

<style lang="scss" scoped>
.el-schema-form-item {
  // width: 100%;
}
</style>
