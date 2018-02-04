// pages/upload.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    focus: false,
    textList:['春风得意马蹄急，愿你幸福又如意','海上明月共潮生，愿你加薪把职升',
    '年年圆满如意，月月事事顺心','事业有成，朋友有情，人生有福!','春风送福，吉星高照',
    '喜气临门，财源广进','爱圆情圆，花好月圆','万象来更新，招财又进宝','茶，用情感去品，越品越浓',
    '事业如日中天，恋人亲密无间'
    ],
    text: '春风得意马蹄急，愿你幸福又如意',
    imageUrl: '',
    isUpload: false
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
    wx.setNavigationBarTitle({
          title: '上传图片'
    })
  },
  onShow:function(options){
    
  },
  onShareAppMessage: function (res) {
     return {
       title: '我刚上传了一张照片,看看是啥',
       path: 'pages/check/check?packet_id='+ wx.getStorageSync('packet_id')+'&order_id='+ wx.getStorageSync('order_id')+ '&openid='+app.openid,
       imageUrl : wx.getStorageSync('imgurl'),
       success: function(res) {
         console.log('onShare-success',JSON.stringify(res))
       },
       fail: function(res) {
         console.log('error',JSON.stringify(res))
       }
     }
  },
  uploadImg(){
    const self = this
    wx.chooseImage({
      count: 1,                             // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],      // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        self.setData({
          imageUrl: tempFilePaths[0]
        })
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        wx.uploadFile({
            url: 'https://bidou666.cn/tk/public/wx/user/uploadUserImgs',
            filePath: tempFilePaths[0],
            name: 'image',
            formData:{
              'openid' :   wx.getStorageSync('openid'),
              'text' :    wx.getStorageSync('text') ? wx.getStorageSync('text') : '春风得意马蹄急，愿你幸福又如意'
            },
            success: function(res){
              wx.hideLoading()
              var data  = JSON.parse(res.data)
              //返回的红包id
              wx.setStorageSync('packet_id',data.packet_id)
              //返回图片url
              wx.setStorageSync('imgurl',data.imgurl)
              //订单id
              wx.setStorageSync('order_id',data.order_id)
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 500
              })
              self.setData({
                isUpload: true
              })
            },
            fail: function(err){
              console.log('err',err)
              wx.hideLoading()
              wx.showToast({
                title: '图片上传失败,请重新上传',
                icon: 'success',
                duration: 500
              })
            }
        })
      }
    })
  },
  bindButtonTap: function() {
     this.setData({
       focus: true
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
  packetPage(){
    wx.navigateTo({
      url: '../packet/packet'
    })
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
  getText(){
    let num = Math.random()*10
    num = Math.ceil(num)
    wx.setStorageSync('text',this.data.textList[num])
    this.setData({
      text: this.data.textList[num]
    })
  }
})