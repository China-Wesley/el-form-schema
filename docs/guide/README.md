## 快速上手

::: warning
使用的 Element UI 版本为^2.15.0
:::

## 安装

```shell
yarn add https://github.com/China-Wesley/el-form-schema.git
```

### 引入 el-form-schema

```javascript
import ElFormSchema from 'el-form-schema'
import 'el-form-schema/dist/el-form-schema.css'

Vue.use(ElFormSchema)
```

## 例子
<FormDemo component-name="normal">
</FormDemo>

::: details 点击查看代码
### template
```vue
<el-form-schema
    ref="form"
    :schema="schema"
    :model="model"
    submit-button
    reset-button
    :layout="layout"
  >
</el-form-schema>
```
### model
```json
{
    "name": "",
    "region": "",
    "date1": "",
    "delivery": false,
    "type": [],
    "resource": "",
    "desc": ""
}
```

### layout
```json
[
  {
    "rowAttrs": {
      "type": "flex",
      "style": "flex-wrap: wrap;"
    },
    "col": [
      {
        "fields": [
          "name",
          "region",
          "date1",
          "delivery",
          "type",
          "resource",
          "desc"
        ]
      }
    ]
  }
]
```

### schema
```json
{
    "title": "普通表单",
    "description": "以一个最普通的表单来展现如何使用",
    "border": false,
    "config": {
        "labelPosition": "left",
        "inline": true
    },
    "buttonConfig": {
        "submitButton": {
            "inner": "立即创建",
            "type": "primary"
        }
    },
    "items": {
        "name": {
            "label": "项目名称",
            "component": "input",
            "rules": [
                {
                    "required": true,
                    "message": "请输入活动名称",
                    "trigger": "blur"
                },
                {
                    "min": 3,
                    "max": 5,
                    "message": "长度在 3 到 5 个字符",
                    "trigger": "blur"
                }
            ]
        },
        "region": {
            "label": "活动区域",
            "component": "select",
            "rules": [
                {
                    "required": true,
                    "message": "请选择活动区域",
                    "trigger": "change"
                }
            ],
            "field": {
                "options": [
                    {
                        "label": "区域一",
                        "value": 1
                    },
                    {
                        "label": "区域二",
                        "value": 2
                    }
                ]
            }
        },
        "date1": {
            "label": "活动时间",
            "component": "date-picker",
            "rules": [
                {
                    "type": "date",
                    "required": true,
                    "message": "请选择日期",
                    "trigger": "change"
                }
            ],
            "field": {
                "type": "date"
            }
        },
        "delivery": {
            "label": "即时配送",
            "component": "switch"
        },
        "type": {
            "label": "活动性质",
            "component": "checkbox",
            "rules": [
                {
                    "type": "array",
                    "required": true,
                    "message": "请至少选择一个活动性质",
                    "trigger": "blur"
                }
            ],
            "field": {
                "options": [
                    {
                        "label": "美食/餐厅线上活动",
                        "value": 1
                    },
                    {
                        "label": "地推活动",
                        "value": 2
                    },
                    {
                        "label": "线下主题活动",
                        "value": 3
                    },
                    {
                        "label": "单纯品牌曝光",
                        "value": 4
                    }
                ]
            }
        },
        "resource": {
            "label": "特殊资源",
            "component": "radio",
            "rules": [
                {
                    "required": true,
                    "message": "请选择活动资源",
                    "trigger": "change"
                }
            ],
            "field": {
                "options": [
                    {
                        "label": "线上品牌赞助商",
                        "value": 1
                    },
                    {
                        "label": "线下场地免费",
                        "value": 2
                    }
                ]
            }
        },
        "desc": {
            "label": "活动形式",
            "component": "input",
            "rules": [
                {
                    "required": true,
                    "message": "请填写活动形式",
                    "trigger": "blur"
                }
            ],
            "field": {
                "type": "textarea"
            }
        }
    }
}
```
:::