---
title: git 分支管理 hexo
date: 2017-10-21 10:05:48
tags: hexo
---

# git 部署

## github 上创建仓库 (已创建的省略)

## 在喜欢的文件夹内, 把 *.github.io 仓库 clone 到本地

``` 
$ git clone git@github.com:*.github.io.git 
```

`把除了 .git 的文件都删掉`


## 新建分支 hexo 用于管理 hexo 源文件

```
$ git checkout -b hexo
```

1. 若没有之前的源文件

	* 在自己喜欢的文件夹内（D：\Hexo），点击鼠标右键选择Git bash，输入指令：(会在目标文件夹内建立网站所需要的所有文件)
 
		```
		$ hexo init	
		```

	* 安装依赖包
	
		```
		$ npm install	
		```

	* 预览 
	
 		`先在对应文件夹下执行以下命令, 然后在浏览器输入localhost:4000查看`
		
		```
		$ hexo server
		$ hexo generate 
		```

2. 若有之前的源文件

	* 把之前的源文件复制过来

`都是在hexo分支上操作`

## 修改 _config.yml 中 deploy 参数的 branch 为 master (之前修改过的, 这步省略)
	
 `先在对应文件夹下执行以下命令, 然后在浏览器输入localhost:4000查看`

```
$ hexo server
$ hexo generate 
```

## 把源文件推送到 hexo 分支

```
$ git add .
$ git commit -m "描述"
$ git push --set-upstream origin hexo
```

## 在 github 上将 hexo 设为默认分支

## 将生成网站并部署到 GitHub 上

```
$ hexo g -d
```

---

# 使用

## 切换电脑后

1. clone 仓库 (默认分支为hexo)

	```
	$ git clone git@github.com:*.github.io.git
	```
 
2. 在本地 *.github.io 文件夹下通过 Git bash 依次执行下列指令：

	```
	$ npm install hexo
	$ npm install 
	$ npm install hexo-deployer-git 
	```

`（切记，不需要 hexo init 这条指令）`


***Peace.***