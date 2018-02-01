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
            url: 'https://www.bidou666.cn/tk/public/wx/user/getUserInfo',
            data: {
              code: res.code
            },
            success: function(res) {
                console.log('login-openid',res.data.openid)
                wx.setStorageSync('openid', res.data.openid)
                self.openid = res.data.openid
                wx.setStorageSync('sessionKey', res.data.session_key)
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
                  url: 'https://www.bidou666.cn/tk/public/wx/user/getUserInfodetail',
                  data: {
                    userdata: res,
                    session_key:  wx.getStorageSync('sessionKey')
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
                            url: 'https://www.bidou666.cn/tk/public/wx/user/getUserInfodetail',
                            data: {
                              userdata: res,
                              session_key:  wx.getStorageSync('sessionKey')
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
  openid: '',
  sessionKey: ''
})



/*
  每个微信小程序都可以有自己的本地缓存，
  可以通过 wx.setStorage（wx.setStorageSync）、
  wx.getStorage（wx.getStorageSync）、
  wx.clearStorage（wx.clearStorageSync）
  可以对本地缓存进行设置、获取和清理。同一个微信用户，
  同一个小程序 storage 上限为 10MB。
  localStorage 以用户维度隔离，同一台设备上，A 用户无法读取到 B 用户的数据。
*/