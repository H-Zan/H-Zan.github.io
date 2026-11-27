---
title: "Project 1 · Step 2：小步原子实施——FastAPI + pgvector 混合检索后端与暗色前端联调"
title_en: "Project 1 · Step 2: Vertical-Slice Build — FastAPI Hybrid Search & Dark UI"
layout: column_article
column: agent-projects
track: guided
project: p1
code: P1-02
order: 12
date: 2026-11-27 15:50:00
read_time: 8 min
summary: 学会用“垂直切片 + 每片换干净会话”高效指挥 Agent 写代码：先切片 A 跑通入库与单 SQL RRF 混合检索接口，再切片 B 靠 Design Tokens 做出告别 AI 模板味的极简暗色前端。
tags:
  - 基础分步版
  - Project 1
  - 垂直切片
  - 上下文控噪
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 1 · 第 2/3 步）** · [← 上一步 Step 1](/agent-projects/p1-step1-plan-and-harness/) · [⚡ 看本项目速通版](/agent-projects/p1-express-fullstack-ai-kb/)
{% endcallout %}

## 1. 为什么一定要开“新会话”来做 Step 2？ / Why Start a Fresh Session Here

{% zh %}
Step 1 的聊天窗口里充满了 Docker 调试和方案讨论记录，现在它们已经成为噪声。**核心习惯**：每进入一个新切片，立刻开新会话（`agy` 按 `Ctrl+D` 重启 / Claude Code 敲 `/clear`），让 Agent 只读清爽的 `AGENTS.md` + `work.md` 轻装上阵！
{% endzh %}

{% en %}
Step 1's chat is full of setup chatter—noise for coding. Start a **fresh session** (`agy` restart or `/clear` in Claude Code) so the agent loads only clean `AGENTS.md` + `work.md`.
{% enden %}

## 2. 切片 A：给 Agent 下达高命中率后端指令 / Slice A: Backend Ingestion & Hybrid Search

```text
请先读 AGENTS.md 和 work.md，然后按以下要求实现后端切片（先给 5 行计划再动手）：
1. 在 app/rag.py 实现：Markdown 按 `## ` 标题切分 + Embedding 函数（支持环境变量切换真实 API 或本地 deterministic mock 方便单测）+ PostgreSQL 单 SQL RRF 混合检索（必须带 tenant_id 过滤）。
2. 在 app/main.py 提供 3 个接口：GET /health、POST /ingest、POST /query（返回 answer + citations 原文列表）。
3. 在 tests/test_api.py 补齐集成测试：验证写入、跨租户隔离（tenant B 绝不能搜到 tenant A 数据）与引用返回。
4. 完成后执行 `make verify`，全绿后更新 work.md。
```

{% zh %}
**关键工程细节**：要求 Embedding 层支持 **Mock 注入**，这样 `pytest` 跑起来不需要每次烧真 API 费用，0.5 秒就能验证整个切分、入库、权限过滤、RRF 排序链路！
{% endzh %}

{% en %}
Making the embedding function mockable lets `pytest` verify chunking, SQL insertion, tenant isolation, and RRF ranking in <0.5s with zero API spend.
{% enden %}

## 3. 切片 B：用 Design Tokens 指挥出高颜值暗色前端 / Slice B: Zero-Slop Dark UI

{% zh %}
切片 A 跑绿并 `git commit` 后，再开一个干净会话做前端。**千万别说“帮我画个好看页面”**，直接给出精确设计锚点：
{% endzh %}

{% en %}
Commit Slice A, open a fresh session, and feed concrete Design Tokens instead of vague "make it pretty" prompts:
{% enden %}

```text
请先读 AGENTS.md 和 app/main.py，在 app/static/index.html 实现极简单文件前端并由 FastAPI 挂载到 `/`：
- 视觉锚点：暗色底 #1d1f21、卡片面 #24272b、细边框 #363b42、主强调色 #2bbc8a，禁止多余渐变和花哨动画。
- 信息架构：顶部输入 Tenant ID；左栏上传/粘贴 Markdown 一键入库；右栏输入问题实时展示回答，回答下方以折叠卡片列出可核验的 [1][2] 原文出处。
- 完成后运行 `make verify` 检查无破坏，并更新 work.md。
```

## 4. 本步验收标准 / Step 2 Exit Criteria

{% zh %}
- [ ] `make verify`（`ruff` + `pytest`）100% 绿灯通过，尤其包含跨租户隔离断言。
- [ ] 启动 `uv run uvicorn app.main:app --port 8000` 后，浏览器打开 `http://127.0.0.1:8000/` 界面干净无控制台报错。
- [ ] 切片 A 与切片 B 各自形成独立干净的 `git commit`。

**下一节预告**：[Project 1 · Step 3：确定性验证闭环、截屏打磨与独立审 Diff →](/agent-projects/p1-step3-verify-and-ship/)
{% endzh %}

{% en %}
- [ ] `make verify` passes 100% including tenant-isolation assertions.
- [ ] `http://127.0.0.1:8000/` loads cleanly with zero console errors.
- [ ] Separate clean commits for Slice A and Slice B. Next: [Step 3 — Verify & Ship →](/agent-projects/p1-step3-verify-and-ship/)
{% enden %}
