# AGENTS.md

## 项目概况
- Hexo 3.7.1 静态博客，主题 `themes/cactus-dark`，线上地址 `https://h-zan.github.io/`。
- 源码分支：`hexo`（默认分支）；静态站点发布分支：`master`（GitHub Pages 源根目录）。

## 核心铁律
1. **严禁改动历史随笔**：不得编辑、重命名或删除 `source/_posts/` 下既有文件。
2. **专栏与随笔隔离**：
   - AI 教程：`source/ai-tutorials/<slug>/index.md`（`layout: column_article`、`column: ai-tutorials`、`level: beginner|intermediate|advanced|ultimate`、`order: <数字>`）。
   - AI 热点：`source/ai-news/<YYYY-MM-DD>/index.md`（`layout: column_article`、`column: ai-news`）。
3. **内容与排版规范**：
   - 纯 Markdown 编写；中英双语段落用 `{% zh %}...{% endzh %}` / `{% en %}...{% enden %}`（支持页面一键切换），提示框用 `{% callout tip|info|warn|key "标题" %}...{% endcallout %}`。
   - 标题、共享代码块、表格与配图放双语标签外，确保三种阅读模式及 TOC 均正常显示。
   - 教程须深入浅出、含金量高、配图（存 `source/images/ai-tutorials/`，优先暗色 SVG 架构图）与权威外链；公式用零 CDN 依赖的 Unicode/代码块表达（主题未引入外部 KaTeX CDN）。
   - AI 热点须实时检索核验一手信源、注明日期与链接，禁止编造。
4. **文档维护**：写前规划并记入 `work.md`，完成后更新 `work.md`；通用技巧极简追加到本文件。

## 构建、避坑与发布技巧
- **依赖安装（npm 12+）**：`npm install --allow-git=all --no-save`（因 `hexo-asset-image` 为 git 依赖）。
- **Node 14+ 兼容**：Hexo 3.7.1 原生 `CacheStream.destroy()` 在 Node 14+ 会把生成产物清空为 0 字节；已由 `scripts/node-compat-generate.js` 永久修复，直接跑 `./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate` 即可。
- **Nunjucks 避坑**：Markdown 正文或行内代码中避免连续 `{{` / `}}`（JSON 嵌套末尾写成 `} }`），避免在 `{% zh %}` 内误写未闭合的多重反引号围栏。
- **发布上线**：源码推送至 `origin/hexo`，构建产物 `public/` 推送至 `origin/master`，并确保 GitHub Pages 源指向 `master /`。
