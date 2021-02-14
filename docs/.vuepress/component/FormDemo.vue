<template>
  <Index>
    <div class="form-demo">
      <component :is="componentName" :class="componentName"></component>
    </div>
  </Index>
</template>

<script>
import Index from './Index.vue'
import SimpleForm from './SimpleForm.vue'
import ListForm from './ListForm.vue'
import CustomLayoutForm from './CustomLayoutForm.vue'
import ComplexForm from './ComplexForm.vue'

export default {
  components: {
    Entrance,
    SimpleForm,
    ListForm,
    CustomLayoutForm,
    ComplexForm
  },

  props: {
    componentName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-demo /deep/ {
  border: 1px solid #eaecef;
  padding: 0px 20px;
  margin-top: 20px;
  border-radius: 6px;
}
</style>