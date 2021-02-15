<template>
  <div class="componentIndex">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElFormSchema from '../../../dist/el-form-schema.common'
import '../../../dist/el-form-schema.css'

Vue.use(ElementUI, {
  size: 'medium'
})
Vue.use(ElFormSchema)

export default {
}
</script>