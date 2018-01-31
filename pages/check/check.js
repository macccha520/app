// pages/check.js

const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    console.log(options)     
    console.log("接收到的参数是packet_id="+options.str);  
    const self = this
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
          self.setData({
            userInfo: res.data
          })
      } 
    })
     console.log(wx.getStorageSync("OPEN_ID"))

  },
  onShareAppMessage: function () {
    
  }
})