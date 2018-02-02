// pages/notice.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
          title: '公告'
    })
  },
  onShareAppMessage: function () {
  
  },
  indexPage(){
    wx.navigateTo({
      url: '../index/index'
    })
  }
})