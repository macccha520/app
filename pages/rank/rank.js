// pages/rank.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    rankInfo: {}
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
   wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/index', 
        data: {
            'openid' : app.openid,
        },
        header: {
            'content-type': 'application/json' 
        },
        success: function(res) {
             self.setData({
                rankInfo: res.data
            })
        }
    })

    wx.setNavigationBarTitle({
          title: '排行榜单'
    })
  },
  onReady: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})