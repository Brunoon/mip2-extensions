import utilFn from './util'

let {
  CustomElement,
  util,
  viewer
} = MIP

export default class MipInServiceLogin extends CustomElement {
  constructor (...args) {
    super(...args)
    // this.config = this.jsonParse(this.element.querySelector('script[type="application/json"]').textContent)
    this.config = {}
    this.userInfo = null
    this.sessionId = null
    this.isLogin = false
    this.doAutoQuery = true
  }

  jsonParse (json) {
    try {
      return util.jsonParse(json)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  error (text) {
    console.error('[mip-inservice-login] ', text, this)
  }

  checkConfig () {
    let config = this.config
    let hasError = false
    let code = 0

    if (!config.clientId) {
      code = 1
      this.error('组件必选属性 clientId 为空')
      hasError = true
    }
    if (!config.endpoint) {
      code = 2
      this.error('组件必选属性 endpoint 为空')
      hasError = true
    } else if (!/^(https:)?\/\//.test(config.endpoint)) {
      code = 3
      this.error('组件必选属性 endpoint 必须以 https:// 或者 // 开头')
      hasError = true
    }

    // 如果有 mip-bind 则必须有组件id -- 之后补充
    if (typeof MIP.setData === 'function' && !config.id) {
      code = 4
      this.error('和 mip-bind 配合使用必须设置登录组件 id')
      hasError = true
    }

    if (hasError) {
      utilFn.log({
        action: 'login_init_error',
        ext: { code },
        xzhid: this.config.appid
      })
      throw new TypeError('[mip-inservice-login] 组件参数检查失败')
    }
  }

  connectedCallback () {
    this.checkConfig()
    utilFn.store.remove(this.config.endpoint + '_login_handle')
  }

  prerenderAllowed () {
    return true
  }

  updateLogin (data) {
    let key = this.config.endpoint + '_login_handle'

    // 先从store里取状态，看当前是否存在已经在查询状态的实例
    let logProcess = utilFn.store.get(key)
    let { code, origin, callbackurl } = data

    // 如果没有，开启一次状态更新
    if (!logProcess) {
      utilFn.store.set(key, 'pending')
      return this.getUserInfo({
        code,
        origin,
        callbackurl: callbackurl || (utilFn.getSourceFormatUrl())
      }).then(() => {
        // 广播事件，通知数据更新结束
        viewer.page.broadcastCustomEvent({
          name: 'inservice-auth-data-updated',
          data: {
            data: {
              isLogin: this.isLogin,
              userInfo: this.userInfo,
              sessionId: this.sessionId
            },
            origin
          }
        })
        utilFn.store.set(key, 'finish')
      }).catch(err => {
        throw err
      })
    }
  }

  login (redirectUri, origin = '', replace = false) {
    utilFn.log({
      action: 'invoke_login',
      ext: { isLogin: this.isLogin ? 1 : 0 },
      xzhid: this.config.appid
    })

    // 当前页面的url
    let url = redirectUri || this.config.redirectUri

    if (this.isLogin) {
      return
    }
    // 用来oauth的url
    let sourceUrl
    // 当前页面的hash值
    let hash
    // 是否返回原页面
    let back = false

    // 校验url的合法性
    if (url) {
      sourceUrl = utilFn.getSourceUrl(url)
      // 分析url，获取需要的参数
      let obj = utilFn.getFormatUrl(url)
      url = obj.url
      hash = obj.hash
    } else {
      url = utilFn.getSourceFormatUrl()
      hash = location.hash
      sourceUrl = utilFn.getSourceUrl()
      back = true
    }

    let self = this

    window.cambrian && window.cambrian.authorize({
      data: {
        redirect_uri: sourceUrl,
        scope: 1,
        pass_no_login: 0,
        state: JSON.stringify({
          url,
          back,
          origin,
          h: encodeURIComponent(hash),
          r: Date.now()
        }),
        ifSilent: false,
        client_id: self.config.clientId
      },
      success (data) {
        // 弹窗情况会进入该回调
        self.doAutoQuery = false
        // 是返回原页面，就进行事件通知
        self.updateLogin({
          code: data.result.code,
          callbackurl: url,
          origin
        }).then(() => {
          if (!back) {
            viewer.open(
              utilFn.getRedirectUrl(url, data.result, hash),
              { isMipLink: true, replace }
            )
          }
        }).catch(err => {
          throw err
        })
      },
      fail (data) {
        console.error(data.msg)
      },
      complete (data) {
        // 单词拼错，待依赖的文件升级再修改
        if (data.msg === 'oauth:cancel' && self.config.autologin) {
          // TODO,抛出事件，让业务方自己处理
          viewer.eventAction.execute('autoLoginCancel', self.element)
        }
      }
    })
  }

  getUserInfo (options = {}) {
    let data = {
      type: 'check'
    }

    let { code, callbackurl, origin } = options

    if (!code) {
      code = utilFn.getQuery('code')

      if (code) {
        try {
          callbackurl = JSON.parse(utilFn.getQuery('state')).url
        } catch (e) {
          throw new Error('JSON parse解析出错')
        }
      }
    }

    if (code && callbackurl) {
      data.code = code
      // 处理为originurl
      data.redirect_uri = utilFn.getSourceUrl(callbackurl)
      data.type = 'login'
    }

    let self = this
    return utilFn.post(self.config.endpoint, data).then(res => {
      // 记录 sessionId 到 ls 中，修复在 iOS 高版本下跨域 CORS 透传 cookie 失效问题
      if (res.sessionId) {
        self.sessionId = res.sessionId
        utilFn.store.set(self.config.endpoint, res.sessionId)
      }

      if (data.type === 'login') {
        if (res.status === 0 && utilFn.fn.isPlainObject(res.data)) {
          utilFn.log({
            action: 'login_success',
            xzhid: self.config.appid
          })
          self.loginHandle('login', true, res.data, origin)
        } else {
          utilFn.log({
            action: 'login_error',
            ext: { code: res.status },
            xzhid: self.config.appid
          })
          throw new Error('登录失败', res)
        }
      } else if (res.status === 0 && res.data) {
        utilFn.log({
          action: 'login_check_success',
          xzhid: self.config.appid
        })
        self.loginHandle('login', true, res.data, origin)
      }

      // 设置数据
      self.setData()
    }).catch(err => {
      if (data.type === 'login') {
        this.loginHandle('error', false)
        throw err
      }
    })
  }

  trigger (name, origin = '') {
    let event = {
      userInfo: this.userInfo,
      sessionId: this.sessionId,
      origin
    }
    viewer.eventAction.execute(name, this.element, event)
  }

  loginHandle (name, isLogin, data, origin) {
    this.isLogin = isLogin
    this.userInfo = data || null
    this.trigger(name, origin)
  }

  setData () {
    if (typeof MIP.setData !== 'function') {
      return
    }
    let id = (this.config.isGlobal ? '#' : '') + this.config.id

    // 设置源数据
    let data = {}

    data[id] = {
      isLogin: this.isLogin
    }

    // fix 因为直接使用 null 时 mip-bind 报错
    if (this.userInfo) {
      data[id].userInfo = this.userInfo
    }
    if (this.sessionId) {
      data[id].sessionId = this.sessionId
    }

    MIP.setData(data)
  }

  logout () {
    let self = this

    utilFn.log({
      action: 'invoke_logout',
      xzhid: self.config.appid
    })

    if (!self.isLogin) {
      return
    }

    utilFn.post(self.config.endpoint, {
      type: 'logout'
    }).then(function (res) {
      // 清空 sessionId
      utilFn.store.remove(self.config.endpoint)
      // 清空登录update
      utilFn.store.remove(self.config.endpoint + '_login_handle')
      if (res.data && res.data.url) {
        viewer.open(res.data.url, { isMipLink: true })
      } else {
        // 是否，需要补充多一点信息
        self.loginHandle('logout', false)
        // 设置数据
        self.setData()
      }
    }).catch(function (data) {
      // 清空 sessionId
      utilFn.store.remove(self.config.endpoint)
      // 清空登录update
      utilFn.store.remove(self.config.endpoint + '_login_handle')

      self.loginHandle('logout', false)
    })
  }

  bindEvents () {
    this.addEventAction('login', (e, str = '') => {
      let args = str.split(',')
      this.login(...args)
    })

    this.addEventAction('logout', () => {
      this.logout()
    })

    window.addEventListener('show-page', e => {
      // 如果不在进行登录状态的更新中
      if (this.doAutoQuery) {
        // 页面返回重新触发一遍查询
        this.getUserInfo().then(() => {
          if (this.config.autologin && !this.isLogin) {
            // TODO,抛出事件，让业务方自己处理
            viewer.eventAction.execute('autoLoginCancel', this.element)
          }
        })
      }
    })

    window.addEventListener('inservice-auth-logined', e => {
      // 标示在进行登录数据的更新
      this.doAutoQuery = false
      // 开始进行数据更新
      this.updateLogin(e.detail[0])
    })

    window.addEventListener('inservice-auth-data-updated', e => {
      let res = e.detail[0]
      // 没设置过就执行
      if (this.sessionId !== res.data.sessionId) {
        // 标示在进行登录数据的更新
        this.doAutoQuery = false
        this.loginHandle('login', true, res.data.userInfo, res.origin)
        // 更新数据哦
        this.setData()
      }
    })

    let self = this

    window.cambrian.init({
      data: { simpleInit: true },
      success () {
        window.cambrian.addListener('xzh-open-log', e => {
          utilFn.log({
            action: e.action,
            ext: e.ext,
            xzhid: self.config.appid
          })
        })
      }
    })
  }

  build () {
    let url = 'https://xiongzhang.baidu.com/sdk/c.js?appid=' + this.config.appid

    utilFn.loadJS(
      url,
      () => {
        // 如果是自动登录，在检查完用户信息后没有登录时要求立即登录
        if (this.config.autologin) {
          return this.getUserInfo().then(() => {
            if (!this.isLogin) {
              this.login()
              this.bindEvents()
            }
          })
        }
        this.getUserInfo()
        this.bindEvents()
      },
      () => {
        throw new Error('加载资源出错')
      }
    )
  }
}
