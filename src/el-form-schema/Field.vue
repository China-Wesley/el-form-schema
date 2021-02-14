<template>
  <div :class="`el-form-schema-field-wrap-${prop}`">
    <!-- 纯字符串 -->
    <span
      v-if="
        dynamicComponent === 'el-plain-text' &&
          (schema.visible ? schema.visible : true)
      "
      :ref="prop"
      v-bind="schema.field"
      v-on="getEventsName"
    >
      {{ String(gobleModel[prop]) }}
    </span>

    <!-- 链接 -->
    <template v-else-if="dynamicComponent === 'el-link'">
      <el-link
        :href="gobleModel[prop]"
        :ref="prop"
        v-bind="schema.field"
        :disabled="schema.disabled"
        v-on="getEventsName"
      >
        <template v-if="schema.field && schema.field.inner">
          <span v-if="typeof schema.field.inner === 'string'">
            {{ schema.field.inner }}
          </span>
          <component v-else :is="schema.field.inner"></component>
        </template>
        <span v-else>{{ gobleModel[prop] }}</span>
      </el-link>
    </template>

    <!-- input & type === 'number' -->
    <component
      v-else-if="
        (dynamicComponent === 'el-input' || !schema.component) &&
          (schema.type === 'number' || isNumberRule)
      "
      :ref="prop"
      :is="dynamicComponent"
      :disabled="schema.disabled"
      v-model.number="targetModel[targetProp]"
      v-bind="$attrs"
      v-on="getEventsName"
    >
      <template v-if="schema.slot">
        <common-slot
          v-for="(component, slot) in schema.slot"
          :key="slot"
          :slot="slot"
          :prop="prop"
          :class="`${dynamicComponent}_${slot}`"
          :component="component"
        />
      </template>
    </component>

    <!-- upload -->
    <template v-else-if="dynamicComponent === 'el-upload'">
      <el-upload
        v-bind="schema.field"
        :disabled="schema.disabled"
        v-on="getEventsName"
        :ref="prop"
      >
        <template v-if="schema.field.drag">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </template>
        <template v-else-if="schema.field.listType === 'picture-card'">
          <i class="el-icon-plus"></i>
        </template>
        <template v-else>
          <el-button size="small" type="primary">点击上传</el-button>
        </template>

        <!-- element-slot -->
        <template v-if="schema.slot">
          <common-slot
            v-for="(component, slot) in schema.slot"
            :key="slot"
            :slot="slot"
            :prop="prop"
            :class="`${dynamicComponent}_${slot}`"
            :component="component"
          />
        </template>
      </el-upload>
    </template>

    <!-- 单选框 -->
    <el-radio-group
      v-else-if="
        dynamicComponent === 'el-radio-group' || dynamicComponent === 'el-radio'
      "
      :ref="prop"
      :disabled="schema.disabled"
      v-bind="schema.field"
      v-model="targetModel[targetProp]"
      v-on="getEventsName"
    >
      <!-- 将 opt 的 value 属性传递给 label，label 属性只做展示，这里的用法与 element-ui 有一些区别，element-ui 的 label 为选中状态的值 -->
      <component
        v-for="opt in (schema.field && schema.field.options) || []"
        :is="schema.field.button ? 'el-radio-button' : 'el-radio'"
        :key="opt.value"
        :label="opt.value"
        v-bind="opt"
      >
        {{ opt.label }}
      </component>
    </el-radio-group>

    <!-- 多选框 -->
    <el-checkbox-group
      v-else-if="
        dynamicComponent === 'el-checkbox-group' ||
          dynamicComponent === 'el-checkbox'
      "
      :ref="prop"
      :disabled="schema.disabled"
      v-bind="schema.field"
      v-model="targetModel[targetProp]"
      v-on="getEventsName"
    >
      <component
        v-for="opt in (schema.field && schema.field.options) || []"
        :is="schema.field.button ? 'el-checkbox-button' : 'el-checkbox'"
        :key="opt.value"
        :label="opt.value"
        v-bind="opt"
      >
        {{ opt.label }}
      </component>
    </el-checkbox-group>

    <!-- 选择器 -->
    <el-select
      v-else-if="dynamicComponent === 'el-select'"
      :ref="prop"
      :disabled="schema.disabled"
      v-bind="schema.field"
      v-model="targetModel[targetProp]"
      v-on="getEventsName"
    >
      <el-option
        v-for="(opt, index) in (schema.field && schema.field.options) || []"
        :key="opt.value + '-' + index"
        v-bind="opt"
      >
        <!-- options slot -->
        <template v-if="opt.inner">
          <span v-if="typeof opt.inner === 'string'">
            {{ opt.inner }}
          </span>
          <component v-else :is="opt.inner"></component>
        </template>
      </el-option>
      <!-- select dlot -->
      <template v-if="schema.slot">
        <common-slot
          v-for="(component, slot) in schema.slot"
          :key="slot"
          :slot="slot"
          :prop="prop"
          :class="`${dynamicComponent}_${slot}`"
          :component="component"
        />
      </template>
    </el-select>

    <!-- no render -->
    <el-alert
      v-else-if="
        dynamicComponent &&
          typeof dynamicComponent === 'object' &&
          typeof dynamicComponent.render !== 'function'
      "
      title="未知组件类型，请确保component属性格式正确"
      type="error"
      :closable="false"
    >
    </el-alert>

    <!-- common component -->
    <component
      v-else
      :ref="prop"
      :is="dynamicComponent"
      :disabled="schema.disabled"
      v-model="targetModel[targetProp]"
      v-bind="$attrs"
      v-on="getEventsName"
    >
      <!-- 默认slot -->
      <template v-if="schema.field && schema.field.inner">
        <span v-if="typeof schema.field.inner === 'string'">
          {{ schema.field.inner }}
        </span>
        <component
          v-else-if="schema.field.inner.render"
          :is="schema.field.inner"
        ></component>
      </template>
      <!-- 具名的slot 可能有多个 -->
      <template v-if="schema.slot">
        <common-slot
          v-for="(component, slot) in schema.slot"
          :key="slot"
          :slot="slot"
          :prop="prop"
          :class="`${dynamicComponent}_${slot}`"
          :component="component"
        />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import * as _ from "lodash";
