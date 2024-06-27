import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xdd 帮助系统",
  description: "AA VitePress Site",
  base: '/vitepress/',
  lastUpdated: true,
  themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      lastUpdatedText: "最近更新时间",
      docFooter: { prev: '上一篇', next: '下一篇' },

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
      ],

      sidebar: [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
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
      }
  }
})
