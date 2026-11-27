# WORK.md — 项目任务与交接日志

> 本文件用于确保任意新会话都能在 1 分钟内掌握项目架构、当前进度、已知问题与操作方法。

## 1. 项目快速上手
- **仓库**：`H-Zan/H-Zan.github.io`（Hexo 3.7.1 + `cactus-dark` 主题）
- **线上地址**：https://h-zan.github.io/
- **分支策略**：
  - `hexo`：Hexo 源码分支（日常开发、写文章、改主题都在这里）
  - `master`：静态 HTML 部署分支（`public/` 构建产物推送到此分支，GitHub Pages 从 `master /` 提供服务）
- **核心文件与路由索引**：
  - `source/_posts/`：作者历史随笔（**只读，严禁改动**）
  - `source/ai-tutorials/` → `/ai-tutorials/`：AI 教程专栏（四级体系：初级 / 中级 / 高级 / 究极，已上线 8 篇中英双语图文教程）
  - `source/ai-news/` → `/ai-news/`：AI 热点大事件专栏（已上线首期 `2026-11-27` 日报）
  - `source/images/ai-tutorials/` & `source/images/ai-news/`：定制暗色封面图（2 张 JPG）+ 8 张高清暗色 SVG 架构图
  - `scripts/column-tags.js`：Hexo 双语标签（`zh` / `en`）与提示框标签（`callout`）插件
  - `scripts/node-compat-generate.js`：Hexo 3.7.1 在 Node 14+/22 下修复 0 字节输出 bug 的构建器
  - `themes/cactus-dark/layout/`：`ai_tutorials_index.ejs`、`ai_news_index.ejs`、`column_article.ejs`、`index.ejs`（首页专栏入口）、`layout.ejs`
  - `themes/cactus-dark/source/css/_partial/columns.styl`：暗色专栏卡片、双语切换器、表格、提示框与响应式排版样式

## 2. 已完成任务清单（2026-11-27 专栏建设与上线）
- [x] 调研仓库结构、Hexo 主题、Node/npm 构建环境与 GitHub Pages 配置
- [x] 检索并核验 2026-11-26/27 全球及国内最新 AI 热点一手信源
- [x] 制定建设计划并创建 `agents.md` 与 `work.md`
- [x] 开发 Hexo 自定义标签插件 `scripts/column-tags.js` 与 Node 14+ 兼容构建器 `scripts/node-compat-generate.js`
- [x] 扩展 `cactus-dark` 主题：导航栏、首页专栏入口、专栏列表页模板、双语文章模板（支持一键切换双语/仅中文/English + `localStorage` 记忆）与暗色阅读样式
- [x] 制作 2 张暗色主题封面图 + 8 张高清 SVG 技术架构图
- [x] 撰写并发布 8 篇四级中英双语 AI 教程：
  - 🌱 初级：`L1-01` 大模型底层原理与 Token/Embedding/采样、`L1-02` Prompt Engineering 六层工程实战
  - 🚀 中级：`L2-01` 生产级 Hybrid RAG + Rerank 全指南、`L2-02` AI Agent + Tool Use + MCP + ReAct 闭环
  - ⚡ 高级：`L3-01` Transformer & Self-Attention 图解与 PyTorch 手写、`L3-02` 微调 SFT/LoRA/QLoRA/DPO 与 Eval 闭环
  - 👑 究极：`L4-01` 推理引擎优化（KV Cache / PagedAttention / 量化 / 投机解码）、`L4-02` 推理模型 RLVR/GRPO 与多智能体编排
- [x] 撰写并发布首期 AI 热点大事件日报（`2026-11-27`，收录国家数据局 12 条 AI 数据新规、Neuralink FDA 关键试验、英伟达东南亚禁运与开源、Stanford Hazy Research 跨模型旋转、OpenAI/Google/Anthropic/Meta 动向等）
- [x] 执行全量构建校验（136 个静态文件全部非空、零坏链、零断图、`source/_posts/` 零改动）
- [x] 修正 GitHub Pages 源分支为 `master /`，推送 `hexo` 源码与 `master` 静态站点并验证线上生效

## 3. 已解决的关键坑与技术备忘
1. **npm 12 `EALLOWGIT`**：`hexo-asset-image` 为 `git+https://` 依赖，安装需用 `npm install --allow-git=all --no-save`。
2. **Hexo 3.7.1 + Node 14+/22 生成 0 字节文件（重大隐蔽坑）**：旧版 `hexo/lib/plugins/console/generate.js` 的 `CacheStream.destroy()` 在 Node 14+ 自动销毁流时会清空 `_cache` 导致全部 HTML/CSS 输出为 0 字节。已通过 `scripts/node-compat-generate.js` 永久覆写 `generate` 控制台命令解决，无需修改 `node_modules`。
3. **Hexo 3.7.1 Markdown 内嵌 HTML 与 Nunjucks 冲突**：通过 `scripts/column-tags.js` 渲染双语块内 Markdown；行内 JSON 结尾 `}}` 写作 `} }` 避免 Nunjucks 误解析。
4. **GitHub Pages 源分支修正**：原 Pages API 显示 `source.branch: "hexo"`（若直接推源码会覆盖旧静态页），发布前已统一配置为 `master /` 并部署 `public/` 至 `master` 分支。

## 4. 后续迭代指引（给未来会话）
- **新增 AI 教程**：新建 `source/ai-tutorials/<slug>/index.md`，参照现有文章填写 frontmatter（`layout: column_article`、`column: ai-tutorials`、`level`、`code`、`order`、`title`、`title_en`、`summary`、`read_time`、`tags`），正文用 `{% zh %}` / `{% en %}`，配 SVG 图存 `source/images/ai-tutorials/`，构建后自动归入 `/ai-tutorials/`。
- **新增每日 AI 热点**：先通过实时搜索核验当日一手信源，再新建 `source/ai-news/<YYYY-MM-DD>/index.md`（`layout: column_article`、`column: ai-news`、`edition`、`highlights` 等），构建后自动置顶显示在 `/ai-news/` 与首页专栏卡片。
- **本地验证与发布**：
  1. `./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate`
  2. 核验 `public/` 无 0 字节文件且 `git status source/_posts/` 为空
  3. 源码提交并 `git push origin hexo`
  4. 将 `public/` 内容提交推送到 `origin/master` 触发 GitHub Pages 更新
