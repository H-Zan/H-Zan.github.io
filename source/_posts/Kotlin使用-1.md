---
title: Kotlin使用(1)
date: 2018-04-10 13:05:09
tags: Kotlin
---

# 自定义View

```kotlin
class TabComponent @JvmOverloads constructor(context: Context,
                                             attrs: AttributeSet? = null,
                                             defStyleAttr: Int = 0,
                                             var i: Int = 0,//tab的序列位置
                                             var iconResNormal: Int = 0,//未选中时的icon
                                             var iconResSelect: Int = 0,//选中时的icon
                                             var textRes: String = "",//tab文字
                                             var mListener: TabComponent.TabSelectListener? = null)
    : LinearLayout(context, attrs, defStyleAttr), View.OnClickListener {

    var icon: ImageView//tab内的icon
    var text: TextView//tab内的文字
    val textColorNormal: Int = R.color.tab_color_unselected//未选中时的文字颜色
    val textColorSelect: Int = R.color.tab_color_selected//选中时的文字颜色

    init {
        //获取属性值
        val typedArray = context.obtainStyledAttributes(attrs, R.styleable.TabComponent)

        iconResNormal = typedArray.getResourceId(R.styleable.TabComponent_iconNormal, 0)
        iconResSelect = typedArray.getResourceId(R.styleable.TabComponent_iconSelect, 0)
        textRes = typedArray.getString(R.styleable.TabComponent_text)

        typedArray.recycle()//typedArray 使用完毕后必须调用

        //获取控件
        LayoutInflater.from(context).inflate(R.layout.layout_tab_item, this)
        icon = findViewById(R.id.tab_item_icon)
        text = findViewById(R.id.tab_item_text)

        text.text = textRes
        unSelected()//初始化默认未选中
    }
```

# ArrayList

```kotlin
var tabs: ArrayList<TabComponent>

tabs = arrayListOf(tab_item_1, tab_item_2, tab_item_3, tab_item_4)
```

**Peace**