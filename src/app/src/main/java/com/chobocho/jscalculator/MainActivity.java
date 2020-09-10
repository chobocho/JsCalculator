package com.chobocho.jscalculator;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webview = (WebView)findViewById(R.id.calc_view);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.loadUrl("file:///android_asset/index.html");
    }
}