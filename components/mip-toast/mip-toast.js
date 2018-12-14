import './mip-toast.less'

let {
  CustomElement,
  util
} = MIP

const ANIMATION_TIMEOUT = 400

export default class MipToast extends CustomElement {
  constructor (...args) {
    super(...args)
    let ele = this.element
    this.infoIconSrc = ele.getAttribute('info-icon-src') || ''
    this.infoText = ele.getAttribute('info-text') || ''
    this.autoClose = !(ele.getAttribute('auto-close') === 'false')
    this.closeTime = parseInt(ele.getAttribute('close-time')) || 2500
    this.station = ele.getAttribute('station') || ''

    this.showTime = 2500
    if (!!this.closeTime && this.closeTime !== 2500) {
      this.showTime = this.closeTime * 1000
    }
    this.isOpen = false
    this.canClose = false
    this.pTag = null
    this.mipFixed = null
    this.wrapper = null
  }

  show (info) {
    if (this.isOpen) {
      return
    }
    this.isOpen = true

    this.wrapper.classList.add('show')
    util.css(this.mipFixed, {display: 'block'})
    if (typeof info === 'string') {
      this.pTag.innerHTML = info
    } else {
      this.pTag.innerHTML = this.infoText
    }

    // 如果组件是自动关闭的，不能通过hide关闭
    if (this.autoClose) {
      setTimeout(() => {
        this.wrapper.classList.remove('show')
        setTimeout(() => {
          util.css(this.mipFixed, {display: 'none'})
          this.isOpen = false
        }, ANIMATION_TIMEOUT)
      }, this.showTime)
    } else {
      setTimeout(() => {
        this.canClose = true
      }, this.ANIMATION_TIMEOUT)
    }
  }

  hide () {
    if (!this.canClose) {
      return
    }
    this.canClose = false
    this.wrapper.classList.remove('show')
    setTimeout(() => {
      util.css(this.mipFixed, {display: 'none'})
      this.isOpen = false
    }, ANIMATION_TIMEOUT)
  }

  build () {
    let content = `
                    <div class="wrapper">
                      <mip-fixed type="top" class=${this.station}>
                        <div class=${this.infoIconSrc ? 'limitWidth' : ''}>
                          <div class="toast">
                            ${this.infoIconSrc ? `<img class="icon" src=${this.infoIconSrc}>` : ''}
                            <p class=${this.infoIconSrc ? 'block' : ''}>${this.infoText}</p>
                          </div>
                        </div>
                      </mip-fixed>
                    </div>
                  `
    this.element.innerHTML = content

    this.pTag = this.element.querySelector('p')
    this.mipFixed = this.element.querySelector('mip-fixed')
    this.wrapper = this.element.querySelector('.wrapper')
    util.css(this.mipFixed, {display: 'none'})

    this.addEventAction('show', info => {
      this.show(info)
    })
    this.addEventAction('hidden', () => {
      this.hide()
    })
  }
}
