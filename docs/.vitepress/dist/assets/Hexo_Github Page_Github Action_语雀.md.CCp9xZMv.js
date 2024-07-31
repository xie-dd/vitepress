import{_ as s,c as a,o as n,a3 as e}from"./chunks/framework.B6OY9LYM.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Hexo+Github Page+Github Action+语雀.md","filePath":"Hexo+Github Page+Github Action+语雀.md"}'),p={name:"Hexo+Github Page+Github Action+语雀.md"},i=e(`<h2 id="本地hexo" tabindex="-1">本地Hexo <a class="header-anchor" href="#本地hexo" aria-label="Permalink to &quot;本地Hexo&quot;">​</a></h2><ol><li>安装Node.js</li><li>安装Git</li><li>在本地新建文件夹 blog_hexo</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd D:\\blog_hexo&gt;</span></span>
<span class="line"><span>npm install hexo-cli -g</span></span>
<span class="line"><span>hexo init</span></span>
<span class="line"><span>npm install hexo-deployer-git --save</span></span>
<span class="line"><span>git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly</span></span>
<span class="line"><span>npm install hexo-renderer-pug hexo-renderer-stylus --save</span></span></code></pre></div><ol start="4"><li>修改_config.yml文件，将 theme: landscape修改成 theme: butterfly</li><li>关于在左上角开启主页/分类/标签功能，请查阅 <a href="https://blog.csdn.net/qq_43857095/article/details/108305144" target="_blank" rel="noreferrer">分类/Tags显示404问题</a></li><li>在本地预览</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hexo cl</span></span>
<span class="line"><span>hexo g</span></span>
<span class="line"><span>hexo s</span></span></code></pre></div><h2 id="hexo-github-page" tabindex="-1">Hexo+Github Page <a class="header-anchor" href="#hexo-github-page" aria-label="Permalink to &quot;Hexo+Github Page&quot;">​</a></h2><ol><li>在Github网页新建同名仓库 xie-dd.github.io</li><li>修改 D:\\blog_hexo_config.yml</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>deploy:</span></span>
<span class="line"><span>  type: git</span></span>
<span class="line"><span>  repo: https://github.com/xie-dd/xie-dd.github.io.git</span></span>
<span class="line"><span>  branch: master</span></span></code></pre></div><ol start="3"><li>部署到远程</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hexo g -d</span></span></code></pre></div><blockquote><p>注意：hexo g -d 会将 public 目录中的文件和目录推送至 _config.yml 中指定的远端仓库和分支中，并且完全覆盖该分支下的已有内容</p></blockquote><ol start="4"><li>远程最终是这样的：</li></ol><p><img src="https://mypic2016.oss-cn-beijing.aliyuncs.com/picGo/202310211646333.png" alt=""></p><ol start="5"><li>网页访问 <a href="https://xie-dd.github.io/" target="_blank" rel="noreferrer">https://xie-dd.github.io/</a> 即可</li></ol><h2 id="hexo-github-page-github-action" tabindex="-1">Hexo+Github Page+Github Action <a class="header-anchor" href="#hexo-github-page-github-action" aria-label="Permalink to &quot;Hexo+Github Page+Github Action&quot;">​</a></h2><blockquote><p>接着上面的blog_hexo文件夹操作 参考：<a href="https://www.bilibili.com/video/BV1XV411r7TG" target="_blank" rel="noreferrer">使用Hexo和Github Actions自动化博客更新-bilibili</a></p></blockquote><ol><li>访问 Github---头像（右上角）---Settings---Developer Settings---Personal access tokens---generate new token---创建的Token的名称随意，但必须勾选 repo 项 和 workflows 项---复制Token</li><li>在Github创建用于存放博客所有文件的 **私有仓库 **blog_hexo_repo (必须是私有仓库，因为Token的问题我没解决掉</li><li>点击仓库Setting---Sectets and variables---Actions---New repository secret---Name:DEPLOY_BLOG---Secrets:粘贴第1步复制的Token</li><li>在本地blog_hexo文件夹创建新文件夹<code>.github</code>，在<code>.github</code>文件夹内新建 main.yml 文件</li><li>在 main.yml 文件粘贴下面内容：</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>name: Deploy Hexo Blog</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches: [master]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jobs: </span></span>
<span class="line"><span>  bulid:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    steps: </span></span>
<span class="line"><span>    - uses: actions/checkout@v2</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - name: Setup Node.js environment</span></span>
<span class="line"><span>      uses: actions/setup-node@v3.8.1</span></span>
<span class="line"><span>      with: </span></span>
<span class="line"><span>        node-version: 18.12.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: Deploy Blog</span></span>
<span class="line"><span>      env:</span></span>
<span class="line"><span>        DEPLOY_BLOG: \${{secrets.DEPLOY_BLOG}}</span></span>
<span class="line"><span>      run: |</span></span>
<span class="line"><span>        git config --global user.name &quot;xie-dd&quot;</span></span>
<span class="line"><span>        git config --global user.email &quot;xie-dd@outlook.com&quot;</span></span>
<span class="line"><span>        npm install</span></span>
<span class="line"><span>        npm run build</span></span>
<span class="line"><span>        npm run deploy</span></span></code></pre></div><ol start="6"><li>修改 D:\\blog_hexo_config.yml文件，将</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>deploy:</span></span>
<span class="line"><span>  type: git</span></span>
<span class="line"><span>  repo: https://github.com/xie-dd/xie-dd.github.io.git</span></span>
<span class="line"><span>  branch: master</span></span></code></pre></div><p>修改为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>deploy:</span></span>
<span class="line"><span>  type: git</span></span>
<span class="line"><span>  repo: </span></span>
<span class="line"><span>    github: </span></span>
<span class="line"><span>      url: https://github.com/xie-dd/xie-dd.github.io.git</span></span>
<span class="line"><span>      branch: master</span></span>
<span class="line"><span>      token: 这里填写你的Token, 正是因为这里要填写Token，所以blog_hexo_repo仓库不能公开</span></span></code></pre></div><ol start="7"><li>在本地blog_hexo文件夹将代码推送到远程</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git init</span></span>
<span class="line"><span>git remote add origin https://github.com/xie-dd/blog_hexo_repo.git</span></span>
<span class="line"><span>git checkout -b master</span></span>
<span class="line"><span>git add .</span></span>
<span class="line"><span>git commit -m &quot;github action update&quot;</span></span>
<span class="line"><span>git push origin master</span></span></code></pre></div><ol start="8"><li>git上传结束后会触发Github Action, 然后会自动部署内容到博客页面</li><li>未完待续</li></ol>`,25),l=[i];function t(o,c,h,d,g,r){return n(),a("div",null,l)}const m=s(p,[["render",t]]);export{b as __pageData,m as default};
