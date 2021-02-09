<template>
  <el-input v-model="model[config.prop]" v-bind="$attrs"></el-input>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },

  mounted() {
    console.log(this.config);
    // console.log(this.$listeners)
  }
};
</script>

<style></style>
