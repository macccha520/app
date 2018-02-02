// pages/extract.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
          title: '红包提现'
    })
  },
  onShareAppMessage: function () {
  
  },
  commonPage(){
    wx.navigateTo({
      url: '../common/common'
    })
  },
  indexPage(){
    wx.navigateTo({
      url: '../index/index'
    })
  }
})