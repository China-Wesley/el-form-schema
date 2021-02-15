## 数据结构

::: details 点击查看代码

```js
schema = {
  title: "", // 是整个form的标题
  border: true,
  config: {}, // 可以配置整个表单
  description: "",
  buttonConfig: {
    common: {},
    cancelButton: {},
    submitButton: {},
    resetButton: {},
  },
  visible: true,
  items: {
    // items是独一无二的
    [prop]: {
      label: "", //item的label
      type: "number" || "array" || "object", // 这里是传值的类型
      component: "" || Function || { render: () => {} }, //这个可以传入自定义组件，或者固定的值如 input、select、colorPicker等
      disabled: true,
      visible: true,
      events: {}, // 传入component item的事件
      field: {
        option, // [{label: "", value: 1}] // option要保持这种格式
        ...elementFieldSet, // element自带的表单设置
        inner: "" || Component || { render: () => {} }, // slot非具名的
        // 实际上就是传入component的配置，即form-item的各种属性
      },
      rules: [], // 这里面全部都是验证规则，应该和el-form保持一致
      config: {}, //单个item应该有单独的config
      children: {},
      dynamicProps: {}, // 当传入的是动态组件时，这个作为动态组件的prop传入其中
      slot: {
        tip: "" || { render: () => {} },
      }, // 可以循环嵌套的slot
      addable: true, // type = 'array' 时 增加和删除按钮，默认为true
      removeAble: true,
      addButton: {}, // 按钮的配置
      removeButton: {},
      items: {}, // 可嵌套的 当type='array' || type='object'时使用，映射model的结构
    },
  },
};
```

:::

## schema

|     属性     |                                   说明                                    |  类型   | 是否必填 | 默认值 |
| :----------: | :-----------------------------------------------------------------------: | :-----: | :------: | :----: |
|    title     |                             整个 form 的标题                              | string  |    否    |   -    |
| description  |                            整个表单的描述文字                             | string  |    否    |   -    |
|    border    | 给 form 添加上 border, 单纯的添加了一个类名, 我自己都觉得鸡肋（手动滑稽） | boolean |    否    |   -    |
| buttonConfig |                   为表单的三个按钮添加配置 (详情见下文)                   | object  |    否    |   -    |
|   visible    |                          控制整个表单的显示隐藏                           | boolean |    否    |  true  |
|    items     |    表单中的所有 form-item, 按照 model 的数据结构进行配置 (详情见下文)     | object  |    是    |   -    |

## buttonConfig

#### 按钮配置与 Element 相同

|     属性     |                    说明                    |  类型  | 是否必填 | 默认值 |
| :----------: | :----------------------------------------: | :----: | :------: | :----: |
|    common    | 三个按钮的通用配置， 与 element 的配置相同 | object |    否    |   -    |
| cancelButton |                取消按钮配置                | object |    否    |   -    |
| submitButton |                提交按钮配置                | object |    否    |   -    |
| resetButton  |                重置按钮配置                | object |    否    |   -    |

## items

#### items 中每个键-值对应 model 中的字段, 键名需与 model 的字段名相同

