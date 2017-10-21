---
title: sql查询语句
date: 2017-09-03 16:56:01
tags: sql
---
## 去重查询

1.

```
SELECT * FROM (select Row_number() OVER(PARTITION BY sdk_log.m_android_id ORDER BY sdk_log.m_android_id) AS RowId,* FROM sdk_log where dt='2016-12-23' and sdk_log.m_error_info = 'APPStart!') x WHERE x.RowId=1
```

2.

```
select distinct sdk_log.m_android_id from sdk_log where dt='2016-12-23' and sdk_log.m_error_info = 'APPStart!'
```

## 多条件查询

```
select * from sdk_log where dt='2016-12-22' and and sdk_log.m_error_info = 'APPStart!'
```

***Peace.***