---
title: "Project 1 · Step 3：确定性验证与交付——curl/截图自检闭环、独立审查与发布复盘"
title_en: "Project 1 · Step 3: Deterministic Verification, Visual Polish & Independent Diff Review"
layout: column_article
column: agent-projects
track: guided
project: p1
code: P1-03
order: 13
date: 2026-11-27 16:00:00
read_time: 6 min
summary: 跑通单测只是及格，真正让 Agent 交付达到“资深工程师水准”的是最后 10 分钟：真接口端到端冒烟、截图视觉挑刺、另开只读会话对抗审 Diff，以及把踩过的坑沉淀回 AGENTS.md。
tags:
  - 基础分步版
  - Project 1
  - 验证闭环
  - 独立审查
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 1 · 第 3/3 步 完结）** · [← 上一步 Step 2](/agent-projects/p1-step2-backend-frontend/) · [⚡ 看本项目速通版](/agent-projects/p1-express-fullstack-ai-kb/)
{% endcallout %}

## 1. 端到端真服务冒烟测试（不信口头承诺） / Live E2E Smoke Test

{% zh %}
让 Agent 启动真实 FastAPI 服务，用 `curl` 走完“健康检查 → 入库 → 提问带引用”完整链路，看到真实 HTTP 200 JSON 才算过关：
{% endzh %}

{% en %}
Verify the live running service with `curl` end-to-end (`health → ingest → cited query`) rather than trusting unit mocks alone:
{% enden %}

```bash
curl -sf http://127.0.0.1:8000/health
curl -sf -X POST http://127.0.0.1:8000/ingest \
  -H "Content-Type: application/json" \
  -d '{"tenant_id":"demo","doc_source":"handbook.md","content":"## 报销规则\n差旅餐补标准为每天 150 元。"}'
curl -sf -X POST http://127.0.0.1:8000/query \
  -H "Content-Type: application/json" \
  -d '{"tenant_id":"demo","question":"每天餐补多少？"}'
```

## 2. 视觉截图闭环微调 / Visual Critique Loop

{% zh %}
打开页面截一张屏（在 Antigravity 里可直接用 `/browser` 自动截图），粘贴给 Agent 用**可量化语言**精修：
- *“1) 左栏与右栏间距调大到 24px；2) 引用来源卡片字号降到 13px 并加左边框 `#2bbc8a`；3) 屏幕宽度 < 720px 时自动折成上下单列。”*
{% endzh %}

{% en %}
Capture a real screenshot (or use `/browser` in Antigravity) and give measurable polish instructions (exact spacing, font sizes, mobile breakpoint stacking).
{% enden %}

## 3. 终极质检：开独立只读会话做对抗 Code Review / Independent Read-Only Review

{% zh %}
**永远不要让“刚写完代码的那个会话”自审代码**——它会带有确认偏误！另开一个全新无历史会话（或无头跑 `agy -p` / `claude -p` / `codex review`）：
{% endzh %}

{% en %}
Never let the authoring session review its own code—spawn a fresh read-only session to eliminate confirmation bias:
{% enden %}

```bash
git diff HEAD~3..HEAD | agy -p "你是严苛的安全与后端审稿人，只读审查这份 Diff：找出 SQL 注入、租户越权、异常处理缺失与性能隐患，按 P0/P1 列出，没问题请明说。"
```

## 4. 复盘沉淀：越用越顺手的复利动作 / Compound Your Lessons

{% zh %}
修完 Review 指出的问题并重跑 `make verify` 全绿后，做最后一件决定长期复利的事：
1. 把这次项目踩过的通用环境坑（如 `psycopg` 连接字符串格式或 Docker 端口）用 **1 行精简记入 `AGENTS.md`**。
2. 更新 `work.md` 标记全部里程碑完成，方便你下周直接接手加新功能！

**继续进阶挑战**：[⚡ Project 2 速通版](/agent-projects/p2-express-mini-agent-harness/) 或 [🧱 Project 2 · Step 1 手搓前沿 Agent Harness →](/agent-projects/p2-step1-single-loop-core/)
{% endzh %}

{% en %}
Once review fixes pass `make verify`, append any reusable gotchas (1 line each) to `AGENTS.md` and mark `work.md` complete. Next project: [Project 2 · Step 1 — Build a Frontier Agent Harness →](/agent-projects/p2-step1-single-loop-core/)
{% enden %}
