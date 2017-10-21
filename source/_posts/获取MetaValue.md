---
title: 获取MetaValue
date: 2017-09-11 17:52:12
tags: Android 
---

```
public class ManifestUtil {

    public static String getMetaValue(Context context, String packageName, String attrName) {
        String value = null;
        ApplicationInfo applicationInfo;
        try {
            applicationInfo = context.getPackageManager().getApplicationInfo(
                    packageName, PackageManager.GET_META_DATA);
            Object obj = (applicationInfo.metaData != null ? applicationInfo.metaData.get(attrName) : null);
            if (obj != null) {
                value = String.valueOf(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return value;
    }
    
}
```

***Peace.***