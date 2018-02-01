// pages/check.js
const app = getApp()
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
    console.log('check-app',app)
  },
  onReady:function(options){
    console.log('check-openid',app.openid)
  },
  onShareAppMessage: function () {
    
  }
})