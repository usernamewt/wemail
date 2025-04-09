// pages/goodDetail/index.js
import {goodDetail} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"标题",
    navList:[],
    current:0,
    isIPhoneX:false,
    statusBarHeight:0,
    datas:null
  },
  leftClick(){
    wx.navigateBack();
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
    console.log(options.id);
    const systemInfo = wx.getDeviceInfo();
    const { statusBarHeight } = wx.getSystemInfoSync()
    goodDetail.getGoodsDetail({id:options.id}).then(res=>{
      this.setData({
        datas:res.data,
        navList:res.data.carousel_img.split(","),
        title:res.data.description,
        isIPhoneX: systemInfo.model.indexOf('iPhone X') !== -1 || 
        systemInfo.model.match(/iPhone (1[1-9]|2[0-9])/) !== null,
        statusBarHeight
      })
    })
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