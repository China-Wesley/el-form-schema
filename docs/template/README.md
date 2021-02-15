## Template

```vue
<el-form-schema
  ref="form"
  :schema="schema"
  :model="model"
  :layout="layout"
  cancel-button
  submit-button
  reset-button
  button
  @cancel="cancelHand"
  @submit="submitHand"
  @reset="resetHand"
  @add="addFunc"
  @remove="removeFunc"
  @validate="handleValidate"
></el-form-schema>
```

## Atts


| 属性         | 说明                            | 类型  |  Required | 默认值 |
| :-------------: |:-------------------------------:| :-----:| :------:| :-------:|
| schema     | 描述form的结构，以及form的各项配置  | object |   true  |     -     |
| model      | form所要映射的对象                  |  object |   true  |  -       |
| layout    | form的布局                           |    object |  false|   -      |
| cancel-button | 取消按钮  | boolean |   false  |     true     |
| submit-button | 提交按钮  | boolean |   false  |     true     |
| reset-button     | 重置按钮  | boolean |   false  |     true     |
| button     | 为真时，会开启上述三个按钮  | boolean |   false  |     false     |

## Event

| 事件          | 说明                            |  参数   |
| :-------------: |:-------------------------------:| :------: |
| validate     | 该事件与Element UI相同   |        -     |
| cancel     | 取消按钮的事件   |    -       |
| submit     | 提交按钮的事件   |     -      |
| reset     | 重置按钮的事件   |     -        |
| add     | 当某个item, 它的type="array"时,会出现增加按钮,此为增加按钮的事件   |   当前item对应的  prop, model, schema      |
| remove     | 当某个item, 它的type="array"时,会出现增加按钮,此为增加按钮的事件   |   当前item对应的  prop, model, schema      |

## Methods

| 方法          |      说明                  |               参数         |
| :-------------: |:-------------------------------------:|:------------------------------------------------:|
|     getRef()    |   可以获取每一个item、field、一级item的ref   | (prop?, type?)  prop: 对应model的属性名、 type: 'field'、'item' 如果什么都不传，会获取一级item的ref |
| ... | 其余方法与Element 一致 | - |

## Slot

|     name         |      说明    |
| :---------------:| :-----------: |
|     -           |  -            |

## Form Item

|     name         |      说明    |
| :---------------:| :-----------: |
|     -           |  form-item的配置可以在schema中定义            |