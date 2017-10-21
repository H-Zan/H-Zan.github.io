---
title: HttpURLConnection Get
date: 2017-09-08 17:42:00
tags: Android 
---

```
/**
 * @param _url ：访问网络的url地址
 * @return  boolean 是否连接成功
 */
public boolean postMonitorGet(String _url) {
    HttpURLConnection httpConn = null;
        BufferedInputStream bis = null;
        try {
            URL urlObj = new URL(_url);
            httpConn = (HttpURLConnection) urlObj.openConnection();
            httpConn.setRequestMethod("GET");
            httpConn.setDoInput(true);
            httpConn.setConnectTimeout(2000);
            httpConn.connect();
            if (httpConn.getResponseCode() == 200) {
                bis = new BufferedInputStream(httpConn.getInputStream());
                String s = new String(streamToByte(bis));
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) {
                    bis.close();
                }
                httpConn.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
}                                                                      }

public static byte[] streamToByte(InputStream is) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    int c = 0;
    byte[] buffer = new byte[8 * 1024];
    try {
        while ((c = is.read(buffer)) != -1) {
            baos.write(buffer, 0, c);
            baos.flush();
        }
        return baos.toByteArray();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (baos != null) {
                baos.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    return null;
}
```

***Peace.***
