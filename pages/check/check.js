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
          title: '查看图片'
    })
   //图片
   wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/getPacketBlur', 
        data: {
            'send_openid' : options.openid,
            'openid' : app.openid,
            'packet_id' : options.packet_id, 
        },
        header: {
            'content-type': 'application/json' 
        },
        success: function(res) {
            console.log('check-success',res.data)
            self.setData({
                imgData: res.data
            })
            //红包已支付 去详情页
            if( res.data.packet_status == 1){
              wx.hideLoading({
                    title: '可查看详情',
                    icon: 'loading',
                    duration: 1000,
                    complete: function() {
                        wx.navigateTo({
                          url: '../checkdetail/checkdetail?packet_id='  + options.packet_id
                        })
                    }
              })
            }
        },
        fail:function(res){
          cosole.log('check-fail',res)
        }
    })
  },
  onReady:function(options){
      console.log('check-openid',app.openid)
  },
  onShareAppMessage: function () {
      
  },
  noticePage(){
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  commonPage(){
    wx.navigateTo({
      url: '../common/common'
    })
  },
  wxPay:function(){
       const self = this
       wx.request({
        url: 'https://www.bidou666.cn/tk/public/wx/user/minipay', //请求支付参数
        data: {
            'openid' :  app.openid,
            'send_openid' : this.options.openid,
            'order_id' :  this.options.order_id,
            'packet_id' : this.options.packet_id
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
           //支付参数
           console.log('check-pay-success',res)
          if( res.data.code == 1){
              wx.requestPayment({
               'timeStamp':  res.data.timeStamp,
               'nonceStr':  res.data.nonceStr,
               'package':   res.data.package,
               'signType':  res.data.signType,
               'paySign':   res.data.paySign,
               'success':function(res){
                  //跳
                   wx.navigateTo({
                      url: '../checkdetail/checkdetail?packet_id=' + self.options.packet_id
                  })
               },
               'fail':function(res){
                  console.log('payfail',res)
               }
            })
          }
          else {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000
              })
          }  
        }
    })
  }

})