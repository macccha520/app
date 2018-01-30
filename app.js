//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if( res.code ) {
          this.code = res.code
          //console.log('res-code',res)
          wx.request({
            url: 'https://www.bidou666.cn/tk/public/wx/user/getUserInfo',
            data: {
                code: res.code
            },
            success: function(response) {

              console.log(response.data.session_key)

              wx.getUserInfo({
                  success: res => {
                    console.log(res);
                     wx.request({
                        url: 'https://www.bidou666.cn/tk/public/wx/user/getUserInfodetail',
                        data: {
                          encryptedData: res.encryptedData,
                          iv: res.iv,
                          session_key: response.data.session_key
                        },
                        success: function(resn){
                            console.log(resn)
                        },
                        fail: function(resn) {

                        }
                    });
                    
                    // this.globalData.userInfo = res.userInfoReadyCallback

                    // if (this.userInfoReadyCallback) {
                    //   this.userInfoReadyCallback(res)
                    // }
                  }
                })
            }
          })

        } else {
            console.log('获取用户登录态失败！' + res.errMsg)
        }
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {

          //     console.log(res);
            
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfoReadyCallback

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  code: ''
})