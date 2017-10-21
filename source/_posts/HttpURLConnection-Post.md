---
title: HttpURLConnection Post
date: 2017-09-09 17:46:29
tags:
---

```
/**
 * post 请求 带请求参数
 * @param _url
 * @return
 */
public String get(String _url) {
    maiRequest.m_ts = System.currentTimeMillis();
    String json = new Gson().toJson(maiRequest);
    BufferedOutputStream bos = null;
    BufferedInputStream bis = null;
    HttpURLConnection httpConn = null;
    try {
        URL urlObj = new URL(_url);
        httpConn = (HttpURLConnection) urlObj.openConnection();
        // 如果通过post方式给服务器传递数据，那么setDoOutput()必须设置为true。否则会异常。
        // 默认情况下setDoOutput()为false。
        // 其实也应该设置setDoInput()，但是因为setDoInput()默认为true。所以不一定要写。
        httpConn.setDoInput(true);
        httpConn.setDoOutput(true);
        httpConn.setRequestMethod("POST");
        httpConn.setConnectTimeout(2 * 1000);
        // 设置请求方式。请求方式有两种：POST/GET。注意要全大写。
        // POST传递数据量大，数据更安全，地址栏中不会显示传输数据。
        // 而GET会将传输的数据暴露在地址栏中，传输的数据量大小有限制，相对POST不够安全。但是GET操作灵活简便。
        // 判断是否要往服务器传递参数。如果不传递参数，那么就没有必要使用输出流了。
        httpConn.setRequestProperty("Content-Type", "application/json");
        httpConn.setRequestProperty("charset", "UTF-8");
        if ( json!= null) {
            byte[] data = json.getBytes();
            bos = new BufferedOutputStream(httpConn.getOutputStream());
            bos.write(data);
            bos.flush();
        }
        // 判断访问网络的连接状态
        if (httpConn.getResponseCode() == 200) {
            bis = new BufferedInputStream(httpConn.getInputStream());
            // 将获取到的输入流转成字节数组
            String s = new String(streamToByte(bis));
            return s;
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (bis != null) {
                bis.close();
            }
            if (bos != null) {
                bos.close();
            }
            httpConn.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    return null;
}

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