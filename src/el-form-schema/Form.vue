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
        :parent-schema="schema"
        :ref="prop"
        :schema="innerSchema"
        :model="model"
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
import _ from "lodash";
/* @ts-ignore */
import ElFormSchemaItem from "./Item";
import { isEmptyObject, hasOwnProperty } from "./util/index";
import { Schema } from "./util/interface";
import { Vue, Component, Prop, Provide } from "vue-property-decorator";

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

  @Provide()
  gobleSchema = this.schema;

  @Provide()
  cacheProp = [];

  @Provide()
  gobleModel = this.model;

  @Provide()
  totalRefs = [];

  created() {
    console.log(this.totalRefs);
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
  // 获取ref,暴露给外边了
  public getRef(targetProp: string) {
    const modelStructObj = _.cloneDeep(this.model); // 具有model结构的
    // const targetPath: any[] = [];
    const totalProp: any = [];
    this.totalRefs.forEach(item => {
      _.forIn(item, (ref: any, prop: string) => {
        const propLevel: any = prop
          .split(/_wzw_object_split_|_wzw_array_split_|_wzw_array_index_/g)
          .filter((item: string) => {
            return item === "" ? false : item;
          });
        if (propLevel.includes(targetProp)) {
          totalProp.push(propLevel);
        }
        let origin = modelStructObj;
        for (let i = 0; i < propLevel.length; i++) {
          if (i < propLevel.length - 1) {
            origin = (origin as any)[propLevel[i]];
          } else {
            (origin as any)[propLevel[i]] = ref;
          }
        }
      });
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
    // let mostShortPath: any[] = [];
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
}
</script>

<style lang="scss"></style>
