---
title: git 错误
date: 2017-09-13 17:57:01
tags: git
---

1.

```
Not a git repository (or any of the parent directories): .git
```

> 使用 git init 语句

2.

```
push.default is unset; its implicit value has changed in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the traditional behavior, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

When push.default is set to 'matching', git will push local branches
to the remote branches that already exist with the same name.

Since Git 2.0, Git defaults to the more conservative 'simple'
behavior, which only pushes the current branch to the corresponding
remote branch that 'git pull' uses to update the current branch.

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)

Everything up-to-date
```

> 使用 git config --local push.default simple

3.mac钥匙串中会记住别人的github密码要删除

4.ssh 要用ssh 不要用http,用http要输入密码

***Peace.***