|       属性       |                                                                                                                 说明                                                                                                                  |      类型      | 是否必填 | 默认值 |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------: | :------: | :----: |
|      label       |                                                                                                          form item 的 label                                                                                                           |     string     |    否    |   -    |
|       type       | 输入的数据类型，为 number 时，input 只能输入 number，为 array 或者 object 时，对应的是 model 中，该字段的数据类型。即，当 model.demo = {} 时，那么 items.demo.type = "object",这是必须的，这样才能正确映射 model 的结构。array 同理。 |     string     |    否    |   -    |
|      items       |                                                     items 可以嵌套，当 type 为 object、array 时，items 是必填的，此时其他属性建议不要填写。在嵌套结构中，只保留 items、type 即可                                                      |     object     |    -     |   -    |
|    component     |            当前 form item 的表单元素，可选值 input、textarea、select、radio...支持所有 element 的表单元素。填写时省略'el-'即可。 也可以传入自定义组件、或者带有 render 的 vue 对象`'' || <Custom /> || {render: () => {}}`            | string、object |    -     |   -    |
|     disabled     |                                                                                                         控制 item 的 disabled                                                                                                         |    boolean     |    否    |   -    |
|     visible      |                                                                                                         控制 item 的显示隐藏                                                                                                          |     string     |    否    |   -    |
|      events      |                                                                                                field 的事件，如 input 的 change 事件等                                                                                                |     object     |    否    |   -    |
| field （见下文） |                                                                              field 的所有配置，通过 v-bind 绑定，支持所有 element 的配置（会在下文介绍）                                                                              |     string     |    否    |   -    |
|      rules       |                                                                                                         form item 的校验规则                                                                                                          |     array      |    否    |   -    |
|      config      |                                                                                                 form item 的 config，如 labelWidth 等                                                                                                 |     string     |    否    |   -    |
|   dynamicProps   |                                                                                 当传入的 component 是自定义的组件时，通过该属性将 prop 传入自定义组件                                                                                 |     string     |    否    |   -    |
|       slot       |                                                 所有 field 元素的 slot，键即为 slot 名，值和 component 一样，每条键名为 slot 名（见 element）`'' || <Custom /> || {render: () => {}}`                                                 |     object     |    否    |   -    |
|     addable      |                                                                                                  type 为 array 时，是否显示增加按钮                                                                                                   |    boolean     |    否    |  true  |
|    removeAble    |                                                                                                  type 为 array 时，是否显示删除按钮                                                                                                   |    boolean     |    否    |  true  |
|    addButton     |                                                                                                            增加按钮的配置                                                                                                             |     object     |    否    |   -    |
|   removeButton   |                                                                                                            删除按钮的配置                                                                                                             |     object     |    否    |   -    |
|    removeAble    |                                                                                                  type 为 array 时，是否显示删除按钮                                                                                                   |    boolean     |    否    |  true  |
|    removeAble    |                                                                                                  type 为 array 时，是否显示删除按钮                                                                                                   |    boolean     |    否    |  true  |

### field

|  属性  |                                         说明                                         |      类型      | 是否必填 | 默认值 |
| :----: | :----------------------------------------------------------------------------------: | :------------: | :------: | :----: |
| option | 当 component 为 select、radio、checkbox 等时，必填。结构为 `[{label: "", value: 1}]` |     array      |    是    |   -    |
| inner  | field 元素的默认 slot，类型和 component 一致`'' || <Custom /> || {render: () => {}}` | string、object |    否    |   -    |

## 例子

::: details 点击查看代码

```js
{
    title: "这是一个标题",
    border: true,
    description: "这是一段描述xxxxxxxxxxx",
    config: {
      inline: true,
      labelSuffix: ":",
      labelWidth: "120px",
      hideRequiredAsterisk: false,
      labelPosition: "top",
      statusIcon: true
    },
    buttonConfig: {
      common: {
        type: "primary ",
        size: "mini"
      },
      cancelButton: {
        type: "danger",
        inner: "修改",
        disabled: true
      }
      submitButton: {}
    },
    items: {
        date: {
          border: true,
          label: "date",
          type: "array",
          addable: false,
          addButton: {
            // type: "danger",
            // inner: "增加"
          },
          removeButton: {
            inner: "删除1",
            disabled: false
          },
          items: {
            label: "date",
            component: "input",
            rules: [
              { required: true, message: "年龄不能为空", trigger: "change" },
              { type: "number", message: "请输入数字", trigger: "change" }
            ]
          }
        },
        transfer: {
          label: "transfer",
          type: "object",
          items: {
            name: {
              label: "name",
              component: "input",
              rules: [
                { required: true, message: "年龄不能为空", trigger: "change" }
              ]
            },
            home: {
              type: "object",
              items: {
                address: {
                  type: "array",
                  label: "地址",
                  rules: [
                    {
                      required: true,
                      message: "嵌套",
                      trigger: "change"
                    }
                  ],
                  items: {
                    type: "object",
                    items: {
                      addr: {
                        component: "input"
                      }
                    }
                  }
                },
                parents: {
                  type: "object",
                  items: {
                    father: {
                      label: "father",
                      component: "input",
                      rules: [
                        { required: true, message: "嵌套", trigger: "change" }
                      ]
                    },
                    mather: {
                      label: "mather",
                      component: "slider",
                      rules: [
                        { required: true, message: "嵌套", trigger: "change" }
                      ]
                    }
                  }
                },
                flowers: {
                  label: "flowers",
                  component: "select",
                  rules: [
                    { required: true, message: "嵌套", trigger: "change" }
                  ],
                  field: {
                    multiple: true,
                    options: [
                      {
                        value: "1",
                        label: "上海"
                      },
                      {
                        value: "2",
                        label: "北京"
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        basic: {
          label: "基础数据类型",
          component: "input",
          border: "",
          events: {
            input: val => {
              console.log(val);
            }
          },
          rules: [{ required: true, message: "嵌套", trigger: "change" }],
          field: {
          }
        }
    }
}
```
:::
