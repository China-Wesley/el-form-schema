## 布局 
  基于el-row、el-col封装，详细配置见element

## Row

| 属性         | 说明                            | 类型  |  是否必填 | 默认值 |
| :-------------: |:-------------------------:| :-----:| :------:| :-------:|
| title     |  行的标题  | string |   否  |     -     |
| rowAttrs     |  行配置  | object |   否  |     -     |
| col     |  行内的列  | array |   否  |     -     |

## Col

| 属性         | 说明                            | 类型  |  是否必填 | 默认值 |
| :-------------: |:-------------------------:| :-----:| :------:| :-------:|
| colAttrs     |  列配置  | string |   否  |     -     |
| fields     |  该列能显示的form item  | array |   是  |     -     |
| title     |  列标题  | string |   否  |     -     |

## 例子

::: details 点击查看代码
```js
[
  {
    title: "行一",
    description: "这是一段描述xxxxxxxxxxx",
    rowAttrs: {
      type: "flex",
      style: "flex-wrap: wrap;"
    },
    col: [
      {
        colAttrs: {
          span: 12
        },
        fields: ["date"],
        title: "列标题一",
        description: "这是一段描述xxxxxxxxxxx"
      },
      {
        colAttrs: {
          span: 12
        },
        fields: ["basic", "transfer"],
        title: "列标题二"
      }
    ]
  },
  {
    title: "行二",
    col: [
      {
        fields: ["name"]
      }
    ]
  }
];
```
:::