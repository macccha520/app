// pages/check.js
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    const self = this
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
          self.setData({
            userInfo: res.data
          })
      } 
    })
  },
  onShareAppMessage: function () {
    
  }
})