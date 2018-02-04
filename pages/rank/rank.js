// pages/rank.js
const app = getApp()

Page({
  data: {
    src:'',
    userInfo: {},
    rankInfo: {},
    money: ''
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
    this.setData({
      src: app.globalData.userInfo.avatarUrl
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
                rankInfo: res.data.list,
                money: res.data.money
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