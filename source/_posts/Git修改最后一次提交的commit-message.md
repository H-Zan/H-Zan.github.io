---
title: Git修改最后一次提交的commit message
date: 2018-09-27 12:55:51
tags: git
---

1. 获取log

   - `git rflog`

     >c980337 HEAD@{0}: commit: feat(MainActivity):optimize the UI of city selection
     >e7e73e5 HEAD@{1}: commit: fix(MainActivity):change the way to impl city selection

   - `q`

2. 重新编辑commit信息

   - `git commit --amend -c HEAD`
   - `i`
   - `编辑`
   - `esc`
   - `:wq`

3. force 推送 (慎用)

   - `git push -f`



