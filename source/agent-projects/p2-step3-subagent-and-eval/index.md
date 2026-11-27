---
title: "Project 2 · Step 3：按需子代理上下文隔离与 pytest Eval 回归门禁"
title_en: "Project 2 · Step 3: Context-Isolating Read-Only Subagent & pytest Eval Gate"
layout: column_article
column: agent-projects
track: guided
project: p2
code: P2-03
order: 23
date: 2026-11-27 16:30:00
read_time: 7 min
summary: 补齐 2026 前沿 Harness 最后两块拼图：把只读调研子代理封装成主循环的一个普通工具（脏上下文用完即弃），并用 pytest 写好技能触发、权限隔离与步数预算的自动化 Eval 守门测试。
tags:
  - 基础分步版
  - Project 2
  - Subagent隔离
  - Eval门禁
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 2 · 第 3/3 步 完结）** · [← 上一步 Step 2](/agent-projects/p2-step2-progressive-skills/) · [⚡ 看本项目速通版](/agent-projects/p2-express-mini-agent-harness/)
{% endcallout %}

## 1. 把只读 Subagent 封装成主循环的一个工具 / Subagent as a Context-Isolating Tool

{% zh %}
记住 2026 黄金架构原则：**不要让子代理接管用户主线程，而是把它做成主 Agent 的一个普通工具！** 当任务需要翻遍 50 个文件找某个配置来源时，主 Agent 调 `delegate_readonly_research(question)`，子代理在**全新空上下文**里用只读工具翻完，只把 200 字精炼事实 + 行号交回主窗口，主上下文始终干干净净！
{% endzh %}

{% en %}
Expose your subagent as a plain tool owned by the main loop: it runs in a fresh, disposable context window with strictly read-only tools and hands back only a compact factual summary.
{% enden %}

```python
# harness/subagent.py
from pydantic import BaseModel, Field
from harness.core import Tool, run_loop

class ResearchArgs(BaseModel):
    question: str = Field(description="Specific codebase or log question to investigate read-only")

def make_research_subagent_tool(client, model: str, readonly_tools: dict[str, Tool]) -> Tool:
    def _run(args: ResearchArgs) -> dict:
        # 独立全新消息列表：翻文件产生的海量输出用完即弃，绝不污染主循环！
        sub_msgs = [
            {
                "role": "system",
                "content": "你是只读调研子代理。禁止修改任何文件；检索完毕后仅返回 <=200 字事实结论与精确文件路径。",
            },
            {"role": "user", "content": args.question},
        ]
        res = run_loop(client, model, sub_msgs, readonly_tools, max_steps=6)
        return {"findings": res["answer"], "sub_steps": res["steps"]}

    return Tool(
        name="delegate_readonly_research",
        description="当需要广泛检索多个文件或长日志时调用，隔离搜索噪声并只返回精炼结论",
        args_model=ResearchArgs,
        fn=_run,
    )
```

## 2. 给你的 Harness 装上 `pytest` Eval 守门员 / Automated `pytest` Eval Gate

{% zh %}
以后每加一个新 Skill、或把某个子代理折叠回主循环，先跑一遍 `uv run pytest tests/test_evals.py`——用分数说话，不再凭感觉拍脑袋！
{% endzh %}

{% en %}
Before adding a new skill or folding a subagent into the main loop, run `uv run pytest tests/test_evals.py` to prove quality didn't regress:
{% enden %}

```python
# tests/test_evals.py
import pytest

def test_skill_loaded_on_demand(harness_runner) -> None:
    res = harness_runner("帮我检查 `CREATE INDEX idx_a ON orders(user_id);` 线上执行有没有风险")
    tools_used = [t["tool"] for t in res["trace"]]
    assert "load_skill" in tools_used
    assert "CONCURRENTLY" in res["answer"]

def test_subagent_never_has_write_tools(readonly_tools_dict) -> None:
    forbidden = {"write_file", "delete_file", "run_shell"}
    assert forbidden.isdisjoint(readonly_tools_dict.keys())
```

## 3. 通关恭喜 & 下一站 / Project 2 Complete!

{% zh %}
你刚刚亲手从 0 造出了与 2026 顶级商用 Coding Agent 同宗同源的极简引擎！

**进入最终实战**：[⚡ Project 3 速通版](/agent-projects/p3-express-legacy-repo-refactor/) 或 [🧱 Project 3 · Step 1 存量复杂老仓库安全改造 →](/agent-projects/p3-step1-audit-and-boundaries/)
{% endzh %}

{% en %}
You now own a transparent, testable 2026-grade Agent Harness! Next up: [Project 3 · Step 1 — Safe Legacy Repo Refactoring →](/agent-projects/p3-step1-audit-and-boundaries/)
{% enden %}
