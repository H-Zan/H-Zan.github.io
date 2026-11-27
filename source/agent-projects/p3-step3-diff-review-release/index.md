---
title: "Project 3 · Step 3：独立对抗审查与零停机发布——Diff 审计、线上冒烟与踩坑沉淀"
title_en: "Project 3 · Step 3: Independent Diff Audit, Live Smoke Test & Lessons Loop"
layout: column_article
column: agent-projects
track: guided
project: p3
code: P3-03
order: 33
date: 2026-11-27 17:00:00
read_time: 6 min
summary: 老仓库安全上线的最后三道保险：用全新只读会话审查全部 git diff、上线后立即跑脚本校验线上 HTTP 200 与关键产物，并把本次排查到的隐蔽坑极简沉淀回 AGENTS.md。
tags:
  - 基础分步版
  - Project 3
  - Diff审计
  - 零事故上线
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 3 · 第 3/3 步 完结）** · [← 上一步 Step 2](/agent-projects/p3-step2-characterization-refactor/) · [⚡ 看本项目速通版](/agent-projects/p3-express-legacy-repo-refactor/)
{% endcallout %}

## 1. 全新只读会话：给整个分支做对抗式 Diff 审计 / Fresh-Session Adversarial Diff Audit

{% zh %}
合入主干前，用 `git diff main...HEAD` 喂给一个**从未参与过编码的新会话**，专抓隐蔽退化、边界遗漏和越权改动：
{% endzh %}

{% en %}
Before merging, pipe `git diff main...HEAD` into a brand-new, unbiased read-only session to catch silent regressions or boundary leaks:
{% enden %}

```bash
# 三大 CLI 任选其一执行独立审稿
git diff main...HEAD | agy -p "只读审查这份老仓库重构 Diff：重点检查 1) 是否破坏旧 URL/接口兼容性 2) 有无硬编码密钥或路径 3) 有无漏改配置，按风险分级输出。"
# Claude Code: git diff main...HEAD | claude -p "..."
# OpenAI Codex: codex review
```

## 2. 发布后 30 秒线上真冒烟 / 30-Second Live Post-Deploy Smoke Check

{% zh %}
推送并部署完成后，**别把“CI 绿了”当终点**——立刻从外部真实请求线上关键 URL（涵盖新功能页 + 至少 1 个老历史页面 + 核心静态资源），全部看到实打实的 `200` 才算真正收工：
{% endzh %}

{% en %}
Never stop at a green CI badge—probe live production URLs (new pages + at least one untouched legacy page + key static assets) and verify real HTTP `200` responses:
{% enden %}

```bash
for url in "https://your-site.example/" "https://your-site.example/new-feature/" "https://your-site.example/legacy-page/"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$code $url"
done
```

## 3. 清理 Worktree + 沉淀知识复利 / Cleanup & Compound Knowledge

{% zh %}
1. 合并分支后删除临时工作区：`git worktree remove ../legacy-safe-refactor`。
2. 把这次改造挖出来的隐藏环境坑（比如老构建工具兼容参数、线上部署分支规则）**用 1~2 行极简补录进 `AGENTS.md`**，把最终状态与新路由记入 `work.md`。

至此，**《Agent 实战项目工坊》三大核心实战全部通关！** 无论从 0 到 1 建全栈、手搓前沿 Harness，还是安全改造多年老仓库，你都已经手握一套可复制、可验证、跨 `agy` / `claude` / `codex` 通用的工业级作战手册。
{% endzh %}

{% en %}
Clean up your temporary worktree (`git worktree remove ...`), distill any hard-won legacy gotchas into 1–2 crisp lines in `AGENTS.md`, and update `work.md`. You have completed all three hands-on tracks of the **Agent Projects Workshop**!
{% enden %}
