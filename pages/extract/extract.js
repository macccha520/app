// pages/extract.js

const app = getApp()

Page({
  data: {
  
  },
  money: '',
  onLoad: function (options) {
    const self = this
    wx.setNavigationBarTitle({
          title: '红包提现'
    })
     wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/getUserPacket',
        data: {
          openid: app.openid
        },
        success: function(res) {
           self.setData({
              money: res.data.invite_total
          })  
        }   
    })
  },
  onShareAppMessage: function () {
  
  },
  commonPage(){
    wx.navigateTo({
      url: '../common/common'
    })
  },
  makeCall(){
    wx.makePhoneCall({
      phoneNumber: '15692425977'
    })
  },
  extractCash(){
    wx.showToast({
      title: '暂时还不能提现',
      icon:'none',
      duration: 1000
    })
  },
  indexPage(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  noticePage(){
    wx.navigateTo({
      url: '../notice/notice'
    })
  }
})