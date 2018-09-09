---
title: 使用Commitizen 规范 Git Commit Message
date: 2018-04-11 13:09:28
tags: git
---

# 1. 安装 NPM (待完善)

# 2. Commitizen 配置及使用

> Commitizen是一个格式化commit message的工具

```
npm install -g commitizen
```

> 使用 Angular 的 commit message，那么就在我们项目的目录下输入以下命令：

```
commitizen init cz-conventional-changelog --save --save-exact
```

> 但是注意，因为commitizen工具是基于Node.js的，而Android项目工程目录下是没有package.json文件，所以会报错：

```
Error: ENOENT: no such file or directory, open '/Users/***/package.json
```

> 参考commitizen的[issue：Usage in non-node projects?](https://github.com/commitizen/cz-cli/issues/102)，对于非Node的项目，我们可先在我们项目中添加一个空的package.json文件，然后再输入命令：

```
npm init --yes
```

> 先初始化配置package.json文件，然后再输入命令：

```
commitizen init cz-conventional-changelog --save --save-exact
```

> 当我们提交的时候，就用git cz替换git commit命令，会出现提交类型的选择,然后根据提示选择、输入就可以
>
> 如果是第二次配置，需要用–force：

```
commitizen init cz-conventional-changelog --save --force
```

**必要时(如出现找不到命令时)可以重启命令行工具 or Android Studio**

# 3. 生成CHANGELOG

> conventional-changelog 是生成 Change log 的工具。
>
> 参考 [Git 提交记录和分支模型](https://cattail.me/tech/2016/06/06/git-commit-message-and-branching-model.html)
>
> Commitizen 依据 conventional message，创建起一个生态：

- conventional-changelog-cli：通过提交记录生成 CHANGELOG.md
- conventional-github-releaser：通过提交记录生成 github release 中的变更描述
- conventional-recommended-bump：根据提交记录判断需要升级 Semantic Versioning 哪一位版本号
- validate-commit-msg：检查提交记录是否符合约定

```
$ npm install -g conventional-changelog-clibash
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -s
```

你会发现在项目中多了CHANGELOG.md文件，表示生成 Change log成功。

\>

```
# 增量生成changelog 不会覆盖以前的changelog
# 不会覆盖以前的 Change log，只会在 CHANGELOG.md 的头部加上自从上次发布以来的变动
$ conventional-changelog -p angular -i CHANGELOG.md -s
```



```
# 全部重新生成 Change log
$ conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

------

本文参考 [Commit Message & Change Log](https://www.jianshu.com/p/00c9ec4e552e)

**Peace**