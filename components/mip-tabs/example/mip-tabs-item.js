let {
  CustomElement,
  util
} = MIP

export default class MipTabsItem extends CustomElement {
  static get observedAttributes () {
    return ['is-active']
  }

  constructor (...args) {
    super(...args)
    this.isActive = this.element.getAttribute('is-active') === 'true'
    this.disabled = this.element.getAttribute('disabled') === 'true'

    this.container = null
  }

  attributeChangedCallback (name, oldVal, newVal) {
    this.isActive = newVal === 'true'
    if (newVal) {
      util.css(this.container, {display: 'block'})
      this.container.classList.add('active')

      let nestTab = this.element.querySelector('mip-tabs')
      nestTab && nestTab.setAttribute('reset-tab', 'true')
    } else {
      util.css(this.container, {display: 'none'})
      this.container.classList.remove('active')
    }
  }

  build () {
    let container = document.createElement('div')
    container.classList.add('mip-tabs-item')
    if (this.isActive) {
      container.classList.add('active')
    } else {
      util.css(container, {display: 'none'})
    }

    for (let item of [...this.element.childNodes]) {
      container.appendChild(item)
    }
    this.element.appendChild(container)
    this.container = container
  }
}
