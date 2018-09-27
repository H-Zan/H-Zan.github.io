---
title: Mac - Jenkins - Android 持续集成打包
date: 2018-09-17 16:50:48
tags: Jenkins
---

# Mac - Jenkins - Android 持续集成打包

1. 安装 Jenkins

   > `$ brew install jenkins`

2. 启动 Jenkins

   1. 命令行启动:

      > `$ jenkins `

      输入密码：密码的路径就在这个标红的路径下可以找到

   2. 浏览器打开 Jenkins:

      > 浏览器地址栏输入 [http://localhost:8080](http://localhost:8080) 

   3. 输入密码：

      > 密码的路径就在**标红的路径**下可以找到

   4. 插件安装:

      > 建议采用推荐安装的方式

      - 安装 Android Lint 插件

        > 系统管理 -> 管理插件 -> 搜索`Android Lint` 安装

3. 配置 Jenkins

   1. Android环境配置: 

      > 系统管理 -> 系统设置 -> 全局属性 -> 环境变量 -> 键值对列表
      >
      > **键值必须是ANDROID_HOME**
      >
      > - ANDROID_HOME 
      > - /Users/zan/Library/Android/sdk

   2. Gradle环境配置: 

      > `command execution failed java.io.IOException: Cannot run program "gradle" (in directory ".jenkins/workspace"): error=2, No such file or directory`
      >
      > 不配置的话会出现上述错误

      1. 找到Gradle路径

         > Gradle 在Android Studio 包下
         >
         > - (应用程序 -> 找到Android Studio ->右击 -> 显示包内容 -> Contents -> gradle -> gradle-4.4 -> bin )
         >
         > /Applications/Android\ Studio.app/Contents/gradle/gradle-4.4/bin

      2. 配置Gradle全局变量(若已配置过则省略)

         1. 打开.bash_profile

            > `$ open -e .bash_profile`

         2. 配置全局变量到 bash_profile, 并保存

            > ```
            > GRADLE_HOME=/Applications/Android\ Studio.app/Contents/gradle/gradle-4.4;(Gradle的本机路径)
            > export GRADLE_HOME
            > export PATH=$PATH:$GRADLE_HOME/bin
            > ```

         3. source命令使配置生效

            > `$ source .bash_profile`
            >
            > （source + 文件名)

         4. 测试gradle配置是否成功

            > `gradle -version`

            - 若出现 `bash: /Applications/Android Studio.app/Contents/gradle/gradle-4.1/bin/gradle: Permission denied `错误

              > **解决方法**
              >
              > `$ cd /Applications/Android\ Studio.app/Contents/gradle/gradle-4.4/bin`
              >
              > `$ chmod +x gradle`

            - 继续测试, 这时候就该成功了

      3. Jenkins 上配置 gradle

         1. 找到 gradle 配置

            > 系统管理 -> 全局工具配置 -> Gradle -> Gradle 安装 -> 新增Gradle

         2. 配置名称以及GRADLE_HOME

            > name : gradle-4.4 (随便起名字)
            >
            > GRADLE_HOME: /Applications/Android Studio.app/Contents/gradle/gradle-4.4 (Gradle路径)
            >
            > **取消自动安装的勾选**

         3. 保存配置

