import { VNode } from "vue";

export interface Schema {
  title?: string;
  config?: object;
  visible?: boolean;
  items: object;
}

export interface Item {
  label?: string;
  visible?: boolean;
  type?: string;
  disabled?: boolean;
  component: string | Render;
  rules?: object[] | object;
  config?: object;
  children?: object;
  dynamicProps?: object;
  componentSlot?: object;
}

export interface Render {
  (h?: any, context?: any): VNode | string;
}