/* @ts-ignore */
import CommonSlot from "./CommonSlot.vue";
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { Item, Schema } from "./util/interface";

@Component({
  name: "Field",
  components: {
    CommonSlot
  }
})
export default class Field extends Vue {
  @Prop({ required: true }) dynamicComponent!: object;
  @Prop({ required: true }) prop!: string;
  @Prop({ required: false }) model!: object;
  @Prop({ required: true }) schema!: object;
  @Prop({ required: false }) parentSchema!: Item | Schema;
  @Prop({ required: false, default: false }) disabled!: object;

  @Inject()
  cacheProp!: string[];

  @Inject()
  gobleModel!: object;

  @Inject()
  fieldModel!: any;

  @Inject()
  gobleSchema!: any;

  @Inject()
  totalRefs!: any[];

  created() {
    // console.log(this.$refs)
  }

  mounted() {
    this._exposeRef();
  }

  private targetModel = this.fieldModel.targetModel;
  private targetProp: any = this.fieldModel.targetProp;

  get isNumberRule() {
    let flag = false;
    if ((this.schema as any).rules instanceof Array) {
      (this.schema as any).rules.forEach((item: any) => {
        _.forIn(item, (item, prop) => {
          if (prop === "type") {
            item === "number" ? (flag = true) : (flag = false);
          }
        });
      });
    } else {
      _.forIn((this.schema as any).rules, (item, prop) => {
        if (prop === "type") {
          item === "number" ? (flag = true) : (flag = false);
        }
      });
    }
    return flag;
  }

  // 事件名两种形式: 小驼峰、小短线都可以
  get getEventsName() {
    const cacheObj: any = {};
    _.forIn((this.schema as any).events, (item, prop) => {
      this.$set(
        cacheObj,
        prop.replace(/[A-Z]/g, e => {
          return "-" + e.toLowerCase();
        }),
        item
      );
    });
    return cacheObj;
  }

  // 暴露ref
  private _exposeRef() {
    _.forIn(this.$refs, (item, prop) => {
      this.$set(this.totalRefs, prop, item);
    });
  }
}
</script>

<style lang="scss"></style>
