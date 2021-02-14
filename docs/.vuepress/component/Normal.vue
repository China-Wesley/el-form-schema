<template>
  <el-form-schema
    ref="form"
    :schema="schema"
    :model="model"
    cancel-button
    submit-button
    reset-button
    button
    :layout="layout"
    @cancel="cancelHand"
    @submit="submitHand"
    @reset="resetHand"
    @validate="handleFunc"
    @add="addFunc"
    @remove="removeFunc"
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
    }
}
</script>