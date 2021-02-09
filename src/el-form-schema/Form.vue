<template>
  <el-form
    v-if="showForm"
    :model="model"
    v-bind="schema.config"
    class="el-form-schema"
    v-on="$listeners"
  >
    <!-- form-item -->
    <template>
      <el-form-schema-item
        v-for="(innerSchema, prop) in schema.items"
        :model="model"
        :schema="innerSchema"
        :key="prop"
        :prop="prop"
        :labelSuffix="labelSuffix"
      >
      </el-form-schema-item>
    </template>
    <!-- button -->
    <template> </template>
  </el-form>
</template>

<script lang="ts">
/* @ts-ignore */
import ElFormSchemaItem from "./Item";
import { isEmptyObject, hasOwnProperty } from "./util/index";
import { Schema } from "./util/interface";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "ElFoemSchema",
  components: {
    ElFormSchemaItem
  }
})
export default class ElFoemSchema extends Vue {
  @Prop({ required: true }) schema!: Schema;
  @Prop({ required: true }) model!: object;
  @Prop({ required: false }) layout!: object;

  mounted() {
    console.log(this.schema, this.model, this.layout, "这里是prop");
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

  // 这个form配置特殊，因为label重写了
  get labelSuffix() {
    return (
      this.schema &&
      this.schema.config &&
      (this.schema.config as any).labelSuffix
    );
  }

  // get _schema() {
  //   return _.forIn(this.schema.items, (item: any, prop) => {
  //     return item && item.type && item.type.replace()
  //   })
  // }
}
</script>

<style lang="scss"></style>
