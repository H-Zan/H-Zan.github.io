# WORK.md — 项目任务与交接日志

> 本文件用于确保任意新会话都能在 1 分钟内掌握项目架构、当前进度、已知问题与操作方法。

## 1. 项目快速上手
- **仓库**：`H-Zan/H-Zan.github.io`（Hexo 3.7.1 + `cactus-dark` 主题）
- **线上地址**：https://h-zan.github.io/
- **分支策略**：
  - `hexo`：Hexo 源码分支（日常开发、写文章、改主题都在这里）
  - `master`：静态 HTML 部署分支（`public/` 构建产物推送到此分支，GitHub Pages 从 `master /` 提供服务）
- **核心目录与 6 大专栏索引**：
  - `source/_posts/`：作者历史随笔（**只读，严禁改动**）
  - `source/columns/` → `/columns/`：全站 6 大专栏聚合总览页
  - `source/agent-playbook/` → `/agent-playbook/`：Agent 使用技巧专栏（4 篇，Codex/Claude Code/Antigravity、macOS & Windows、四大思维、高效/低效对比）
  - `source/ai-tutorials/` → `/ai-tutorials/`：AI 教程专栏（四级体系，8 篇）
  - `source/python-tutorials/` → `/python-tutorials/`：Python 教程专栏（3 篇，现代核心 / uv & asyncio / FastAPI & Pydantic）
  - `source/python-ai-practice/` → `/python-ai-practice/`：Python AI 实践专栏（3 篇，LLM SDK / 手写混合 RAG / 可控 Agent & Eval）
  - `source/pg-tutorials/` → `/pg-tutorials/`：PostgreSQL 数据库教程专栏（3 篇，高效 SQL & 窗口函数 / 索引 EXPLAIN MVCC / JSONB & pgvector）
  - `source/ai-news/` → `/ai-news/`：AI 热点大事件专栏（首期 `2026-11-27`）
  - `scripts/column-tags.js`：Hexo 双语标签（`zh` / `en`）与提示框（`callout`）插件
  - `scripts/node-compat-generate.js`：Hexo 3.7.1 在 Node 14+/22 下修复 0 字节输出 bug 的构建器

## 2. 已完成里程碑

### Phase 2（2026-11-27）：新增 4 大实战专栏 & 全站多专栏矩阵架构
- [x] 升级主题支持可扩展多专栏：新增通用 `column_hub.ejs`、全站 `/columns/` 聚合页 `columns_overview.ejs`、升级 `column_article.ejs` 六专栏路由映射、更新首页 6 专栏网格与顶栏导航
- [x] 生成 4 张新专栏暗色主题封面图 + 13 张专属高清 SVG 架构/对比图解
- [x] 完成并上线 **Agent 使用技巧专栏**（4 篇）：`AP-01` Codex/Claude Code/Antigravity 双平台配置、`AP-02` 四大高阶思维与 10 组高效/低效硬核对比、`AP-03` Plan-First + AGENTS.md + 测试闭环 + Worktree 并行、`AP-04` 设计思维视觉迭代与职场 Skills 复利
- [x] 完成并上线 **Python 教程专栏**（3 篇）：`PY-01` 现代核心与类型注解、`PY-02` uv/装饰器/asyncio/pytest、`PY-03` FastAPI + Pydantic v2 + pathlib 自动化
- [x] 完成并上线 **Python AI 实践专栏**（3 篇）：`PAI-01` 统一 SDK 流式与结构化抽取、`PAI-02` 80 行透明手写混合检索 RAG、`PAI-03` 可控 Tool Agent 与 pytest Eval 门禁
- [x] 完成并上线 **PostgreSQL 教程专栏**（3 篇）：`PG-01` 建表避坑/CTE/窗口函数/Upsert、`PG-02` 索引选型/EXPLAIN ANALYZE/MVCC、`PG-03` JSONB + pgvector HNSW 混合检索与生产运维
- [x] 全量构建与自动化门禁通过（171 个静态文件全部非空、30 个专栏页零坏链/零断图、`source/_posts/` 零改动）并推送发布至 `hexo` & `master`

### Phase 1（2026-11-27）：AI 教程四级专栏 + AI 热点大事件首期上线
- [x] 完成 `agents.md`、`work.md`、`scripts/column-tags.js`、`scripts/node-compat-generate.js`
- [x] 上线 AI 教程专栏 8 篇（L1–L4）+ 8 张 SVG 架构图 + 首期 AI 热点大事件日报 `2026-11-27`
- [x] 修正 GitHub Pages 源分支为 `master /` 并成功发布上线

## 3. 已解决的关键坑与技术备忘
1. **npm 12 `EALLOWGIT`**：`hexo-asset-image` 为 `git+https://` 依赖，安装需用 `npm install --allow-git=all --no-save`。
2. **Hexo 3.7.1 + Node 14+/22 生成 0 字节文件**：由 `scripts/node-compat-generate.js` 永久覆写 `generate` 命令修复。
3. **Hexo 3.7.1 Markdown 内嵌 HTML 与 Nunjucks 冲突**：通过 `scripts/column-tags.js` 渲染双语块；行内 JSON 结尾 `}}` 写作 `} }` 避免 Nunjucks 报错。
4. **GitHub Pages 源分支**：固定指向 `master /`，每次源码推 `hexo`、产物 `public/` 推 `master`。

## 4. 后续迭代指引（给未来会话）
- **给任意现有专栏加新文章**：在 `source/<column>/<slug>/index.md` 新建文件，填写 `layout: column_article`、`column: <id>`、`code`、`order`、`title`、`title_en`、`summary`、`read_time`、`tags`，构建即自动收录。
- **发布标准动作**：
  1. `./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate`
  2. 核验 `public/` 无 0 字节文件且 `git status --short source/_posts/` 为空
  3. 源码提交并 `git push origin hexo`
  4. 将 `public/` 内容提交推送到 `origin/master`（保留 `.nojekyll`）并校验线上 HTTP 200
