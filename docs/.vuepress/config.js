module.exports = {
  title: 'El Form Schema',
  description: '表单自动化解决方案',
  themeConfig: {
    nav: [
      { text: '文档', link: '/guide/' },
      { text: '案例', link: '/simple/' },
      { text: 'Element UI', link: 'https://element.eleme.cn/#/zh-CN/component/form' },
      { text: 'Github', link: 'https://github.com/China-Wesley/el-form-schema' }
    ],

    sidebar: [
      {
        title: '开始', // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          '/guide/'
        ]
      },

      {
        title: 'Template',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/template/',
        ]
      },

      {
        title: 'Schema',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/schema/',
        ]
      },

      {
        title: 'Layout',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/layout/',
        ]
      },

      {
        title: 'Simple',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/simple/',
        ]
      }
    ],

    smoothScroll: false
  }
}
  