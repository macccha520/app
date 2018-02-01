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
  //图片
   wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/getPacketBlur', 
        data: {
            'openid' : app.openid,
            'packet_id' : options.packet_id,
            'order_id' : options.order_id
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

  wxPay:function(){
       wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/minipay', //请求支付参数
        data: {
            'openid' : app.openid,
            'order_id' : this.options.order_id,
            'packet_id' : this.options.packet_id
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)   //支付参数
            wx.requestPayment({
               'timeStamp': res.data.timeStamp,
               'nonceStr': res.data.nonceStr,
               'package': res.data.package,
               'signType': res.data.signType,
               'paySign': res.data.paySign,
               'success':function(res){
                  //跳
                  wx.navigateTo({
                      url: '../rank/rank'
                  })
               },
               'fail':function(res){
               }
            })
        }
    })
  }

})