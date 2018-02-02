// pages/packet.js
 const app = getApp()
Page({
  data: {
    src:'',
    username: '',

  },
  onLoad: function (options) {
  
    this.setData({
      src: app.globalData.userInfo.avatarUrl,
      username: app.globalData.userInfo.nickName
    })
    wx.setNavigationBarTitle({
          title: '查看红包'
    })
  },
  onReady: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  extractPage(){
    wx.navigateTo({
      url: '../extract/extract'
    })
  }
})