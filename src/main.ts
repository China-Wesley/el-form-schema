import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import ElFormSchema from "./el-form-schema/index";

Vue.use(ElementUI, {
  size: "medium"
});
Vue.use(ElFormSchema);

// 阻止启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
