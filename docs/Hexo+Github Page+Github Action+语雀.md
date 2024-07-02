

## 本地Hexo

1. 安装Node.js
2. 安装Git
3. 在本地新建文件夹 blog_hexo
```
cd D:\blog_hexo>
npm install hexo-cli -g
hexo init
npm install hexo-deployer-git --save
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

4. 修改_config.yml文件，将 theme: landscape修改成 theme: butterfly
5. 关于在左上角开启主页/分类/标签功能，请查阅 [分类/Tags显示404问题](https://blog.csdn.net/qq_43857095/article/details/108305144)
6. 在本地预览
```
hexo cl
hexo g
hexo s
```


## Hexo+Github Page

1. 在Github网页新建同名仓库 xie-dd.github.io
2. 修改 D:\blog_hexo\_config.yml 
```
deploy:
  type: git
  repo: https://github.com/xie-dd/xie-dd.github.io.git
  branch: master
```

3. 部署到远程
```
hexo g -d
```
> 注意：hexo g -d 会将 public 目录中的文件和目录推送至 _config.yml 中指定的远端仓库和分支中，并且完全覆盖该分支下的已有内容

4. 远程最终是这样的：

![](https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202310211646333.png)

5. 网页访问 [https://xie-dd.github.io/](https://xie-dd.github.io/) 即可


## Hexo+Github Page+Github Action
> 接着上面的blog_hexo文件夹操作
> 参考：[使用Hexo和Github Actions自动化博客更新-bilibili](https://www.bilibili.com/video/BV1XV411r7TG)

1. 访问 Github---头像（右上角）---Settings---Developer Settings---Personal access tokens---generate new token---创建的Token的名称随意，但必须勾选 repo 项 和 workflows 项---复制Token
2. 在Github创建用于存放博客所有文件的 **私有仓库  **blog_hexo_repo (必须是私有仓库，因为Token的问题我没解决掉
3. 点击仓库Setting---Sectets and variables---Actions---New repository secret---Name:DEPLOY_BLOG---Secrets:粘贴第1步复制的Token
4. 在本地blog_hexo文件夹创建新文件夹`.github`，在`.github`文件夹内新建 main.yml 文件
5. 在 main.yml 文件粘贴下面内容：
```
name: Deploy Hexo Blog

on:
  push:
    branches: [master]

jobs: 
  bulid:
    runs-on: ubuntu-latest
    steps: 
    - uses: actions/checkout@v2
    
    - name: Setup Node.js environment
      uses: actions/setup-node@v3.8.1
      with: 
        node-version: 18.12.1

    - name: Deploy Blog
      env:
        DEPLOY_BLOG: ${{secrets.DEPLOY_BLOG}}
      run: |
        git config --global user.name "xie-dd"
        git config --global user.email "xie-dd@outlook.com"
        npm install
        npm run build
        npm run deploy

```

6. 修改 D:\blog_hexo\_config.yml文件，将
```
deploy:
  type: git
  repo: https://github.com/xie-dd/xie-dd.github.io.git
  branch: master
```
修改为：
```
deploy:
  type: git
  repo: 
    github: 
      url: https://github.com/xie-dd/xie-dd.github.io.git
      branch: master
      token: 这里填写你的Token, 正是因为这里要填写Token，所以blog_hexo_repo仓库不能公开
```

7. 在本地blog_hexo文件夹将代码推送到远程
```
git init
git remote add origin https://github.com/xie-dd/blog_hexo_repo.git
git checkout -b master
git add .
git commit -m "github action update"
git push origin master
```

8. git上传结束后会触发Github Action, 然后会自动部署内容到博客页面
9. 未完待续
