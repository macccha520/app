//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if( res.code ) {
          const self = this
          this.code = res.code
          console.log('code',this.code)
          wx.request({
            url: 'https://bidou666.cn/tk/public/wx/user/getUserInfo',
            data: {
              code: res.code
            },
            success: function(res) {
                console.log('login-openid',res.data.openid)
                self.openid = res.data.openid
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
          wx.getUserInfo({
            success: res => {
               wx.request({
                  url: 'https://bidou666.cn/tk/public/wx/user/getUserInfodetail',
                  data: {
                    userdata: res
                  }
              })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
           wx.authorize({
                scope: 'scope.userInfo',
                success() {
                    wx.getUserInfo({
                      success: res => {
                         wx.request({
                            url: 'https://bidou666.cn/tk/public/wx/user/getUserInfodetail',
                            data: {
                              userdata: res
                            }
                         })
                        this.globalData.userInfo = res.userInfo
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      }
                    })
                }
           })
        }
      }
    })
    wx.setEnableDebug({                     //打开调试开关
        enableDebug: true
    })
  },
  globalData: {
    userInfo: null
  },
  code: '',
  openid: ''
})