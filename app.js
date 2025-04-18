// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:"http://127.0.0.1:8082",
    baseUrl:"http://47.120.49.37:8082",
    tabBarHeight: wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().windowHeight + 50,
    userToken:null
  }
})
