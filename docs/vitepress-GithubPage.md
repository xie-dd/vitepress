

## 本地部署的主要流程
```matlab
npm install -g yarn
yarn add --dev vitepress

mkdir vitepress
cd vitepress

yarn vitepress init
# 需要回答几个简单的问题

yarn docs:dev
# yarn docs:build
http://localhost:5173
```

![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202407022126123.png)

```matlab
D:\Desktop\vitepress>tree /f
vitepress
│  .gitignore
│  package.json
│  README.md
│
├─docs
│  │  api-examples.md
│  │  index.md
│  │  markdown-examples.md
│  │
│  └─.vitepress
│      │  config.mts
│
└─node_modules

```


## 部署到Github Page

1. 新建文件 vitepress\.github\workflows\deploy.yml，内容为
```matlab
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [master]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:


# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: yarn install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: yarn docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. 将 vitepress 上传到github
3. github网站上进入vitepress仓库，设置，Pages，Build and deployment选择Github Actions
4. 修改文件 D:\Desktop\vitepress\docs\.vitepress\config.mts，添加`base: '/vitepress/',`
5. 完成


## 细节
参考：[https://juejin.cn/post/7164276166084263972](https://juejin.cn/post/7164276166084263972)

- 页脚
- 上一篇/下一篇
- 最近更新日期（需要在网页端才能看到）
- 编辑此页
- 搜索，vitepress-plugin-pagefind不支持中文，algolia需要申请，故使用本地搜索，支持中文但不友好
- 代码高亮


### 侧边栏与首页显示
![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202407022127884.png)<br />上面的部分是通过在index.md文件中添加下面代码实现的。
```matlab
- theme: alt
      text: hexo 部署
      link: /Hexo+Github Page+Github Action+语雀.md
```

![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202407022127951.png)<br />上面的部分是通过修改`config.mts`文件实现的。
```matlab
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
```


### Algolia 搜索
> 参考：[https://www.skillgroup.cn/framework/vitepress/algolia.html](https://www.skillgroup.cn/framework/vitepress/algolia.html)

1. Algolia 注册：首先，你需要申请一个 Algolia 账号。你可以在 [Algolia DocSearch 官网](https://docsearch.algolia.com/apply/) 申请一个免费账号
2. 登录：[https://dashboard.algolia.com/users/sign_in](https://dashboard.algolia.com/users/sign_in)；依次点击`Accept Application`与`Go to Application`

![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202407311608709.png)

3. 设置---API Keys---复制`Application ID`与`Search API Key`备用

![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202407311625446.png)

4. 添加文件.vitepress/config.js，config.js文件内容如下，需要修改`appId`，`apiKey`，`indexName`三项
```javascript
// .vitepress/config.js
import { defineConfig } from "vite";

export default defineConfig({
  themeConfig: {
    search: {
      // provider: 'local', // 可以开启本地搜索
      provider: "algolia",
      options: {
        appId: "你的appId",
        apiKey: "你的apiKey",
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
```

5. 完成
