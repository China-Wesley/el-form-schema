<template>
  <div id="app">
    <el-form-schema ref="form" :schema="schema" :model="model">
    </el-form-schema>
  </div>
</template>

<script>
// import Select from "./views/select";
// import Input from "./views/Input";
// import { Vue, Component } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld";
// import {model, schema} from './demo'
// Component({
//   name: "App"
// })
// export default class App extends Vue {
//   private a() {
//     console.log(1);
//   }

//   // private schema = {
//   //   label: '123'
//   // }

//   private schema = schema

//   private model = model

//   private layout = {
//     inline: true
//     // labelWidth: "123px"
//   };
// }

export default {
  data() {
    return {
      id: 0,
      model: {
        name: "",
        age: "",
        home: "",
        text: "这里是纯字符串",
        link: "www.baidu.com",
        upload: undefined,
        color: "",
        radio: "1",
        checkbox: [1],
        select: "",
        inputNumber: 0,
        button: "1",
        cascader: "",
        cascaderPanel: "",
        switch: "",
        slider: 1
      }
    };
  },
  computed: {
    schema() {
      return {
        title: "这是一个标题",
        config: {
          inline: true,
          labelSuffix: ":",
          labelWidth: "120px",
          hideRequiredAsterisk: false,
          labelPosition: "left",
          statusIcon: true
        },
        // visible: true,
        items: {
          name: {
            label: "姓名",
            component: "input",
            // type: "number",
            // visible: true,
            // disabled: true,
            field: {
              placeholder: "请输入姓名",
              type: "text"
            },
            rules: [
              { required: true, message: "姓名不能为空", trigger: "blur" }
            ],
            config: {
              labelWidth: "60px"
            },
            children: {
              //   originName: {
              //     // label: "原名",
              //     // component: "el-input",
              //     // field: {
              //     //   placeholder: "请输入姓名",
              //     //   type: "text"
              //     // },
              //     // rules: [
              //     //   { required: true, message: "姓名不能为空", trigger: "blur" }
              //     // ],
              //     children: {
              //       a: {
              //         label: '123'
              //       },
              //       parentName: {
              //         //   label: "亲人姓名",
              //         //   component: "el-input",
              //         //   field: {
              //         //     placeholder: "请输入姓名",
              //         //     type: "text"
              //         //   },
              //         //   rules: [
              //         //     { required: true, message: "姓名不能为空", trigger: "blur" }
              //         //   ]
              //       }
              //     }
              //   }
            }
          },
          age: {
            label: "年龄",
            component: "input",
            field: {
              placeholder: "请输入年龄",
              type: "text",
              clearable: true
            },
            visible: true,
            rules: [
              { required: true, message: "年龄不能为空", trigger: "blur" },
              { type: "number", message: "请输入数字", trigger: "blur" }
            ],
            config: {
              labelWidth: "60px"
            }
          },
          home: {
            label: "动态组件",
            type: "number",
            field: {
              placeholder: "请填写家庭住址",
              type: "text"
            },
            // label: {
            //   render: (h, content) => {
            //     console.log(content)
            //     return (
            //       <el-form-item
            //         rules={[{ required: true, trigger: "blur" }]}
            //         prop="dynamic_component2"
            //         label="动态组件2"
            //       >
            //         <el-input
            //           value={this.model.home}
            //           onInput={val => {
            //             this.model.home = val;
            //           }}
            //         ></el-input>
            //       </el-form-item>
            //     );
            //   }
            // },
            // disabled: true,
            // component: Input,
            // dynamicProps: {
            //   config: {
            //     prop: "home",
            //   },
            //   model: this.model
            // },
            // component: "el-input",
            rules: [
              { required: true, message: "请选择动态组件" },
              { type: "number", message: "请输入数字" }
            ],
            componentSlot: {
              suffix: {
                render: () => {
                  return (
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      onClick={() => {
                        console.log("这里是input的slot的事件");
                      }}
                    ></i>
                  );
                }
              },
              prepend: {
                render: () => {
                  return (
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      onClick={() => {
                        console.log("这里是input的slot的事件");
                      }}
                    ></i>
                  );
                }
              },
              prefix: {
                render: () => {
                  return (
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      onClick={() => {
                        console.log("这里是input的slot的事件");
                      }}
                    ></i>
                  );
                }
              },
              append: "12313212"
            }
            // visible: false,
            // rules: [{ required: true, message: "请选择家乡", trigger: "blur" }],
            // config: {
            //   labelWidth: "120px"
            // }
          },
          text: {
            label: "纯字符串",
            component: "el-plain-text"
          },
          link: {
            label: "链接",
            component: "link",
            field: {
              type: "danger",
              inner: "123"
              // inner: {
              //   render: () => {
              //     return (
              //       <i
              //         class="el-icon-edit el-input__icon"
              //         slot="suffix"
              //         onClick={() => {
              //           console.log("这里是input的slot的事件");
              //         }}
              //       ></i>
              //     );
              //   }
              // }
            }
          },
          upload: {
            label: "文件上传",
            component: "upload",
            // disabled: true,
            field: {
              action: "https://jsonplaceholder.typicode.com/posts/",
              drag: true
              // listType: "picture-card",
            },
            componentSlot: {
              tip: "123"
              // trigger: '123'
            }
          },
          color: {
            label: "颜色选择",
            component: "color-picker"
          },
          radio: {
            label: "单选框",
            component: "radio-group",
            // disabled: true,
            field: {
              // 对整个radioGroup
              options: [
                {
                  value: "1",
                  label: "上海",
                  border: true
                },
                {
                  value: "2",
                  label: "北京",
                  disabled: true
                }
              ]
            }
          },
          checkbox: {
            label: "多选框",
            component: "checkbox",
            field: {
              options: [
                {
                  value: 1,
                  label: "美食/餐厅线上活动"
                },
                {
                  value: 2,
                  label: "地推活动"
                },
                {
                  value: 3,
                  label: "线下主题活动"
                },
                {
                  value: 4,
                  label: "单纯品牌曝光"
                }
              ]
            }
          },
          select: {
            label: "选择器",
            component: "select",
            field: {
              multiple: true,
              options: [
                {
                  value: "shanghai",
                  label: "上海",
                  disabled: true
                },
                {
                  value: "beijing",
                  label: "北京"
                }
              ]
            },
            componentSlot: {
              // defaultSlot: '123',
              // prefix: '123'
            }
          },
          inputNumber: {
            component: "input-number"
          },
          button: {
            component: {},
            field: {
              inner: {},
              autofocus: true
            }
          },
          cascader: {
            component: "cascader",
            field: {
              options: [
                {
                  value: "zhinan",
                  label: "指南",
                  children: [
                    {
                      value: "shejiyuanze",
                      label: "设计原则",
                      children: [
                        {
                          value: "yizhi",
                          label: "一致"
                        },
                        {
                          value: "fankui",
                          label: "反馈"
                        },
                        {
                          value: "xiaolv",
                          label: "效率"
                        },
                        {
                          value: "kekong",
                          label: "可控"
                        }
                      ]
                    },
                    {
                      value: "daohang",
                      label: "导航",
                      children: [
                        {
                          value: "cexiangdaohang",
                          label: "侧向导航"
                        },
                        {
                          value: "dingbudaohang",
                          label: "顶部导航"
                        }
                      ]
                    }
                  ]
                },
                {
                  value: "zujian",
                  label: "组件",
                  children: [
                    {
                      value: "basic",
                      label: "Basic",
                      children: [
                        {
                          value: "layout",
                          label: "Layout 布局"
                        },
                        {
                          value: "color",
                          label: "Color 色彩"
                        },
                        {
                          value: "typography",
                          label: "Typography 字体"
                        },
                        {
                          value: "icon",
                          label: "Icon 图标"
                        },
                        {
                          value: "button",
                          label: "Button 按钮"
                        }
                      ]
                    },
                    {
                      value: "form",
                      label: "Form",
                      children: [
                        {
                          value: "radio",
                          label: "Radio 单选框"
                        },
                        {
                          value: "checkbox",
                          label: "Checkbox 多选框"
                        },
                        {
                          value: "input",
                          label: "Input 输入框"
                        },
                        {
                          value: "input-number",
                          label: "InputNumber 计数器"
                        },
                        {
                          value: "select",
                          label: "Select 选择器"
                        },
                        {
                          value: "cascader",
                          label: "Cascader 级联选择器"
                        },
                        {
                          value: "switch",
                          label: "Switch 开关"
                        },
                        {
                          value: "slider",
                          label: "Slider 滑块"
                        },
                        {
                          value: "time-picker",
                          label: "TimePicker 时间选择器"
                        },
                        {
                          value: "date-picker",
                          label: "DatePicker 日期选择器"
                        },
                        {
                          value: "datetime-picker",
                          label: "DateTimePicker 日期时间选择器"
                        },
                        {
                          value: "upload",
                          label: "Upload 上传"
                        },
                        {
                          value: "rate",
                          label: "Rate 评分"
                        },
                        {
                          value: "form",
                          label: "Form 表单"
                        }
                      ]
                    },
                    {
                      value: "data",
                      label: "Data",
                      children: [
                        {
                          value: "table",
                          label: "Table 表格"
                        },
                        {
                          value: "tag",
                          label: "Tag 标签"
                        },
                        {
                          value: "progress",
                          label: "Progress 进度条"
                        },
                        {
                          value: "tree",
                          label: "Tree 树形控件"
                        },
                        {
                          value: "pagination",
                          label: "Pagination 分页"
                        },
                        {
                          value: "badge",
                          label: "Badge 标记"
                        }
                      ]
                    },
                    {
                      value: "notice",
                      label: "Notice",
                      children: [
                        {
                          value: "alert",
                          label: "Alert 警告"
                        },
                        {
                          value: "loading",
                          label: "Loading 加载"
                        },
                        {
                          value: "message",
                          label: "Message 消息提示"
                        },
                        {
                          value: "message-box",
                          label: "MessageBox 弹框"
                        },
                        {
                          value: "notification",
                          label: "Notification 通知"
                        }
                      ]
                    },
                    {
                      value: "navigation",
                      label: "Navigation",
                      children: [
                        {
                          value: "menu",
                          label: "NavMenu 导航菜单"
                        },
                        {
                          value: "tabs",
                          label: "Tabs 标签页"
                        },
                        {
                          value: "breadcrumb",
                          label: "Breadcrumb 面包屑"
                        },
                        {
                          value: "dropdown",
                          label: "Dropdown 下拉菜单"
                        },
                        {
                          value: "steps",
                          label: "Steps 步骤条"
                        }
                      ]
                    },
                    {
                      value: "others",
                      label: "Others",
                      children: [
                        {
                          value: "dialog",
                          label: "Dialog 对话框"
                        },
                        {
                          value: "tooltip",
                          label: "Tooltip 文字提示"
                        },
                        {
                          value: "popover",
                          label: "Popover 弹出框"
                        },
                        {
                          value: "card",
                          label: "Card 卡片"
                        },
                        {
                          value: "carousel",
                          label: "Carousel 走马灯"
                        },
                        {
                          value: "collapse",
                          label: "Collapse 折叠面板"
                        }
                      ]
                    }
                  ]
                },
                {
                  value: "ziyuan",
                  label: "资源",
                  children: [
                    {
                      value: "axure",
                      label: "Axure Components"
                    },
                    {
                      value: "sketch",
                      label: "Sketch Templates"
                    },
                    {
                      value: "jiaohu",
                      label: "组件交互文档"
                    }
                  ]
                }
              ]
            }
          },
          cascaderPanel: {
            label: "cascaderPanel",
            component: "el-cascader-panel",
            field: {
              options: [
                {
                  value: "zhinan",
                  label: "指南",
                  children: [
                    {
                      value: "shejiyuanze",
                      label: "设计原则",
                      children: [
                        {
                          value: "yizhi",
                          label: "一致"
                        },
                        {
                          value: "fankui",
                          label: "反馈"
                        },
                        {
                          value: "xiaolv",
                          label: "效率"
                        },
                        {
                          value: "kekong",
                          label: "可控"
                        }
                      ]
                    },
                    {
                      value: "daohang",
                      label: "导航",
                      children: [
                        {
                          value: "cexiangdaohang",
                          label: "侧向导航"
                        },
                        {
                          value: "dingbudaohang",
                          label: "顶部导航"
                        }
                      ]
                    }
                  ]
                },
                {
                  value: "zujian",
                  label: "组件",
                  children: [
                    {
                      value: "basic",
                      label: "Basic",
                      children: [
                        {
                          value: "layout",
                          label: "Layout 布局"
                        },
                        {
                          value: "color",
                          label: "Color 色彩"
                        },
                        {
                          value: "typography",
                          label: "Typography 字体"
                        },
                        {
                          value: "icon",
                          label: "Icon 图标"
                        },
                        {
                          value: "button",
                          label: "Button 按钮"
                        }
                      ]
                    },
                    {
                      value: "form",
                      label: "Form",
                      children: [
                        {
                          value: "radio",
                          label: "Radio 单选框"
                        },
                        {
                          value: "checkbox",
                          label: "Checkbox 多选框"
                        },
                        {
                          value: "input",
                          label: "Input 输入框"
                        },
                        {
                          value: "input-number",
                          label: "InputNumber 计数器"
                        },
                        {
                          value: "select",
                          label: "Select 选择器"
                        },
                        {
                          value: "cascader",
                          label: "Cascader 级联选择器"
                        },
                        {
                          value: "switch",
                          label: "Switch 开关"
                        },
                        {
                          value: "slider",
                          label: "Slider 滑块"
                        },
                        {
                          value: "time-picker",
                          label: "TimePicker 时间选择器"
                        },
                        {
                          value: "date-picker",
                          label: "DatePicker 日期选择器"
                        },
                        {
                          value: "datetime-picker",
                          label: "DateTimePicker 日期时间选择器"
                        },
                        {
                          value: "upload",
                          label: "Upload 上传"
                        },
                        {
                          value: "rate",
                          label: "Rate 评分"
                        },
                        {
                          value: "form",
                          label: "Form 表单"
                        }
                      ]
                    },
                    {
                      value: "data",
                      label: "Data",
                      children: [
                        {
                          value: "table",
                          label: "Table 表格"
                        },
                        {
                          value: "tag",
                          label: "Tag 标签"
                        },
                        {
                          value: "progress",
                          label: "Progress 进度条"
                        },
                        {
                          value: "tree",
                          label: "Tree 树形控件"
                        },
                        {
                          value: "pagination",
                          label: "Pagination 分页"
                        },
                        {
                          value: "badge",
                          label: "Badge 标记"
                        }
                      ]
                    },
                    {
                      value: "notice",
                      label: "Notice",
                      children: [
                        {
                          value: "alert",
                          label: "Alert 警告"
                        },
                        {
                          value: "loading",
                          label: "Loading 加载"
                        },
                        {
                          value: "message",
                          label: "Message 消息提示"
                        },
                        {
                          value: "message-box",
                          label: "MessageBox 弹框"
                        },
                        {
                          value: "notification",
                          label: "Notification 通知"
                        }
                      ]
                    },
                    {
                      value: "navigation",
                      label: "Navigation",
                      children: [
                        {
                          value: "menu",
                          label: "NavMenu 导航菜单"
                        },
                        {
                          value: "tabs",
                          label: "Tabs 标签页"
                        },
                        {
                          value: "breadcrumb",
                          label: "Breadcrumb 面包屑"
                        },
                        {
                          value: "dropdown",
                          label: "Dropdown 下拉菜单"
                        },
                        {
                          value: "steps",
                          label: "Steps 步骤条"
                        }
                      ]
                    },
                    {
                      value: "others",
                      label: "Others",
                      children: [
                        {
                          value: "dialog",
                          label: "Dialog 对话框"
                        },
                        {
                          value: "tooltip",
                          label: "Tooltip 文字提示"
                        },
                        {
                          value: "popover",
                          label: "Popover 弹出框"
                        },
                        {
                          value: "card",
                          label: "Card 卡片"
                        },
                        {
                          value: "carousel",
                          label: "Carousel 走马灯"
                        },
                        {
                          value: "collapse",
                          label: "Collapse 折叠面板"
                        }
                      ]
                    }
                  ]
                },
                {
                  value: "ziyuan",
                  label: "资源",
                  children: [
                    {
                      value: "axure",
                      label: "Axure Components"
                    },
                    {
                      value: "sketch",
                      label: "Sketch Templates"
                    },
                    {
                      value: "jiaohu",
                      label: "组件交互文档"
                    }
                  ]
                }
              ]
            }
          },
          switch: {
            component: "switch",
            field: {}
          },
          slider: {
            component: "slider",
            field: {
              width: "100px",
              showInput: true
            }
          }
        }
      };
    }
  },
  methods: {
    handleIconClick() {
      console.log("这里是input的slot的事件");
    }
  }
};
</script>

<style lang="scss"></style>
