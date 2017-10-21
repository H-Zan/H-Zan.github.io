---
title: git 新项目第一次提交步骤
date: 2017-08-28 17:15:41
tags: git
---

# 1. 全局设置: (非必须)

```
	git config --global user.name ""
	git config --global user.email ""
```

# 2. cd 进入到已建好的项目文件夹下

* ### 首先先配置 .gitignore (切记, 否则一大堆垃圾就会被上传)

* ### 然后进行以下步骤 (可进行变通)

```
	git init
	git remote add origin git@gitlab.*****.git
	git add .
	git commit -m""
	git push -u origin master
	git config --global user.email ""
```

以上就是之前总结的 git 新项目提交步骤. Have fun guys. 

***Peace.***

