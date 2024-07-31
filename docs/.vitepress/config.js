// .vitepress/config.js
import { defineConfig } from "vite";

export default defineConfig({
  themeConfig: {
    search: {
      // provider: 'local', // 可以开启本地搜索
      provider: "algolia",
      options: {
        appId: "9EIN89E0D1",
        apiKey: "fdb40772ab683340be5c2d3b1b94a1e6",
        indexName: "20161101",
        placeholder: "请输入关键词",
        translations: {
          button: {
            buttonText: "请输入关键词",
          },
        },
      },
    },
  },
});