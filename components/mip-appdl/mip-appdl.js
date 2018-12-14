import './mip-appdl.less'

let {
  CustomElement,
  util
} = MIP

export default class MipAppdl extends CustomElement {
  constructor (...args) {
    super(...args)
    let ele = this.element
    this.src = ele.getAttribute('src') || ''
    this.downbtntext = ele.getAttribute('downbtntext') || ''
    this.downloadUrl = ele.getAttribute(this.getUserAgent() + '-downsrc') || ''
    this.texttip = ele.getAttribute('texttip') || ''
  }

  initialize () {
    let showText = this.getShowText()
    let imageStr = this.src
      ? `
          <div class="mip-appdl-imgbox">
            <img src=${this.src} class="mip-appdl-downimg">
          </div>
        `
      : ''
    let html =
      `
        <div class="mip-appdl-box ${this.src ? '' : 'mip-appdl-pm10'}">
          <div class="mip-appdl-content">
            ${imageStr}
            <div class="mip-appdl-textbox">
              ${showText}
            </div>
            <div class="mip-appdl-downbtn">
              <a target="_blank">${this.downbtntext}</a>
            </div>
            <div class="mip-appdl-closebutton"></div>
          </div>
        </div>
      `

    this.element.innerHTML = html
    this.element.querySelector('.mip-appdl-closebutton').addEventListener('click', () => {
      this.element.parentNode.removeChild(this.element)
    })
    if (this.downloadUrl) {
      let aTag = this.element.querySelector('a')
      aTag.setAttribute('href', this.downloadUrl)
    }
  }

  getShowText () {
    let lines = [this.texttip]
    try {
      // 字符串转数组
      lines = util.jsonParse(this.texttip)
    } catch (e) {
      console.warn('[mip-appdl] texttip 属性格式不正确', e)
    }
    // 限定最大行数两行
    lines = lines.slice(0, 2)
    return lines.map(line => '<p>' + line + '</p>').join('')
  }

  getUserAgent () {
    if (util.platform.isIOS()) {
      return 'ios'
    }
    if (util.platform.isAndroid()) {
      return 'android'
    }
    return 'other'
  }

  build () {
    this.initialize()
  }
}
