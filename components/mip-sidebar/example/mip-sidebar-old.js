import './mip-sidebar.less'

let {
  CustomElement,
  util,
  viewer
} = MIP

const ANIMATION_TIMEOUT = 400

export default class MipSidebar extends CustomElement {
  constructor (...args) {
    super(...args)
    this.side = this.element.getAttribute('side') || 'left'
    this.element.setAttribute('side', this.side)
    this.running = false
    this.maskElement = null
  }

  prerenderAllowed () {
    return true
  }

  isOpen () {
    return this.element.hasAttribute('open')
  }

  openMask () {
    if (!this.maskElement) {
      let mask = document.createElement('div')
      mask.className = 'MIP-SIDEBAR-MASK'
      this.element.parentNode.appendChild(mask)

      mask.addEventListener('touchmove', e => {
        e.preventDefault()
      })
      this.maskElement = mask
    }
    this.maskElement.style.display = 'block'
    this.maskElement.addEventListener('click', e => {
      viewer.eventAction.execute('close', this.maskElement, e)
    })
    this.maskElement.setAttribute('open', '')
    setTimeout(() => {
      this.running = false
    }, ANIMATION_TIMEOUT)
  }

  closeMask () {
    if (this.maskElement) {
      this.maskElement.removeAttribute('open')
      setTimeout(() => {
        util.css(this.maskElement, {display: 'none'})
        this.running = false
      }, ANIMATION_TIMEOUT)
    }
  }

  toggle (e) {
    this.isOpen() ? this.close(e) : this.open()
  }

  open () {
    if (this.isOpen()) {
      return
    }
    util.css(this.element, { display: 'block' })

    this.openMask()

    setTimeout(() => {
      this.running = !this.running
      this.element.setAttribute('open', '')
    }, ANIMATION_TIMEOUT)
    this.bodyOverflow = getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    this.element.setAttribute('aria-hidden', 'false')
  }

  close (e) {
    e.preventDefault()
    this.element.removeAttribute('open')
    this.element.setAttribute('aria-hidden', 'true')

    this.closeMask()

    if (this.running) {
      return
    }
    this.running = true

    setTimeout(() => {
      this.running = !this.running
    }, ANIMATION_TIMEOUT)

    document.body.style.overflow = this.bodyOverflow
    let closeTimer = setTimeout(() => {
      util.css(this.element, { display: 'none' })
      clearTimeout(closeTimer)
    }, ANIMATION_TIMEOUT)
  }

  build () {
    if (!this.isOpen()) {
      this.element.setAttribute('aria-hidden', 'true')
    }

    document.addEventListener('keydown', event => {
      if (event.keyCode === 27) {
        this.close(event)
      }
    }, false)

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
