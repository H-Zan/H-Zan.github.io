---
title: 'AppBarLayout 去掉边缘阴影,完全透明'
date: 2017-09-04 17:01:00
tags: Android 
---

## 添加此句
`
app:elevation="0dp"
`

```
<android.support.design.widget.AppBarLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      android:id="@+id/appbar_layout"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:background="@color/TransA"
      app:elevation="0dp">
```

***Peace.***