// import HelloWorld from "./components/HelloWorld.vue";
// export const schema = {
//   title: "这是一个标题",
//   config: {
//     inline: true,
//     labelSuffix: ":"
//   },
//   // visible: true,
//   items: {
//     name: {
//       label: "姓名",
//       component: "el-input",
//       // visible: true,
//       // disabled: true,
//       field: {
//         placeholder: "请输入姓名",
//         type: "text"
//       },
//       rules: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
//       config: {
//         labelWidth: "60px"
//       },
//       children: {
//         //   originName: {
//         //     // label: "原名",
//         //     // component: "el-input",
//         //     // field: {
//         //     //   placeholder: "请输入姓名",
//         //     //   type: "text"
//         //     // },
//         //     // rules: [
//         //     //   { required: true, message: "姓名不能为空", trigger: "blur" }
//         //     // ],
//         //     children: {
//         //       a: {
//         //         label: '123'
//         //       },
//         //       parentName: {
//         //         //   label: "亲人姓名",
//         //         //   component: "el-input",
//         //         //   field: {
//         //         //     placeholder: "请输入姓名",
//         //         //     type: "text"
//         //         //   },
//         //         //   rules: [
//         //         //     { required: true, message: "姓名不能为空", trigger: "blur" }
//         //         //   ]
//         //       }
//         //     }
//         //   }
//       }
//     },
//     age: {
//       label: "年龄",
//       component: "el-input",
//       field: {
//         placeholder: "请输入年龄",
//         type: "text"
//       },
//       visible: true,
//       rules: [
//         { required: true, message: "年龄不能为空", trigger: "blur" },
//         { type: "number", message: "请输入数字", trigger: "blur" }
//       ],
//       config: {
//         labelWidth: "60px"
//       }
//     },
//     home: {
//       label: {
//         render: h => {
//           return <HelloWorld a="123" />;
//         }
//       },
//       component: {
//         render: h => {
//           return <el-input a="a"></el-input>;
//         }
//       },
//       // component: HelloWorld,
//       // field: {

//       // },
//       visible: true,
//       rules: [{ required: true, message: "请选择家乡", trigger: "blur" }],
//       config: {
//         labelWidth: "120px"
//       }
//     }
//   }
// };

// export const model = {
//   name: "",
//   age: ""
// };