4. 创建新的Android项目

   1. 新建任务

      > 1. 填入名称(随便)
      > 2. 构建自由软件风格
      > 3. 确定

   2. 任务详情配置

      > 1. 源码管理 -> Git
      >
      >    > - Repository URL : git@github.com:H-Zan/BranchTest.git
      >    >
      >    > - Credentials (ssh 配置)
      >    >
      >    >   - Add -> jenkins
      >    >
      >    >     > **Domain** : 全局凭据
      >    >     >
      >    >     > **类型** : SSH Username with private key (注意是private key)
      >    >     >
      >    >     > **范围** : 全局即可
      >    >     >
      >    >     > **Username** : Zan (随便填)
      >    >     >
      >    >     > **Private Key** : Enter directly
      >    >     >
      >    >     > - 把 .ssh 下  **id_rsa.gitLab** 里的 private key 粘贴到 Enter directly 中
      >    >     >
      >    >     > - 也就是 **id_rsa.gitLab** 里的 private key (**所有文字**), 而不是 **id_rsa.gitLab.pub **里的 public key
      >    >     >
      >    >     > **Passphrase **: 如果配置ssh的时候没有做其他处理的话, 不用写
      >    >     >
      >    >     > **描述** : gitlab随便填写(用于区分)
      >    >
      >    >   - 添加
      >    >
      >    > - 勾选刚刚添加好的 Zan(gitlab)
      >
      > 2. 保存任务

   3. 立即构建任务 

      > (必须要先构建一次: 此时会拉取代码)
      >
      > 但不会产生apk

   4. 添加gradle构建

      > 构建 -> 增加构建步骤 -> 选择 Invoke Gradle script 
      >
      > - 勾选 Invoke Gradle
      >
      >   > Gradle Version : `gradle-4.4` (选择上步骤自己配置的gradle)
      >
      > - 不勾选Use Gradle Wrapper
      >
      >   > **BUT**
      >   >
      >   > - Tasks :  `build`
      >   >
      >   > - 高级 
      >   >
      >   >   > Build File : `${workspace}/build.gradle`
      >   >   >
      >   >   > **填写的是这个项目下的build.gradle路径**

   5. 再次构建

      > 此时便可以产生apk

5. 将构建好的apk上传到蒲公英

   1. apk路径

      `/Users/zan/.jenkins/workspace/Anyo/app/build/outputs/apk/release/app-release.apk`

   2. 添加上传到蒲公英的脚本

      1. 找到自己的项目 -> 配置 -> 构建 -> 增加构建步骤 -> 执行shell -> 把命令填入

         `curl -F "file=@apk路径" -F "uKey=蒲公英的userkey" -F "_api_key=蒲公英的apikey" http://www.pgyer.com/apiv1/app/upload`

6. 上传完成后发送邮件通知




# issue

1. git 超时 (Timeout after 10 minutes)

   ```
   ERROR: Timeout after 10 minutes
   ERROR: Error fetching remote repo 'origin'
   hudson.plugins.git.GitException: Failed to fetch from git@172.16.100.2:anyodev/android-client-new.git
   	at hudson.plugins.git.GitSCM.fetchFrom(GitSCM.java:888)
   	at hudson.plugins.git.GitSCM.retrieveChanges(GitSCM.java:1155)
   	at hudson.plugins.git.GitSCM.checkout(GitSCM.java:1186)
   	at hudson.scm.SCM.checkout(SCM.java:504)
   	at hudson.model.AbstractProject.checkout(AbstractProject.java:1208)
   	at hudson.model.AbstractBuild$AbstractBuildExecution.defaultCheckout(AbstractBuild.java:574)
   	at jenkins.scm.SCMCheckoutStrategy.checkout(SCMCheckoutStrategy.java:86)
   	at hudson.model.AbstractBuild$AbstractBuildExecution.run(AbstractBuild.java:499)
   	at hudson.model.Run.execute(Run.java:1815)
   	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
   	at hudson.model.ResourceController.execute(ResourceController.java:97)
   	at hudson.model.Executor.run(Executor.java:429)
   Caused by: hudson.plugins.git.GitException: Command "git fetch --tags --progress git@172.16.100.2:anyodev/android-client-new.git +refs/heads/*:refs/remotes/origin/*" returned status code 143:
   ```



   > **Solution steps:**
   >
   > 1. For resolve the problem we have to edit in Jenkins project configuration and find the "git".
   > 2. Then click on "Add" button and select "Advanced clone behaviours".
   > 3. Then in Timeout (in minutes) for clone and fetch operations box put any number which is more then 10, (I put 60 here).
   > 4. Apply and the save the configuration.
   > 5. Build Now again , It took some more time to build , but it will fixed this error.

   >**解决步骤:**
   >
   >1. 找到项目
   >2. 配置
   >3. 源码管理 -> Git
   >4. Additional Behaviours -> Advanced clone behaviours
   >5. Timeout (in minutes) for clone and fetch operations : 100 (自己填超时的分钟数)
   >6. Shallow clone 可以勾选, 用来降低拉取时间