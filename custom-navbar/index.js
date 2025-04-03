Component({
  data: {
    statusBarHeight: 0, // 状态栏高度
    navBarHeight: 28,   // 导航栏标准高度
  },
  properties:{
    title:{
      type:String,
      value:"爽爽吃"
    }

  },

  lifetimes: {
    attached() {
      const { statusBarHeight } = wx.getSystemInfoSync()
      this.setData({ 
        statusBarHeight,
        navBarHeight: statusBarHeight + 28
      })
    }
  }
})