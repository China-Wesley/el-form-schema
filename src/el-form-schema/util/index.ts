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

/* 检测数组重复元素的个数 */
// export function arrRepeatNum(arr: any[], ele: any) {
//   let count = 0;
//   _.forEach(arr, (item, index) => {
//     if (item === ele) {
//       count++
//     }
//   })
//   return count
// }
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
  gobleSchema: any
) {
  if (obj[floorProp] && typeof obj[floorProp] === "object") {
    if (obj[floorProp] instanceof Array) {
      const _schema = usePropFindValue(gobleSchema, floorProp);
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
  gobleSchema?: any
) {
  let targetModelLevel = originModel;
  let targetProp = "";
  const propLevel: any = prop
    .split(/_wzw_object_split_|_wzw_array_split_|_wzw_array_index_/g)
    .filter(item => {
      return item === "" ? false : item;
    });
  targetProp = propLevel[propLevel.length - 1];
  propLevel.forEach((floorProp: any) => {
    targetModelLevel = findAttributeFromObject(
      targetModelLevel,
      floorProp,
      gobleSchema
    );
  });
  return {
    targetModel: targetModelLevel,
    targetProp: targetProp
  };
}
