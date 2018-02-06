// pages/check.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    imgData: {},
    options:{}
  },
  onLoad: function (options) {
    const self = this

    self.setData({
        options : options
    })
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
          self.setData({
              userInfo: res.data
          })
      } 
    })
    wx.setNavigationBarTitle({
          title: '红包图片'
    })
     wx.request({
          url: 'https://www.bidou666.cn/tk/public/wx/user/getPackDetail', 
          data: {
              'openid' : options.openid,
              'packet_id' : options.packet_id,
          },
          header: {
              'content-type': 'application/json' 
          },
          success: function(res) {
              self.setData({
                  imgData: res.data
              })
          }
      })
  },

  onReady:function(options){
      console.log('check-openid',app.openid)
  },
  onShareAppMessage: function () {
      
  },
  Index: function() {
      wx.navigateTo({
          url: '../index/index'
      })
  }

})