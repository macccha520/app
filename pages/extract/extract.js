// pages/extract.js

const app = getApp()

Page({
  data: {
    count: ''
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
  userNameInput(e){
    this.setData({
      count: e.detail.value
    })
  },
  extractCash(e){
   const self = this
    wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/is_card',
        data: {
          openid: app.openid
        },
        success: function(res) {
            if(res.data.code == 1){
              console.log( self.data.count)
              console.log( typeof self.data.count)
              if( self.data.count >= 1) {
                   wx.request({
                    url: 'https://www.bidou666.cn/tk/public/wx/user/returnCard', 
                    data: {
                      openid : app.openid,
                      tr_money : self.data.count
                    },
                    header: {
                        'content-type': 'application/json' 
                    },
                    success: function(res) {
                        if( parseInt(res.data.code) ==1){

                            console.log(res.data)
                            //  wx.showToast({
                            //   title: res.data.msg,
                            //   icon: 'none',
                            //   duration: 2000,
                            //   complete: function(){
                            //      wx.navigateTo({
                            //       url: '../index/ibdex'
                            //     })
                            //   }
                            // })
                        }
                    }
                  })
                 }else {
                  wx.showToast({
                    title: '请输入提现金额',
                    icon: 'none',
                    duration: 1000
                  })
                 }
            }else {
               wx.navigateTo({
                  url: '../add/add'
              })
            } 
        }   
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