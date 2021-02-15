## 样例
  
<FormDemo component-name="simple">
</FormDemo>


::: details 点击查看代码
```vue
<template>
  <el-form-schema
    ref="form"
    :schema="schema"
    :model="model"
    :layout="layout"
    submit-button
    reset-button
    @add="addFunc"
    @remove="removeFunc"
  >
  </el-form-schema>
</template>

<script>
export default {
    data() {
      return {
        model: {
            name: "Vue",
            age: "",
            home: {
                mather: "Mather",
                Father: "Father",
                address: "",
            },
            friends: [{name: "React"}, {name: "Angular"}],
            photo: ""
        },
        schema: {
            title: "样例",
            border: true,
            description: "这样描述一个表单",
            config: {
                inline: true,
                labelSuffix: ":",
            },
            buttonConfig: {
              submitButton: {
                type: "primary ",
                inner: "来，点我",
              },
              cancelButton: {
                disabled: true
              }
            },
            items: {
                name: {
                    label: "姓名",
                    component: "input",
                    field: {
                      placeholder: "请输入姓名",
                      type: "text"
                    },
                    rules: [
                      { required: true, message: "姓名不能为空", trigger: "blur" }
                    ],
                },
                age: {
                    label: "年龄",
                    component: "input",
                    type: "number",
                    field: {
                      placeholder: "请输入年龄",
                      type: "text",
                      clearable: true
                    },
                    rules: [
                      { required: true, message: "年龄不能为空", trigger: "change" },
                      { type: "number", message: "请输入数字", trigger: "change" }
                    ],
                    slot: {
                        append: "我是具名插槽"
                    }
                },
                home: {
                    label: "家",
                    border: true,
                    type: "object",
                    items: {
                        mather: {
                            label: "妈妈",
                            component: "input",
                            disabled: true
                        },
                        father: {
                            label: "爸爸",
                            component: "link",
                            field: {
                                inner: "可以是个链接(地址是model值)"
                            }
                        },
                        address: {
                            label: "家庭住址",
                            component: "input",
                            field: {
                                type: "textarea"
                            }
                        }
                    }
                },
                friends: {
                    label: "朋友们",
                    type: "array",
                    items: {
                       type: "object",
                       border: true,
                       items: {
                           name: {
                               label: "姓名",
                               component: "input",
                               field: {
                                   disabled: true
                               },
                               rules: [
                                 { required: true, message: "姓名不能为空", trigger: "change" },
                               ],
                           }
                       }
                    }
                },
                photo: {
                   label: "上传照片",
                   component: "upload",
                   field: {
                     action: "https://jsonplaceholder.typicode.com/posts/",
                     listType: "picture-card"
                   },
                   slot: {
                     tip: "上传的文件不要大于500KB"
                   }
                }
            }
        },
        layout: [
          {
            title: "行一",
            description: "这是一段行描述",
            rowAttrs: {
              type: "flex",
              style: "flex-wrap: wrap;"
            },
            col: [
              {
                colAttrs: {
                  span: 12
                },
                fields: ["name", "age", "home"],
                title: "列标题一",
                description: "这是一段列描述"
              },
              {
                colAttrs: {
                  span: 12
                },
                fields: ["friends", "photo"],
                title: "列标题二",
                description: "这是一段列描述"
              }
            ]
          }
        ]
      }
    },
    methods: {
        addFunc(prop, model, schema) {
            model.push({name: ""})
        },
        removeFunc(prop, model, schema) {
            model.pop()
        }
    },
}
</script>
```
:::