import './mip-tabs.less'

let {
  CustomElement,
  util,
  viewer
} = MIP

export default class MipTabs extends CustomElement {
  static get observedAttributes () {
    return ['reset-tab']
  }

  constructor (...args) {
    super(...args)
    this.initialTab = parseInt(this.element.getAttribute('initial-tab')) || 0
    this.resetTab = this.element.getAttribute('reset-tab') === true

    this.labels = []
    this.tabs = []
    this.labelDom = []
    this.lastIndex = this.initialTab
    this.currentIndex = this.initialTab
    this.lineStyle = {}
    this.contentStyle = {}

    this.refs = {}
  }

  attributeChangedCallback (name, pre, cur) {
    this.resetTab = cur
    cur && this.initTab()
  }

  /**
   * tab切换时的动画
   *
   * @param  {number} index  当前tab的下标
   */
  moveTab (index) {
    // 当前标签的rect值
    let currenLabel = this.labelDom[index].querySelector('span')
    let tabRect = util.rect.getElementRect(currenLabel)

    // label 滑动距离
    let firstLabel = this.labelDom[0]
    let firstLabelRect = util.rect.getElementRect(firstLabel)

    // tab line的偏移量
    let offsetX = tabRect.left - firstLabelRect.left
    this.lineStyle = {
      'width': `${tabRect.width}px`,
      'transform': `translate3d(${offsetX}px, 0, 0)`
    }
    util.css(this.refs.line, this.lineStyle)

    // 容器宽度
    let translateX = -util.rect.getElementRect(this.element).width * index
    this.contentStyle = {
      'transform': `translate3d(${translateX}px, 0, 0)`
    }
    util.css(this.refs.contentWrapper, this.contentStyle)
  }

  /**
   * 切换内容
   *
   * @param  {number} index  当前tab的下标
   * @param  {boolean} disabled  是否有disabled属性
   */
  changeTab (index, disabled) {
    // disabled 时直接返回
    if (disabled) {
      return
    }

    this.tabs[this.currentIndex].setAttribute('is-active', false)
    this.currentIndex = index
    this.tabs[index].setAttribute('is-active', true)

    // tab-line 及 tab-item 动画
    this.moveTab(index)

    // 派发事件 透传当前下标
    viewer.eventAction.execute('changeEnd', this.element, index)
  }

  /**
   * 初始化组件
   *
   */
  initTab () {
    let labels = []
    let html = ''

    // 获遍历tab下一级子节点的label
    for (let item of [...this.refs.contentWrapper.children]) {
      // 过滤非<mip-tabs-item/>节点
      if (item.nodeName !== 'MIP-TABS-ITEM') {
        continue
      }

      // 存储tabs & label 节点
      this.tabs.push(item)
      labels.push({
        name: item.getAttribute('label'),
        disabled: item.getAttribute('disabled')
      })
    }
    this.labels = labels

    for (let [index, label] of labels.entries()) {
      html += `
                <div class="mip-tabs-label" ${label.disabled ? 'disabled' : ''} data-index=${index}>
                  <span>${label.name}</span>
                </div>
              `
    }
    // 将items保存到line前面
    this.refs.labelContainer.innerHTML = html
    this.refs.labelContainer.appendChild(this.refs.line)

    // 初始的tab内容显示
    this.tabs[this.initialTab].setAttribute('is-active', true)

    // 缓存label
    this.labelDom = this.refs.labelContainer.querySelectorAll('.mip-tabs-label')

    // 初始化tab-line、tab-item位置
    this.moveTab(this.initialTab)
  }

  getHtml () {
    return `<div class="mip-tabs">
              <div class="mip-tabs-label-wrap">
                <div class="mip-tabs-label-container">
                  <div class="mip-tabs-line">
                  </div>
                </div>
              </div>
              <div class="mip-tabs-content-wrap">
              </div>
            </div>`
  }

  initialize () {
    let ele = this.element
    let html = this.getHtml()

    // change parent
    let childList = []
    for (let child of [...ele.childNodes]) {
      childList.push(child)
    }
    ele.innerHTML = html
    let contentWrapper = ele.querySelector('.mip-tabs-content-wrap')
    for (let child of childList) {
      contentWrapper.appendChild(child)
    }

    let labelWrapper = ele.querySelector('.mip-tabs-label-wrap')
    let labelContainer = ele.querySelector('.mip-tabs-label-container')
    let line = ele.querySelector('.mip-tabs-line')
    this.refs = {
      labelWrapper: labelWrapper,
      labelContainer: labelContainer,
      line: line,
      contentWrapper: contentWrapper
    }

    // 事件委托
    // labelContainer.addEventListener('click', e => {
    //   e = e || window.event
    //   let target = e.target || e.srcElement
    //   // 确保target为对应item的div
    //   if (target.tagName === 'SPAN') {
    //     target = target.parentNode
    //   } else if (target.className === 'mip-tabs-label-container') {
    //     target = target.firstElementChild
    //   }

    //   if (target.dataset.index) {
    //     this.changeTab(target.dataset.index, target.hasAttribute('disabled'))
    //   }
    // })

    let self = this
    util.event.delegate(labelContainer, '.mip-tabs-label', 'click', function () {
      self.changeTab(this.dataset.index, this.hasAttribute('disabled'))
    })

    this.initTab()
  }

  registerEvent () {
    // 外部切换标签
    this.addEventAction('slideTab', (e, index) => {
      this.changeTab(index)
    })
  }

  build () {
    this.initialize()
    this.registerEvent()
  }
}
