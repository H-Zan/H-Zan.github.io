---
title: Agent 工具全景与双平台极速上手：Codex、Claude Code、Antigravity（macOS & Windows）
title_en: "Agent Toolchain & Cross-Platform Setup: Codex, Claude Code & Antigravity on macOS & Windows"
layout: column_article
column: agent-playbook
code: AP-01
order: 1
date: 2026-11-27 12:10:00
read_time: 8 min
summary: CLI 终端 Agent 和桌面软件怎么选、怎么搭？一文讲透 Codex、Claude Code、Antigravity 的定位差异，以及 macOS 与 Windows（WSL2/PowerShell）下零踩坑的极速配置方案。
tags:
  - Codex
  - Claude Code
  - Antigravity
  - macOS
  - Windows
---

{% callout key "核心结论先行 / TL;DR" %}
- **CLI（Claude Code / Codex CLI）** 胜在贴近终端、脚本化与并行多任务；**桌面软件（Antigravity / Codex App / Claude Desktop）** 胜在可视化 Diff、浏览器联动、截图反馈与非编码办公。
- **最佳实践不是二选一，而是组合拳**：日常交互式全栈/UI 用 **Antigravity**，深水区重构/终端批处理开 **Claude Code**，异步挂后台修 Bug/写测试丢给 **Codex**。
- **Windows 用户第一条铁律**：跑任何 CLI Agent，**优先进 WSL2（Ubuntu）**，直接避开 90% 的路径与脚本坑。
{% endcallout %}

![Agent CLI and Desktop Landscape](/images/agent-playbook/agent-tools-matrix.svg)

## 1. 三大主力 Agent 怎么选？一张表定乾坤 / Choosing Between Claude Code, Codex & Antigravity

{% zh %}
别盲目追新，看清每款工具的**主战场**，按任务派活才最高效：
{% endzh %}

{% en %}
Pick the right agent for the right job instead of forcing one tool everywhere:
{% enden %}

| 工具 Tool | 形态 Form Factor | 核心规范文件 Rules File | 最强杀手锏 Superpower | 最适合的场景 Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | CLI + Desktop + IDE 插件 | `CLAUDE.md` / `AGENTS.md` | 超强长上下文代码理解、Hooks、Skills、Subagents | 复杂大仓库重构、疑难 Bug 根因定位、深度架构改造 |
| **OpenAI Codex** | Codex CLI + 桌面 App + Cloud | `AGENTS.md` | 本地沙箱 + 云端异步多任务并行、批量提 PR | 挂后台刷单测、批量修 Issue、多分支并行实验 |
| **Antigravity** | Agent-First 桌面 IDE + 远程环境 | `AGENTS.md` + Skills + Artifacts | 编辑器 + 终端 + 浏览器/设计预览一体化、可视 Artifacts 审阅 | 从 0 到 1 建全栈项目、UI 设计视觉迭代、跨工具自动化交付 |

## 2. macOS vs Windows 双平台极速配置（不踩坑版） / macOS & Windows Setup Without Pain

### 🍎 macOS 推荐配置 / macOS Setup

{% zh %}
macOS 天然是 Unix 环境，配好终端与包管理器就能丝滑起飞：
1. **终端升级**：用 **Ghostty** / **Warp** / **iTerm2** 替代自带终端，配合 `tmux` 开多窗格并行跑多个 Agent。
2. **CLI 安装与认证**：Node 22+（`brew install node`）+ `gh` CLI（`brew install gh`），直接安装 Claude Code / Codex CLI；桌面端直接装 **Antigravity** 与 **Codex App**。
3. **关键提效习惯**：把 `git`、`rg`（ripgrep）、`jq`、`uv` 装齐——Agent 检索和跑脚本的速度会快 5 倍！
{% endzh %}

{% en %}
macOS is native POSIX—install modern CLI utilities so your agents move 5× faster:
1. **Terminal**: Ghostty, Warp, or iTerm2 + `tmux` for parallel agent panes.
2. **Core tools**: `brew install node gh ripgrep jq uv` so agents search, parse JSON, and manage Python instantly.
3. **Desktop**: Pair **Antigravity** (full-stack + visual preview) with CLI agents in your terminal.
{% enden %}

