// pages/home/index.js
import {getNavAll,goodsinhome,userApi} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,current: 0,
    prodNavList:[],
    isLogin:getApp().globalData.userToken
  },
  click(e){
    console.log(e.target.dataset.value);
    wx.navigateTo({
      url: '/pages/goodDetail/index?id='+e.target.dataset.value.id,
    })
  },

  login() {
    wx.login({
      success: (res) => {
        const {code} = res;
        userApi.login({code:code}).then(logininfo=>{
          getApp().globalData.userToken = logininfo.data
          wx.setStorageSync('token',logininfo.data)
        })
      },
    })
  },
  onSwipeChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync("token")){
      this.setData({
        isLogin:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().setData({ selected: 0 })
    getNavAll.getNavList().then(res=>{
      this.setData({navList:res.data})
    })
    goodsinhome.getHomeGoods().then(res=>{
      let goods = res.data.map(el=>{
        el.type = el.classification.cate_name
        return el
      });
      goods = goods.reduce((acc,current)=>{
        const { type, ...rest } = current;
        if (!acc[type]) {
          acc[type] = {
            img:current.classification.cate_img,
            goods:[],
            type:current.type
          }; // 如果该 type 不存在，初始化一个空数组
        }
        acc[type].goods.push(rest); // 将当前对象（排除 type）加入对应分类
        return acc;
      },{})
      this.setData({
        prodNavList:Object.values(goods)
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})