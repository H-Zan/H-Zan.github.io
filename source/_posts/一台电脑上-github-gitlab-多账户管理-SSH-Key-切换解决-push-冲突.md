---
title: 一台电脑上 github/gitlab 多账户管理 SSH Key 切换解决 push 冲突
date: 2017-09-18 18:13:09
tags: git
---
## 1. 配置 Git 用户名、邮箱

```
# 全局配置  公司邮箱
git config --global user.name 'huzan'
git config --global user.email 'huzan@***.com'
git config --global user.name 'huzan'
git config --global user.email 'huzanzan@luk360.com"
```
```
# 项目配置，每次新创建一个项目，需要执行下: 这个要在自己的每个项目中配置,否则用的是公司的邮箱!!!
git config --local user.name 'hu.zan'
git config --local user.email 'huzan@***.com'
```

## 2. 生成 ssh key 上传到 Github/Gitlab
ssh key 默认生成后保存在 ~/.ssh/目录下 ，默认为 id_rsa 和 id_rsa.pub 两个文件，由于需要分开配置，所以这么做:

```
# 生成默认，Gitlab使用
ssh-keygen -t rsa -C "huzan@***.com"
```
```
# 生成公钥、密钥的同时指定文件名，Github使用
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "huzan@***.com"
一路回车即刻
```

## 3.  密钥添加到SSH agent中

因为默认只读取id_rsa，为了让SSH识别新的私钥，需将其添加到SSH agent中：

```
ssh-add ~/.ssh/id_rsa.github
```

如果出现Could not open a connection to your authentication agent的错误，就试着用以下命令：

```
ssh-agent bash
ssh-add ~/.ssh/id_rsa.github
```

这时会出现:
Identity added: /Users/macmi001/.ssh/id_rsa.github (/Users/macmi001/.ssh/id_rsa.github)
表示添加成功

## 4. 配置 config 文件

在 ~/.ssh目录下，如果不存在，则新建文件: touch ~/.ssh/config ，文件内容添加如下：

```
Host *.github.com

     IdentityFile ~/.ssh/id_rsa.github

     User hu.zan
```

配置完成后，符合 *.github.com后缀的 Git 仓库，均采取~/.ssh/id_rsa.gitlab 密钥进行验证，其它的采取默认的。

## 5. 上传public key 到 Github/Gitlab

以Github为例，过程如下：

```
登录github
点击右上方的Accounting settings图标
选择 SSH key
点击 Add SSH key
```

在出现的界面中填写SSH key的名称，填一个自己喜欢的名称即可，然后将上面拷贝的~/.ssh/id_rsa.github.pub文件内容粘帖到key一栏，在点击“add key”按钮就可以了。
添加过程github会提示你输入一次你的github密码 ，确认后即添加完毕。 上传Gitlab的过程一样.

## 6. 验证是否OK

由于每个托管商的仓库都有唯一的后缀，比如 Github的是 git@github.com:*，所以可以这样测试：

```
ssh -T git@github.com

提示:
Hi huzandevil! You've successfully authenticated, but GitHub does not provide shell access.
```

```
ssh -T git@gitlab.adxmai.com

提示: 
Welcome to GitLab, 胡赞!
```

要用ssh(git@), 否则用 http 的话, 会提示输入密码




