<template>
  <el-button
    v-bind="config"
    v-on="$listeners"
    :class="`el-form-schema-button-${prop}`"
    :prop="prop"
    :disabled="
      disabled
        ? disabled
        : config.disabled === undefined
        ? false
        : config.disabled
    "
  >
    <!-- 默认slot -->
    <template v-if="config && config.inner">
      <span v-if="typeof config.inner === 'string'">
        {{ config.inner }}
      </span>
      <component v-else-if="config.inner.render" :is="config.inner"></component>
    </template>
    <!-- 具名的slot 可能有多个 -->
    <template v-if="config.slot">
      <common-slot
        v-for="(component, slot) in config.slot"
        :key="slot"
        :slot="slot"
        :prop="prop"
        :class="`button_slot_${slot}`"
        :component="component"
      />
    </template>
  </el-button>
</template>

<script lang="ts">
/* @ts-ignore */
// import _ from "lodash";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "Button",
  components: {}
})
export default class Button extends Vue {
  @Prop({ required: false }) prop!: any;
  @Prop({ required: false }) config!: object;
  @Prop({ required: false }) disabled!: boolean;
}
</script>

<style lang="scss"></style>
