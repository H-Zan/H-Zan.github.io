---
title: "Project 2 · Step 2：渐进式 Skills 加载器——把 80% 提示词移出启动上下文"
title_en: "Project 2 · Step 2: Progressive Skills Loader — Cut Base System Prompt by 80%"
layout: column_article
column: agent-projects
track: guided
project: p2
code: P2-02
order: 22
date: 2026-11-27 16:20:00
read_time: 7 min
summary: 复刻 Claude Code 与 Antigravity 最核心的省 Token 绝技：启动时只喂 1 行技能摘要目录，只有模型判断需要时才通过 load_skill(name) 按需拉取完整 SKILL.md 规程。
tags:
  - 基础分步版
  - Project 2
  - Progressive Skills
  - 上下文工程
---

{% callout info "双轨导航 / Dual-Track Navigation" %}
当前为 **🧱 基础分步版（Project 2 · 第 2/3 步）** · [← 上一步 Step 1](/agent-projects/p2-step1-single-loop-core/) · [⚡ 看本项目速通版](/agent-projects/p2-express-mini-agent-harness/)
{% endcallout %}

## 1. 渐进式披露（Progressive Disclosure）到底怎么运作？ / How Progressive Disclosure Works

{% zh %}
假设你的团队积累了 20 套专业规程（代码审查、SQL 审计、发版清单、周报模板……），每份 1,000 字。
- **旧写法**：全塞进 System Prompt → 每次哪怕用户只问“今天几号”，白烧 20,000 字上下文，模型还容易串台！
- **2026 前沿写法**：启动时只注入一张极简目录（每个 Skill 占 1 行 `name: description`，20 个加起来不到 400 字）；再给模型一个 `load_skill(name)` 工具，**命中场景时自己按需调取全文**！
{% endzh %}

{% en %}
Instead of stuffing 20 lengthy playbooks into every system prompt, inject only a compact `name: description` catalog at startup and expose a `load_skill(name)` tool so the model pulls full instructions strictly on demand.
{% enden %}

## 2. 编写一个标准 `SKILL.md` 与 `harness/skills.py` / Skill File & Loader Code

```markdown
<!-- skills/sql-audit/SKILL.md -->
---
name: sql-audit
description: 审查 PostgreSQL SQL 脚本中的锁表、全表扫描、注入与缺少并发建索引风险
---
1. 检查线上 CREATE INDEX 是否遗漏 CONCURRENTLY。
2. 检查 WHERE 条件是否对索引列套用函数导致索引失效。
3. 核对所有外部参数是否使用占位符绑定，禁止字符串拼接。
```

```python
# harness/skills.py
from pathlib import Path
import yaml
from pydantic import BaseModel, Field
from harness.core import Tool

class LoadSkillArgs(BaseModel):
    name: str = Field(description="Exact skill name from the catalog")

def build_skill_system(skills_dir: Path) -> tuple[str, Tool]:
    catalog: dict[str, tuple[str, Path]] = {}
    for md in sorted(skills_dir.glob("*/SKILL.md")):
        raw = md.read_text(encoding="utf-8")
        _, fm, _ = raw.split("---", 2)
        meta = yaml.safe_load(fm)
        catalog[meta["name"]] = (meta["description"], md)

    lines = [f"- **{k}**: {desc}" for k, (desc, _) in catalog.items()]
    prompt_snippet = "可用技能（命中任务时先调用 load_skill 读取完整步骤）：\n" + "\n".join(lines)

    def _load(args: LoadSkillArgs) -> dict:
        if args.name not in catalog:
            return {"error": f"Unknown skill '{args.name}'. Valid: {list(catalog)}"}
        return {"name": args.name, "content": catalog[args.name][1].read_text(encoding="utf-8")}

    tool = Tool(
        name="load_skill",
        description="按需加载指定专业技能的完整操作指南",
        args_model=LoadSkillArgs,
        fn=_load,
    )
    return prompt_snippet, tool
```

## 3. 本步验收标准 / Step 2 Exit Criteria

{% zh %}
- [ ] 在 `skills/` 下放 2 个 `SKILL.md`（如 `sql-audit`、`code-review`），启动提示词中只出现 2 行摘要。
- [ ] 问一个普通问题时，`trace` 中不调用 `load_skill`；问“帮我审一下这段建索引 SQL”时，模型先调用 `load_skill("sql-audit")` 再给出精准审查！

**下一节预告**：[Project 2 · Step 3：实现上下文隔离只读子代理与 pytest Eval 门禁 →](/agent-projects/p2-step3-subagent-and-eval/)
{% endzh %}

{% en %}
- [ ] Startup system prompt contains only 1-line summaries for each skill.
- [ ] Casual queries skip `load_skill`, while SQL review queries trigger `load_skill("sql-audit")` first. Next: [Step 3 — Isolated Subagent & Eval Gate →](/agent-projects/p2-step3-subagent-and-eval/)
{% enden %}
