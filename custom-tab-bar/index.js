Component({
  data: {
    animations: [], // 存储各tab动画对象
    textAnimations: [],
    isIPhoneX: false,
    selected: 0,
    list: [
      {
        "pagePath": "/pages/home/index",
        "iconPath": "../image/home-d.png",
        "selectedIconPath": "../image/home-a.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/goods/index",
        "iconPath": "../image/building-d.png",
        "selectedIconPath": "../image/building-a.png",
        "text": "商品"
      },
      {
        "pagePath": "/pages/category/index",
        "iconPath": "../image/shop-d.png",
        "selectedIconPath": "../image/shop-a.png",
        "text": "购物车"
      },
      {
        "pagePath": "/pages/orders/index",
        "iconPath": "../image/user-d.png",
        "selectedIconPath": "../image/user-a.png",
        "text": "我的"
      }
    ]
  },

  lifetimes: {
    attached() {
      // 检测是否是iPhone X及以上机型
      const systemInfo = wx.getDeviceInfo();
      this.setData({
        isIPhoneX: systemInfo.model.indexOf('iPhone X') !== -1 || 
                  systemInfo.model.match(/iPhone (1[1-9]|2[0-9])/) !== null
      });
    }
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({ selected: data.index });
    }
  }
});