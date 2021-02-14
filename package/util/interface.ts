import { VNode } from "vue";

export interface Schema {
  title?: string;
  config?: object;
  visible?: boolean;
  items: object;
  buttonConfig?: object;
}

export interface Item {
  label?: string;
  visible?: boolean;
  type?: string;
  disabled?: boolean;
  component: string | Render;
  events?: object;
  rules?: object[] | object;
  config?: object;
  items?: object; // type === "object" || type === "array" 时必填
  dynamicProps?: object;
  slot?: object;
}

export interface Render {
  (h?: any, context?: any): VNode | string;
}

interface ButtonConfig {
  cancelButton?: object;
  submitButton?: object;
  resetButton?: object;
}
