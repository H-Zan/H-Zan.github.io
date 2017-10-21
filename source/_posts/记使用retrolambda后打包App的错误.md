---
title: 记使用retrolambda后打包App的错误
date: 2017-08-30 16:12:46
tags: Android 
---

今天打包 App 报了这么一个错误, 好尴尬... 宝宝没见过啊 -.-|||

#### Error:Execution failed for task':app:transformClassesWithRetrolambdaForRelease'

> Process'command'/Library/Java/JavaVirtualMachines/jdk1.8.0_91.jdk/Contents/Home/bin/java'' finished with non-zero exit value 1

```
10:53:05.175 [INFO] [system.out] 00:01 ERROR: Failed to run Retrolambda
10:53:05.176 [INFO] [system.out] java.lang.RuntimeException: Failed to backport class: com/admai/damai/common/comment/CommentDetailsActivity
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.Transformers.transform(Transformers.java:129)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.Transformers.transform(Transformers.java:107)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.Transformers.backportClass(Transformers.java:47)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.Retrolambda.run(Retrolambda.java:83)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.Main.main(Main.java:28)
10:53:05.176 [INFO] [system.out] Caused by: java.lang.RuntimeException: Failed to backport lambda or method reference: com/admai/damai/common/comment/CommentDetailsActivity.lambda$initViews$0(Landroid/view/View;)V (6)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.LambdaReifier.reifyLambdaClass(LambdaReifier.java:42)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.BackportLambdaInvocations$InvokeDynamicInsnConverter.backportLambda(BackportLambdaInvocations.java:187)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.BackportLambdaInvocations$InvokeDynamicInsnConverter.visitInvokeDynamicInsn(BackportLambdaInvocations.java:176)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.asm.ClassReader.readCode(ClassReader.java:1519)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.asm.ClassReader.readMethod(ClassReader.java:1032)
10:53:05.176 [INFO] [system.out] 	at net.orfjackal.retrolambda.asm.ClassReader.accept(ClassReader.java:708)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.asm.ClassReader.accept(ClassReader.java:521)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.Transformers.lambda$transform$4(Transformers.java:107)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.Transformers.transform(Transformers.java:125)
10:53:05.177 [INFO] [system.out] 	... 4 more
10:53:05.177 [INFO] [system.out] Caused by: java.lang.IllegalAccessException: no such method: com.admai.damai.common.comment.CommentDetailsActivity.lambda$initViews$0(View)void/invokeStatic
10:53:05.177 [INFO] [system.out] 	at java.lang.invoke.MemberName.makeAccessException(MemberName.java:869)
10:53:05.177 [INFO] [system.out] 	at java.lang.invoke.MemberName$Factory.resolveOrFail(MemberName.java:1005)
10:53:05.177 [INFO] [system.out] 	at java.lang.invoke.MethodHandles$Lookup.resolveOrFail(MethodHandles.java:1382)
10:53:05.177 [INFO] [system.out] 	at java.lang.invoke.MethodHandles$Lookup.findStatic(MethodHandles.java:777)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.Types.toMethodHandle(Types.java:46)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.Types.asmToJdkType(Types.java:26)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.LambdaReifier.callBootstrapMethod(LambdaReifier.java:106)
10:53:05.177 [INFO] [system.out] 	at net.orfjackal.retrolambda.lambdas.LambdaReifier.reifyLambdaClass(LambdaReifier.java:37)
10:53:05.177 [INFO] [system.out] 	... 12 more
10:53:05.177 [INFO] [system.out] Caused by: java.lang.VerifyError: Expecting a stackmap frame at branch target 25
10:53:05.177 [INFO] [system.out] Exception Details:
10:53:05.177 [INFO] [system.out]   Location:
10:53:05.177 [INFO] [system.out]     com/admai/baselib/view/BaseActivity.onCreate(Landroid/os/Bundle;)V @9: ifeq
10:53:05.177 [INFO] [system.out]   Reason:
10:53:05.178 [INFO] [system.out]     Expected stackmap frame at this location.
10:53:05.178 [INFO] [system.out]   Bytecode:
10:53:05.178 [INFO] [system.out]     0x0000000: 2a2b b700 162a b600 2399 0010 b200 1310
10:53:05.178 [INFO] [system.out]     0x0000010: 15a1 0008 2a04 b700 24b1               
10:53:05.178 [INFO] [system.out] 
10:53:05.178 [INFO] [system.out] 	at java.lang.invoke.MethodHandleNatives.resolve(Native Method)
10:53:05.178 [INFO] [system.out] 	at java.lang.invoke.MemberName$Factory.resolve(MemberName.java:977)
10:53:05.178 [INFO] [system.out] 	at java.lang.invoke.MemberName$Factory.resolveOrFail(MemberName.java:1002)
10:53:05.178 [INFO] [system.out] 	... 18 more
```

主要是这个错误

```
Caused by: java.lang.VerifyError: Expecting a stackmap frame at branch target 25
```

解决方法呢: 

```
retrolambda {
    jvmArgs '-noverify'
}
```

然后就 ok 啦!

***Peace***
