//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    logo:'../../images/timg.jpg',
    userInfo: {},
    hasUserInfo: false,
    data: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const self = this
    wx.setNavigationBarTitle({
          title: '首页'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    if (app.globalData.userInfo) {
      wx.setStorage({
        key:"userinfo",
        data:app.globalData.userInfo
      })
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.setStorage({
          key:"userinfo",
          data:res.userInfo
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.setStorage({
            key:"userinfo",
            data:res.userInfo
          })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(options){
    const self = this
     //console.log('app',app.openid)
     setTimeout(function(){
       wx.request({
            url: 'https://www.bidou666.cn/tk/public/wx/user/getUserPacket', 
            data: {
                'openid' : app.openid ? app.openid : wx.getStorageSync('openid'),
            },
            header: {
                'content-type': 'application/json' 
            },
            success: function(res) {
                //console.log('res',res)
                self.setData({
                    data: res.data
                })
            },
            fail:function(res){
            
            }
        })
     },500)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadPage(){
    wx.navigateTo({
      url: '../upload/upload'
    })
  },
  noticePage(){
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  packetPage(){
    wx.navigateTo({
      url: '../packet/packet'
    })
  },
  rankPage(){
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  extractPage(){
    wx.navigateTo({
      url: '../extract/extract'
    })
  },
  commonPage(){
    wx.navigateTo({
      url: '../common/common'
    })
  }
})
