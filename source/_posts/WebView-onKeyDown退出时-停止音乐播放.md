---
title: WebView  onKeyDown退出时 停止音乐播放
date: 2017-09-06 17:18:09
tags: Android
---

## 停止网页音乐播放

```
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_BACK) {
        String s = event.toString();
        if (maiH5 != null) {
            AudioManager am = (AudioManager)getSystemService(Context.AUDIO_SERVICE);
            boolean musicActive = am.isMusicActive();//判断Music是否在播放
            Log.e(TAG, "onKeyDown: "+ musicActive+s);
            WebView webView = maiH5.getWebView();
            if (webView != null && webView.canGoBack()) {
                webView.goBack();
                return true;
            } else {
                // TODO: 16/8/23 让webview停止加载  音乐停止
                // webView.pauseTimers();
                // webView.clearCache(true);
                // webView.stopLoading();
                // webView.destroyDrawingCache();
                webView.destroy();
                AdViewLayout.removeView(maiH5);
                maiH5 = null;
                // webView=null;
                AdViewLayout.setVisibility(View.GONE);
                Log.e(TAG, "destroy " );
                return true;
            }
        }
    }
    return super.onKeyDown(keyCode, event);
 }
```

***Peace.***