---
title: 去除button的阴影
date: 2018-09-08 01:11:51
tags: Android
---



# 1. xml 中直接给Button设置style

```
style="?android:attr/borderlessButtonStyle"
```



# 2. 给button的style设置一位父亲

```xml
<style name="style_login_btn" parent="Widget.AppCompat.Button.Borderless">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">@dimen/clear_et_height</item>
        <item name="android:background">@drawable/selector_bg_btn_login</item>
        <item name="android:textColor">@color/white</item>
        <item name="android:textSize">@dimen/txt_15</item>
        <item name="android:textStyle">bold</item>
</style>
```

***Peace***