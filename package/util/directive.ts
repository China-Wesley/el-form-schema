import Vue from "vue";

// 待优化---难以实现改变model的值，因为除了el外，其他参数都是静态的
Vue.directive("_model", {
  // bind: (el: any, binding: any) => {
  //   console.log(el, binding.value);
  // },
  // componentUpdated: (el: any, binding: any, VNode: any) => {
  //   if (binding.arg) {
  //     const { value, oldValue } = binding;
  //     if (binding.arg === "number") {
  //       const newValue = value.replace(oldValue, "");
  //       if (String(+newValue) === "NaN") {
  //       }
  //     } else if (binding.arg === "text") {
  //     }
  //   }
  // }
});
