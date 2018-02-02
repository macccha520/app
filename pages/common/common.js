// pages/common.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
          title: '常见问题'
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