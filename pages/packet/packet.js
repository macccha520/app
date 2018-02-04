// pages/packet.js
 const app = getApp()
Page({
  data: {
    src:'',
    username: '',
    data: ''  
  },
  onLoad: function (options) {
    const self = this
    this.setData({
      src: app.globalData.userInfo.avatarUrl,
      username: app.globalData.userInfo.nickName
    })
    wx.setNavigationBarTitle({
          title: '查看红包'
    })

   wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/getUserPacket', 
        data: {
            'openid' : app.openid,
        },
        header: {
            'content-type': 'application/json' 
        },
        success: function(res) {
          
            self.setData({
                data: res.data
            })
        },
        fail:function(res){
        
        }
    })
  },
  onReady: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  extractPage(){
    wx.navigateTo({
      url: '../extract/extract'
    })
  }
})