import './mip-sidebar.less'

let {
  CustomElement,
  util
} = MIP

const ANIMATION_TIMEOUT = 400

export default class MipSidebar extends CustomElement {
  constructor (...args) {
    super(...args)
    // 限制side属性是left或者right
    this.side = this.element.getAttribute('side')
    if (this.side !== 'left' && this.side !== 'right') {
      this.side = 'left'
      this.element.setAttribute('side', this.side)
    }

    this.isOpen = false
    this.running = false
    this.bodyOverflow = 'hidden'
    this.content = null
    this.mask = null
  }

  prerenderAllowed () {
    return true
  }

  toggle (e) {
    this.isOpen ? this.close(e) : this.open()
  }

  /**
   * [open 打开 sidebar和 mask]
   */
  open () {
    if (this.isOpen) {
      return
    }
    this.isOpen = true
    util.css(this.element, {display: 'block'})

    setTimeout(() => {
      this.content.classList.add('show')
      this.mask.classList.add('show')
    }, 0)

    setTimeout(() => {
      this.running = true
    }, ANIMATION_TIMEOUT)

    this.bodyOverflow = getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    this.element.setAttribute('aria-hidden', 'false')
  }

  /**
   * [close 关闭 sidebar和 mask]
   *
   * @param {Object} e 点击事件
   */
  close (e) {
    if (!this.running) {
      return
    }
    this.running = false

    this.content.classList.remove('show')
    this.mask.classList.remove('show')

    setTimeout(() => {
      this.isOpen = false
      util.css(this.element, {display: 'none'})
    }, ANIMATION_TIMEOUT)

    document.body.style.overflow = this.bodyOverflow
    this.element.setAttribute('aria-hidden', 'true')
  }

  build () {
    if (!this.isOpen) {
      this.element.setAttribute('aria-hidden', 'true')
    }

    let fixed = document.createElement('mip-fixed')
    fixed.className = 'sidebar'
    fixed.setAttribute('still', '')
    fixed.setAttribute('type', 'top')

    let content = document.createElement('div')
    content.className = 'mip-sidebar-content'
    for (let child of [...this.element.childNodes]) {
      content.appendChild(child)
    }
    fixed.appendChild(content)
    this.content = content

    let mask = document.createElement('div')
    mask.className = 'mip-sidebar-mask'
    fixed.appendChild(mask)
    this.mask = mask

    let wrapper = document.createElement('div')
    wrapper.appendChild(fixed)
    this.element.appendChild(wrapper)

    mask.addEventListener('touchmove', e => {
      e.preventDefault()
    })
    mask.addEventListener('click', e => {
      this.close(e)
    })
    this.addEventAction('toggle', e => {
      this.toggle(e)
    })
    this.addEventAction('open', () => {
      this.open()
    })
    this.addEventAction('close', e => {
      this.close(e)
    })
  }
}
