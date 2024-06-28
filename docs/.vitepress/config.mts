import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress/',
  lastUpdated: true,

  themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      lastUpdatedText: "最近更新时间",
      docFooter: { prev: '上一篇', next: '下一篇' },

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' },
        { text: '反馈/交流', link: 'https://github.com/xie-dd/vitepress/discussions' },
        {
          text: '常用网站',
          items: [
            { text: 'hexo', link: 'https://19970622.xyz/' },
            { text: 'xie-dd.github.io', link: 'https://20161101.xyz/' },
            { text: 'xie-dd.github.io/vitepress', link: 'https://20161101.xyz/vitepress' },
            { text: 'xie-dd.github.io/mkdocs', link: 'https://20161101.xyz/mkdocs' },
            { text: 'xdd1997.github.io/docsify', link: 'https://xdd1997.github.io/docsify' },
          ]
        },
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
      
      search: {
      provider: 'local'
    }
  }
})