### 🪟 Windows 避坑指南 / Windows Setup (Save Yourself Hours)

{% zh %}
Windows 用户用 Agent 踩坑，90% 死在三个地方：**反斜杠路径 `\`**、**PowerShell 命令语法与 Bash 不兼容**、**文件换行符 CRLF 弄脏 Git Diff**。

**两条立竿见影的解法**：
1. **CLI Agent 一律装进 WSL2（Ubuntu 24.04）+ Windows Terminal**：
   - 把代码仓库直接放进 Linux 文件系统 `~/projects/`（**千万别放 `/mnt/c/`**，跨盘 I/O 慢 10 倍！）。
   - 在 WSL2 里跑 Claude Code / Codex CLI，体验和 macOS/Linux 100% 一致。
2. **桌面软件原生跑 Windows**：
   - **Antigravity**、**VS Code** 直接原生安装 Windows 版，点击左下角 `Remote - WSL` 无缝直连 WSL2 里的项目与终端。
   - 若必须在原生 PowerShell 里跑，务必配置 `git config --global core.autocrlf input` 并在 `AGENTS.md` 写明“当前为 Windows PowerShell 环境”。
{% endzh %}

{% en %}
90% of Windows agent pain comes from backslashes (`\`), PowerShell vs. Bash syntax mismatches, and `CRLF` git diffs.
1. **Run CLI agents inside WSL2 (Ubuntu) + Windows Terminal**: Keep repos in `~/projects/` (never `/mnt/c/`, which is 10× slower).
2. **Run Desktop apps natively**: Install **Antigravity** / **VS Code** on Windows and connect straight into WSL2—best of both worlds.
{% enden %}

```bash
# macOS / WSL2 (Ubuntu) 通用极速自检与常用安装命令
# 1. 基础高速工具链（让 Agent 搜代码、看 PR、管环境快到飞起）
# macOS: brew install ripgrep jq gh uv
# WSL2:  sudo apt update && sudo apt install -y ripgrep jq gh && curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. 安装主流 CLI Agent（按需任选）
npm install -g @anthropic-ai/claude-code   # Claude Code CLI
npm install -g @openai/codex               # OpenAI Codex CLI

# 3. 验证 Git 与 GitHub CLI 就绪（让 Agent 能直接看 Issue / 提 PR）
git --version && gh auth status
```

## 3. 权限模式与安全边界：既要快、又要稳 / Permission Modes: Fast Yet Safe

| 操作级别 Risk Level | 典型命令 Examples | 推荐权限策略 Recommended Policy |
| :--- | :--- | :--- |
| 🟢 **只读探索** | `ls`, `rg`, `git status`, `git diff`, 读文件 | **自动放行**（减少无意义弹窗打断思路） |
| 🟡 **本地可逆写操作** | 改代码、跑 `pytest` / `npm test`、本地 `git commit` | **沙箱内自动放行**（在功能分支上随时可 `git reset`） |
| 🔴 **不可逆 / 外部影响** | `rm -rf`, `git push --force`, 删库、发邮件、改生产配置 | **永远保持人工审批（Ask Before Run）** |

{% callout tip "桌面软件 + CLI 的黄金联动技巧 / Pro Tip" %}
在项目根目录放一份**极简 `AGENTS.md`**（Claude Code 可用符号链接 `ln -s AGENTS.md CLAUDE.md` 共享同一份规范），这样不管你今天用 Antigravity、Claude Code 还是 Codex，**所有 Agent 自动遵守同一套项目规矩**，零重复维护！
{% endcallout %}

## 4. 延伸官方资源 / Official References

- 📘 **Claude Code Docs**: [Anthropic Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- 📗 **OpenAI Codex**: [OpenAI Codex CLI (GitHub)](https://github.com/openai/codex)
- 🪟 **Microsoft WSL2**: [Install WSL2 on Windows](https://learn.microsoft.com/en-us/windows/wsl/install)
