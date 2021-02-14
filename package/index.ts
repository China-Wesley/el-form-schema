/* eslint-disable */
import "./util/directive";
import ElFormSchema from "./Form.vue";

function install(Vue: any, opt = {}) {
  Vue.component("ElFormSchema", ElFormSchema);
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
  if ((install as any).installed) {
    install.installed = false;
  }
}

export default {
  version: "0.1.0",
  install
};

export { ElFormSchema };
