---
title: WebView  自动播放h5音乐
date: 2017-09-07 17:25:19
tags: Android
---

```
if (msg.what == SUCCESS_CREAT_INFOVIEW) {
    webView = new WebView(context);
    LayoutParams layoutParams = new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    webView.setLayoutParams(layoutParams);
    // WebSettings 抽象类
    WebSettings webSettings = webView.getSettings();
    webSettings.setUseWideViewPort(true);//设置此属性，可任意比例缩放
    webSettings.setLoadWithOverviewMode(true);
    //启用Js
    webSettings.setJavaScriptEnabled(true);
    //js可以弹出窗体 对话框
    webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
    // 自动播放
    webView.setWebViewClient(new WebViewClient(){
        /**
         * 当前网页的链接仍在webView中跳转
         */
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            //如果返回值 是 true  使用自身的浏览器内核   如果使用false  启用其他的浏览器打开数据
            return true;
        }
        /**
         * 页面载入完成回调
         */
        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            // 可能是音频
            // view.loadUrl("javascript:(function() { " +
            // "var videos = document.getElementsByTagName('video');" +
            // " for(var i=0;i<videos.length;i++){videos[i].play();}})()");
            //让H5页面自动播放   必须在此回调中使用
            view.loadUrl("javascript:(function() { " +
                     "var videos = document.getElementsByTagName('audio');" +
                     " for(var i=0;i<videos.length;i++){videos[i].play();}})()");
         }

	});
    MaiAdapter.this.addView(webView);
    // webView.loadUrl("https://www.baidu.com");
    // webView.loadUrl(maiAd.src);
    webView.loadUrl("http://abcccc8b.h5.baomitu.com/app/3C1fYR3z.html?iframe=1");
    // webView.loadUrl("http://g.eqxiu.com/s/O9aom2xC?eqrcode=1");
    maiController.sendMonitoropm(startTime, SUCCESS_SHOW);
}
```

***Peace.***
