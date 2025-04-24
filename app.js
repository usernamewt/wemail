// app.js
App({
  onLaunch() {
  },
  globalData: {
    userInfo: null,
    // baseUrl:"http://127.0.0.1:8082",
    baseUrl: "http://47.120.49.37:8082",
    tabBarHeight: wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().windowHeight + 50,
    userToken: null,
    watch: function (variate, method) {
      var obj = getApp().globalData;
      let val = obj[variate];
      Object.defineProperty(obj, variate, {
        set: function (value) {
          val = value;
          method(variate, value);
        },
        get: function () {
          return val;
        }
      })
    }
  }
})