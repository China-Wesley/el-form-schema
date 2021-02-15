<template>
  <el-form-schema
    ref="form"
    :schema="schema"
    :model="model"
    submit-button
    reset-button
    :layout="layout"
    @reset="handleReset"
  >
  </el-form-schema>
</template>

<script>
import model from './normal_model.json'
import schema from './normal_schema.json'
import layout from './normal_layout.json'
export default {
    data() {
      return {
        model,
        schema,
        layout
      }
    },
    methods: {
      handleReset() {
        this.$refs.form.clearValidate()
      }
    }
}
</script>