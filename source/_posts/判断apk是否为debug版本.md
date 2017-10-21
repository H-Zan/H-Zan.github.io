---
title: 判断apk是否为debug版本
date: 2017-08-31 16:33:41
tags: Android
---

命令:

`
jarsigner -verify -verbose -certs <apk文件>
`

一般正常情况下如果有Android Debug字样, 就是debug