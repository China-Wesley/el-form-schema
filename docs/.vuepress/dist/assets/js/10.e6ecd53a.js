(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{485:function(e,t,n){"use strict";n.r(t);var a={data:function(){return{model:{name:"Vue",age:"",home:{mather:"Mather",Father:"Father",address:""},friends:[{name:"React"},{name:"Angular"}],photo:""},schema:{title:"样例",border:!0,description:"这样描述一个表单",config:{inline:!0,labelSuffix:":"},buttonConfig:{submitButton:{type:"primary ",inner:"来，点我"},cancelButton:{disabled:!0}},items:{name:{label:"姓名",component:"input",field:{placeholder:"请输入姓名",type:"text"},rules:[{required:!0,message:"姓名不能为空",trigger:"blur"}]},age:{label:"年龄",component:"input",type:"number",field:{placeholder:"请输入年龄",type:"text",clearable:!0},rules:[{required:!0,message:"年龄不能为空",trigger:"change"},{type:"number",message:"请输入数字",trigger:"change"}],slot:{append:"我是具名插槽"}},home:{label:"家",border:!0,type:"object",items:{mather:{label:"妈妈",component:"input",disabled:!0},father:{label:"爸爸",component:"link",field:{inner:"可以是个链接(地址是model值)"}},address:{label:"家庭住址",component:"input",field:{type:"textarea"}}}},friends:{label:"朋友们",type:"array",items:{type:"object",border:!0,items:{name:{label:"姓名",component:"input",field:{disabled:!0},rules:[{required:!0,message:"姓名不能为空",trigger:"change"}]}}}},photo:{label:"上传照片",component:"upload",field:{action:"https://jsonplaceholder.typicode.com/posts/",listType:"picture-card"},slot:{tip:"上传的文件不要大于500KB"}}}},layout:[{title:"行一",description:"这是一段行描述",rowAttrs:{type:"flex",style:"flex-wrap: wrap;"},col:[{colAttrs:{span:12},fields:["name","age","home"],title:"列标题一",description:"这是一段列描述"},{colAttrs:{span:12},fields:["friends","photo"],title:"列标题二",description:"这是一段列描述"}]}]}},methods:{addFunc:function(e,t,n){t.push({name:""})},removeFunc:function(e,t,n){t.pop()}}},o=n(51),r=Object(o.a)(a,(function(){var e=this.$createElement;return(this._self._c||e)("el-form-schema",{ref:"form",attrs:{schema:this.schema,model:this.model,layout:this.layout,"submit-button":"","reset-button":""},on:{add:this.addFunc,remove:this.removeFunc}})}),[],!1,null,null,null);t.default=r.exports}}]);