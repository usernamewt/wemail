Component({
  data: {
    statusBarHeight: 0, // 状态栏高度
    navBarHeight: 28,   // 导航栏标准高度
  },
  properties:{
    mainHeight:{
      type:Number,
      value:"28"
    },title:{
      type:String,
      value:"爽爽吃"
    },
  },
  onshow(){},
  lifetimes: {
    // 组件实例刚被创建好时触发created生命周期函数
    // 此时不能调用setData，只能添加一些自定义的属性字段
    // 在组件初始化完毕，进入页面节点树时触发attched生命周期函数
    // 此时，this.data初始化完毕，数据初始化的操作可以在此操作
    // 在组件离开页面节点时，触发detached生命周期函数
    // 退出页面时触发，可以做一些清理数据方面的操作
    ready() {
      const { statusBarHeight } = wx.getSystemInfoSync()
      this.setData({ 
        statusBarHeight,
        navBarHeight: statusBarHeight + this.properties.mainHeight
      })
    },
  }
})