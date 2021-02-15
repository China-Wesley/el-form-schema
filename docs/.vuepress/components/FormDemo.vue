<template>
  <index>
    <div class="form-demo">
      <component :is="componentName" :class="componentName"></component>
    </div>
  </index>
</template>

<script>
import Index from './Index.vue'
import Normal from './Normal.vue'
import Simple from './Simple.vue'
// import ListForm from './ListForm.vue'
// import CustomLayoutForm from './CustomLayoutForm.vue'
// import ComplexForm from './ComplexForm.vue'

export default {
  components: {
    Index,
    Normal,
    Simple
  },

  props: {
    componentName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
// .form-demo /deep/ {
//   border: 1px solid #eaecef;
//   padding: 0px 20px;
//   margin-top: 20px;
//   border-radius: 6px;
// }
</style>