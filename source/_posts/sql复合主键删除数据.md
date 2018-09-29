---
title: sql复合主键删除数据
date: 2018-09-29 13:10:03
tags: sql
---

1. 复合主键删除数据

   ```sql
   DELETE FROM search_history WHERE key1 in(:values) AND key2 in(:values)
   ```

2. 复合主键删除多余的条数

   ```sql
   //DELETE FROM search_history WHERE key1 in() AND key2 in()
   //使用limit限制查询的起始位置与条数 limit 5, 10 -> limit offsetNum,quaryNum 
   //使用count查询复合条件的条数 SELECT COUNT(type = :type) FROM search_history)
   
   DELETE FROM search_history WHERE `key` in (SELECT `key` FROM search_history WHERE type is :type order by time DESC limit :offsetNum, (SELECT COUNT(type = :type) FROM search_history)) AND type = :type
   
   DELETE FROM search_history WHERE `key` in (SELECT `key` FROM search_history WHERE type is :type order by time DESC limit :offsetNum, (SELECT COUNT(type = :type) FROM search_history)) AND type IN (SELECT type FROM search_history WHERE type is :type order by time DESC limit offsetNum, (SELECT COUNT(type = :type) FROM search_history))
   ```
