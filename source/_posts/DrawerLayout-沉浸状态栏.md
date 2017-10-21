---
title: DrawerLayout 沉浸状态栏
date: 2017-09-02 16:48:37
tags: Android
---

## 在 setContentView() 之后使用

```
setContentView(R.layout.activity_main);
setTranslucentForDrawerLayout(this,drawerLayout);
```

```
public void setTranslucentForDrawerLayout(Activity activity, DrawerLayout drawerLayout) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        // 设置状态栏透明
        activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        // 设置内容布局属性
        ViewGroup contentLayout = (ViewGroup) drawerLayout.getChildAt(0);
        contentLayout.setFitsSystemWindows(false);
        contentLayout.setClipToPadding(true);
        // 设置抽屉布局属性
		 // ViewGroup vg = (ViewGroup) drawerLayout.getChildAt(1);
        // vg.setFitsSystemWindows(false);
        // 设置 DrawerLayout 属性
        drawerLayout.setFitsSystemWindows(false);
    }
}
```

## baseActivity 中 onCreate

```
if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT) {
    setTranslucentStatus(true);
}
beforeSuperOnCreate();
super.onCreate(savedInstanceState);
```

```
@TargetApi(Build.VERSION_CODES.KITKAT)
private void setTranslucentStatus(boolean on) {
    Window win = getWindow();
    WindowManager.LayoutParams winParams = win.getAttributes();
    final int bits = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
    if (on) {
        winParams.flags |= bits;
    } else {
        winParams.flags &= ~bits;
    }
    win.setAttributes(winParams);
}
```

***Peace.***

