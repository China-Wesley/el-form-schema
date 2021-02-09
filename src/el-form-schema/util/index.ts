import * as _ from "lodash";

/* 判断空对象 */
export function isEmptyObject(obj: object) {
  return _.isEmpty(obj);
}

/* 判断属性是否存在 */
export function hasOwnProperty(obj: object, property: string) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

/* 检测字符串是否含有html标签或或填写不规范 */
export function checkStringHaveHtml(str: string) {
  const reg = /<[^>]+>|<|>/g;
  return reg.test(str);
}
