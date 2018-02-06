// pages/add.js
const app = getApp()

Page({
  data: {
    name: '',
    cardNum: '',
    cardId: '1002',
    array:[{
      name: '工商银行',
      id: '1002'
    },{
      name: '农业银行',
      id: '1005'
    },{
      name: '中国银行',
      id: '1026'
    },{
      name: '建设银行',
      id: '1003'
    },{
      name: '招商银行',
      id: '1001'
    },{
      name: '邮储银行',
      id: '1066'
    },{
      name: '交通银行',
      id: '1020'
    },{
      name: '民生银行',
      id: '1006'
    },{
      name: '平安银行',
      id: '1010'
    },{
      name: '浦发银行',
      id: '1004'
    }],
    index: 0
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加银行卡'
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  userNameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  cardNumInput(e){
    this.setData({
      cardNum: e.detail.value
    })
  },
  bindPickerChange(e){
    console.log('change', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
    this.setData({
      cardId: this.data.array[e.detail.value].id
    })
  },
  saveCard(){
    if(this.data.name == ''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(this.data.cardNum == ''){
      wx.showToast({
        title: '请输入需要提现的银行卡号',
        icon: 'none',
        duration: 1000
      })
      return
    }
    console.log(this.data.name,this.data.cardNum,this.data.cardId)

      wx.request({
          url: 'https://www.bidou666.cn/tk/public/wx/user/saveCard', 
          data: {
              'openid' : app.openid,
              'bank_code' : this.data.cardId,
              'enc_bank_no' : this.data.cardNum,
              'enc_true_name' : this.data.name
          },
          header: {
              'content-type': 'application/json' 
          },
          success: function(res) {
             if ( parseInt(res.data.code) >= 1) {
               wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1000,
                  complete: function(){
                     wx.navigateTo({
                      url: '../extract/extract'
                    })
                  }
                })
             }
          }
      })
  }
})