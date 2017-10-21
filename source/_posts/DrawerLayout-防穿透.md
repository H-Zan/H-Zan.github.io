---
title: DrawerLayout 防穿透
date: 2017-09-01 16:40:38
tags: Android
---

### 在父布局添加
`
android:clickable="true"
`

eg:

```
<LinearLayout
    android:id="@+id/ll_drawer"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_gravity="start"
    android:background="@color/cardview_light_background"
    android:fitsSystemWindows="true"
    android:orientation="vertical"
    android:clickable="true"
    >
        
    <include layout="@layout/nav_header_main"/>
    <include layout="@layout/menu_layout"/>
    
</LinearLayout>
```

***Peace.***