import './mip-gototop.less'

let {
  CustomElement,
  viewport
} = MIP
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame

export default class MipGoToTop extends CustomElement {
  constructor (...args) {
    super(...args)
    this.threshold = parseInt(this.element.getAttribute('threshold')) || 200
    this.scrollTop = viewport.getScrollTop()
  }

  /**
   * 需要提前渲染
   */
  prerenderAllowed () {
    return true
  }

  /**
   * 滚动至顶部
   */
  scrollToTop () {
    // 直接降级 不做polyfill
    if (!requestAnimationFrame) {
      return viewport.setScrollTop(0)
    }

    // 每次滚动步长
    let step = Math.max(this.scrollTop / 10, 20)

    let goToTop = () => {
      viewport.setScrollTop(this.scrollTop - step)

      if (this.scrollTop > 0) {
        requestAnimationFrame(goToTop)
      }
    }

    requestAnimationFrame(goToTop)
  }

  build () {
    let tool = document.createElement('div')
    tool.classList.add('mip-gototop')
    tool.addEventListener('click', e => {
      this.scrollToTop()
      e.stopPropagation()
    })
    this.element.appendChild(tool)

    let that = this
    // 实时获取滚动高度
    viewport.on('scroll', () => {
      this.scrollTop = viewport.getScrollTop()
      if (that.scrollTop >= that.threshold) {
        tool.classList.add('mip-gototop-show')
      } else {
        tool.classList.remove('mip-gototop-show')
      }
    })
  }
}
