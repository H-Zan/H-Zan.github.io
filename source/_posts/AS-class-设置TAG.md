---
title: AS class 设置TAG
date: 2017-09-05 17:08:15
tags: AS
---

## Android Studio 给 class 设置 TAG

```
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
public class ${NAME} {
	private static final String TAG = "$NAME";
	public ${NAME}(){}
}
```