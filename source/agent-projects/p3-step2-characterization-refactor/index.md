---
title: "Project 3 · Step 2：先立保护网再动刀——特性回归测试、最小变更重构与防上下文腐烂"
title_en: "Project 3 · Step 2: Characterization Safety Net, Minimal Diffs & Context Hygiene"
layout: column_article
column: agent-projects
track: guided
project: p3
code: P3-02
order: 32
date: 2026-11-27 16:50:00
read_time: 7 min
summary: 老代码重构最大的翻车点是“顺手改坏了原本跑得很好的旧功能”。本节教你先用特性测试锁死旧行为，在独立 Git Worktree 里做最小变更手术，以及卡壳 2 轮时如何果断止损重开。
tags:
  - 基础分步版
  - Project 3
  - 特性测试
  - 最小变更
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 3 · 第 2/3 步）** · [← 上一步 Step 1](/agent-projects/p3-step1-audit-and-boundaries/) · [⚡ 看本项目速通版](/agent-projects/p3-express-legacy-repo-refactor/)
{% endcallout %}

## 1. 动第一刀之前：先写“特性保护网”（Characterization Check） / Lock Existing Behavior First

{% zh %}
很多老仓库根本没有单元测试。别急着改业务逻辑——先让 Agent 针对**现有核心输入/输出**写一个最小保护脚本（比如：核验老接口 JSON 字段不变、老页面非空且图片路径全部存在、关键历史目录 `git status` 为空）：
{% endzh %}

{% en %}
Before changing one line of legacy logic, have the agent write a lightweight characterization check locking current critical outputs (API response keys, non-empty build artifacts, zero edits to off-limits folders):
{% enden %}

```bash
# 1. 先建隔离 Worktree，绝不在主分支直接动手术
git worktree add ../legacy-safe-refactor refactor/isolate-feature
cd ../legacy-safe-refactor

# 2. 在新工作区里先跑通保护网脚本（改代码前必须先全绿！）
bash scripts/verify-release.sh
```

## 2. 最小变更手术指令（严防“好心格式化全仓库”） / Minimal-Diff Refactoring Prompt

{% zh %}
给 Agent 下达老仓库修改任务时，务必加上一句**防扩散约束**：
{% endzh %}

{% en %}
Always add an explicit anti-churn rule so the agent doesn't reformat unrelated files:
{% enden %}

```text
请先读 AGENTS.md 和 work.md，本次只完成第 1 个小模块：<模块名>。
硬性约束：
1. 坚持最小变更（Minimal Diff），严禁顺手格式化、重命名或重构任务范围外的旧文件。
2. 优先采用“新增独立扩展/插件文件”而非魔改老核心代码。
3. 改完后立刻运行 `bash scripts/verify-release.sh` 与 `git diff --stat`，全部通过再汇报。
```

{% callout warn "防上下文腐烂止损线 / The 2-Strike Reset Rule" %}
如果在老仓库里修一个兼容性问题连续 **2 轮越修报错越多**，**立刻叫停**！执行 `git checkout -- .` 恢复干净状态，把刚刚排查到的真正根因写成 3 句话，**开一个全新会话**直接喂给它——干净上下文往往 1 轮秒解！
{% endcallout %}

## 3. 本步验收标准 / Step 2 Exit Criteria

{% zh %}
- [ ] 重构改动按小模块拆分，每一步都通过 `verify-release.sh` 并独立 `git commit`。
- [ ] `git status --short <禁区目录>` 为空，零越界修改。

**下一节预告**：[Project 3 · Step 3：独立对抗审 Diff、线上冒烟与把坑写回 AGENTS.md →](/agent-projects/p3-step3-diff-review-release/)
{% endzh %}

{% en %}
- [ ] Each small refactored module passes `verify-release.sh` with its own clean commit.
- [ ] Off-limits legacy paths remain 100% untouched. Next: [Step 3 — Independent Review & Ship →](/agent-projects/p3-step3-diff-review-release/)
{% enden %}
