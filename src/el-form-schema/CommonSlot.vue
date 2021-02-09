<template>
  <div v-if="typeof component === 'string'">{{ component }}</div>
  <component v-else :prop="prop" :is="component"></component>
</template>

<script lang="ts">
// import * as _ from "lodash";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CommonSlot",
  components: {}
})
export default class CommonSlot extends Vue {
  @Prop({ required: true }) prop!: string;
  @Prop({ required: true }) component!: object | string;
  // get internalComponent() {

  // }
}
</script>

<style lang="scss"></style>
