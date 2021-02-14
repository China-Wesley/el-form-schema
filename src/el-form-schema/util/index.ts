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

/* 映射model */
let cache: any = "";
function findProp(obj: any, targetKey: any) {
  _.forIn(obj, (item, prop) => {
    if (prop !== targetKey) {
      if (typeof item === "object") {
        findProp(item, targetKey);
      } else {
        return;
      }
    } else {
      cache = item;
    }
  });
}

export function usePropFindValue(obj: any, targetKey: any) {
  findProp(obj, targetKey);
  return cache;
}

/* 按对象层级寻找母标属性、或按数组寻找 */
export function findAttributeFromObject(
  obj: any,
  floorProp: any,
  globalSchema: any
) {
  if (obj[floorProp] && typeof obj[floorProp] === "object") {
    if (obj[floorProp] instanceof Array) {
      const _schema = usePropFindValue(globalSchema, floorProp);
      if (!_schema.type) {
        return obj;
      }
      return obj[floorProp];
    } else {
      return obj[floorProp];
    }
  } else {
    return obj;
  }
}

/* 返回按照层级关系搜索后的model */
export function getMatchFieldModel(
  prop: string,
  originModel?: any,
  globalSchema?: any
) {
  let targetModelLevel = originModel;
  let targetProp = "";
  const propLevel: any = prop.split(/\.|\[|\]/g).filter(item => {
    return item === "" ? false : item;
  });
  targetProp = propLevel[propLevel.length - 1];
  propLevel.forEach((floorProp: any) => {
    targetModelLevel = findAttributeFromObject(
      targetModelLevel,
      floorProp,
      globalSchema
    );
  });
  return {
    targetModel: targetModelLevel,
    targetProp: targetProp
  };
}

/* 筛除对象中的一条或多条属性属性 */
export function removeAttr(obj: any, pick: string | any[]) {
  const keys: any = Object.keys(obj);
  if (typeof pick === "string") {
    _.remove(keys, key => {
      return pick === key ? true : false;
    });
  } else {
    pick.forEach((item, index) => {
      _.remove(keys, key => {
        return key === item ? true : false;
      });
    });
  }
  return _.pick(obj, keys);
}

/* 检测是数组是否有重复 */
export const hasDuplicates = (array: any[]) => {
  return array.some((elt, index) => {
    return array.indexOf(elt) !== index;
  });
};
