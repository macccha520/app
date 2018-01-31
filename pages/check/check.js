// pages/check.js
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    console.log(options)     
    console.log("接收到的参数是str="+options.str);  
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