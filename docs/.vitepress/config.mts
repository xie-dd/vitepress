import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xdd 帮助系统",
  description: "AA VitePress Site",
  base: '/vitepress/',
  lastUpdated: true,
  vite:{
    plugins:[pagefindPlugin()],
  },
  themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      lastUpdatedText: "最近更新时间",
      docFooter: { prev: '上一篇', next: '下一篇' },

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
      ],

      sidebar: [
    // 分为单侧边栏，多侧边栏，下面的是单侧边栏
      {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
            { text: 'Hexo+Github Page+Github Action+语雀', link: '/Hexo+Github Page+Github Action+语雀.md' }
              ]
            }
        ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ],

      editLink: {
        pattern: 'https://github.com/xie-dd/vitepress/edit/master/docs/:path',
        text: 'Edit this page'
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-2024 xie-dd'
      },
  }
})
