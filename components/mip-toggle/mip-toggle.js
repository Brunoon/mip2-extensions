let {
  CustomElement,
  util
} = MIP

export default class MIPToggle extends CustomElement {
  constructor (...args) {
    super(...args)
    let el = this.element
    this.hideTimeout = this.parseTimeout(el.getAttribute('hidetimeout'))
    this.display = el.getAttribute('display') || 'block'
    this.enterClass = el.getAttribute('enterclass')
  }

  toggle () {
    this.isHidden() ? this.show(Infinity) : this.hide()
  }

  hide () {
    if (this.enterClass) {
      this.element.classList.remove(this.enterClass)
    } else {
      util.css(this.element, {display: 'none'})
    }
  }

  show (timeout) {
    if (timeout === undefined || timeout === '') {
      timeout = this.hideTimeout
    } else {
      timeout = this.parseTimeout(timeout)
    }
    if (this.enterClass) {
      this.element.classList.add(this.enterClass)
    } else {
      util.css(this.element, {display: this.display})
    }
    this.setHideTimeout(timeout)
  }

  setHideTimeout (timeout) {
    if (timeout === Infinity) {
      return
    }
    this.clearHideTimeout()
    this.timeoutId = setTimeout(() => {
      this.hide()
    }, timeout)
  }

  clearHideTimeout () {
    clearTimeout(this.timeoutId)
  }

  isHidden () {
    let el = this.element
    if (this.enterClass) {
      return !el.classList.contains(this.enterClass)
    }
    return el.style.display === 'none' || util.css(el, 'style') === 'none'
  }

  build () {
    if (this.display !== 'block') {
      util.css(this.element, {display: this.display})
    }

    this.addEventAction('toggle', e => {
      this.toggle()
      e && e.preventDefault && e.preventDefault()
    })
    this.addEventAction('show', (e, timeout) => {
      this.show(timeout)
      e && e.preventDefault && e.preventDefault()
    })
    this.addEventAction('hide', e => {
      this.hide()
      e && e.preventDefault && e.preventDefault()
    })
  }

  disconnectedCallback () {
    this.clearHideTimeout()
  }

  parseTimeout (timeout) {
    if (timeout === 'Infinity') {
      return Infinity
    }
    timeout = parseInt(timeout, 10)
    return isNaN(timeout) ? Infinity : timeout
  }
}
