import './mip-range.less'

let {
  CustomElement,
  util,
  viewer,
  viewport
} = MIP

export default class MipRange extends CustomElement {
  constructor (...args) {
    super(...args)

    this.config = this.jsonParse(this.element.querySelector('script[type="application/json"]').textContent)
    this.width = this.config.width || 'auto'
    this.height = this.config.height || 6
    this.dotSize = this.config.dotSize || 16
    this.min = this.config.min || 0
    this.max = this.config.max || 100
    this.step = this.config.step || 1
    this.disabled = this.config.disabled === true
    this.tipShow = this.config.tipShow || 'always'
    this.direction = this.config.direction || 'horizontal'
    this.clickable = !(this.config.clickable === false)
    this.speed = this.config.speed || 0.2
    this.range = this.config.range || 0
    this.fixRange = this.config.fixRange === true
    this.tipDir = this.config.tipDir || ''
    this.dotStyle = this.config.dotStyle
    this.processStyle = this.config.processStyle
    this.barStyle = this.config.barStyle
    this.tipFormat = this.config.tipFormat || ''
    this.tipExit = this.config.tipExit || 300

    this.isSingle = !Array.isArray(this.range)
    this.isVertical = this.direction === 'vertical'
    this.canMove = false
    this.processDragging = false
    this.processSign = null
    this.size = 0
    this.offset = 0
    this.currentValue = [0, 0]
    this.currentSlider = 0
    this.anotherSlider = 1
    this.hideV = 0
    this.legalDir = ['left', 'right', 'top', 'bottom']
    this.processRect = {}
    this.bodyTop = 0
    this.isInit = false
    this.timer = null

    this.refs = {}
  }

  jsonParse (json) {
    try {
      return util.jsonParse(json)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  prerenderAllowed () {
    return true
  }

  gap () {
    let { min, max, size, step } = this
    return size / ((max - min) / step)
  }

  position () {
    let { currentValue, min, step } = this
    let gapVal = this.gap()
    return [(currentValue[0] - min) / step * gapVal, (currentValue[1] - min) / step * gapVal]
  }

  getTipVal () {
    let { tipFormat, currentValue } = this
    let format = tipFormat ? tipFormat.split('{{tip}}') : ['', '']
    let [prefix, suffix] = format
    return currentValue.map((item) => {
      return prefix + item + suffix
    })
  }

  getStaticData () {
    let sliderBar = this.element.querySelector('.mip-range-container')
    let sliderBarRect = util.rect.getElementRect(sliderBar)
    // slider bar的尺寸和偏移量
    this.size = this.isVertical ? sliderBarRect.height : sliderBarRect.width
    this.offset = this.isVertical ? (sliderBarRect.top + viewport.getScrollTop()) : sliderBarRect.left
  }

  limit () {
    let position = this.position()
    return [[0, position[1]], [position[0], this.size]]
  }

  valueLimit () {
    let { min, max, currentValue } = this
    return [[min, currentValue[1]], [currentValue[0], max]]
  }

  multiple () {
    let decimals = `${this.step}`.split('.')[1]
    return decimals ? Math.pow(10, decimals.length) : 1
  }

  limitValue (ran) {
    let { min, max } = this
    let inRange = r => {
      if (r < min) {
        return min
      } else if (r > max) {
        return max
      }
      return r
    }
    return ran.map(r => inRange(r))
  }

  setValue (ran, speed) {
    this.currentValue = [...this.limitValue(ran)]
    this.refs.wrapper.classList.add('mip-range-state-change')
    this.updateTip()
    this.setPosition(speed)
  }

  setTransitionTime (time) {
    let process = this.refs.process
    let slider = [this.refs.dot0, this.refs.dot1]
    // 控制柄缓动
    for (let item of slider) {
      item.style.transitionDuration = `${time}s`
      item.style.WebkitTransitionDuration = `${time}s`
    }
    // bar缓动
    process.style.transitionDuration = `${time}s`
    process.style.WebkitTransitionDuration = `${time}s`
  }

  setTransform (val, isAnotherSlider) {
    let { isVertical, anotherSlider, currentSlider, dotSize } = this
    let slider = [this.refs.dot0, this.refs.dot1]
    let sliderIndex = isAnotherSlider ? anotherSlider : currentSlider
    let position = this.position()
    this.isInit = true
    // 计算 控制点样式
    let offsetValue = isVertical ? ((dotSize / 2) - val) : (val - (dotSize / 2))
    let translateValue = isVertical ? `translateY(${offsetValue}px)` : `translateX(${offsetValue}px)`
    let dragSlider = slider[sliderIndex]
    dragSlider.style.transform = translateValue
    dragSlider.style.WebkitTransform = translateValue
    // 进度bar样式
    let processSize = `${sliderIndex === 0 ? position[1] - val : val - position[0]}px`
    let processPos = `${sliderIndex === 0 ? val : position[0]}px`
    this.processRect = isVertical ? {
      'height': processSize,
      'bottom': processPos
    } : {
      'width': processSize,
      'left': processPos
    }
    util.css(this.refs.process, this.processRect)
  }

  updateTip () {
    let tipVal = this.getTipVal()
    this.refs.tip0.firstElementChild.innerText = tipVal[0]
    this.refs.tip1.firstElementChild.innerText = tipVal[1]
    this.refs.mergedTip.firstElementChild.innerText = `${tipVal[0]} — ${tipVal[1]}`
  }

  setCurrentValue (val, bool, isAnotherSlider) {
    let { min, max, anotherSlider, currentSlider } = this
    let slider = isAnotherSlider ? anotherSlider : currentSlider
    if (val < min || val > max) return false
    // 更新并设置数值
    this.currentValue.splice(slider, 1, val)
    this.updateTip()
    this.refs.wrapper.classList.add('mip-range-state-change')
    bool || this.setPosition()
  }

  setPosition (paramSpeed) {
    let { canMove, currentSlider } = this
    let position = this.position()
    canMove || this.setTransitionTime(paramSpeed === undefined ? this.speed : paramSpeed)
    this.setTransform(position[0], currentSlider === 1)
    this.setTransform(position[1], currentSlider === 0)
  }

  getValueByIndex (index) {
    let { step, min } = this
    let multipleVal = this.multiple()
    return ((step * multipleVal) * index + (min * multipleVal)) / multipleVal
  }

  resetSlider () {
    this.getStaticData()
    this.setPosition()
  }

  valIncrease (num) {
    let { currentValue } = this
    currentValue = [currentValue[0], currentValue[1] + +num]
    this.setValue(currentValue)
  }

  valReduce (num) {
    let { currentValue } = this
    currentValue = [currentValue[0], currentValue[1] - +num]
    this.setValue(currentValue)
  }

  bindEvents () {
    // 视口变动，及时刷新
    viewport.on('resize', this.resetSlider)
    // iframe下，纵向 slider 高度补偿
    viewport.on('scroll', () => {
      this.bodyTop = util.rect.getElementRect(document.body).top
    })
  }

  registerEvent () {
    // 设置值
    this.addEventAction('setVal', (e, val) => {
      let valCon = JSON.parse(val)
      valCon = valCon.length === 1 ? [0, ...valCon] : valCon
      this.setValue(valCon)
    })
    // 获取值
    this.addEventAction('getVal', () => {
      return this.currentValue
    })
    // 值增加
    this.addEventAction('valIncrease', (e, num) => {
      let numCon = num ? parseInt(num, 10) : this.step
      numCon = isNaN(numCon) ? this.step : numCon
      this.valIncrease(numCon)
    })
    // 值减小
    this.addEventAction('valReduce', (e, num) => {
      let numCon = num ? parseInt(num, 10) : this.step
      numCon = isNaN(numCon) ? this.step : numCon
      this.valReduce(numCon)
    })
  }

  tipDirection () {
    let { isVertical, tipDir, legalDir } = this
    // 方向是否合法 这里用 Array.prototype.find() 方法 会有兼容问题
    let dirIndex = legalDir.indexOf(tipDir)
    let hasDir = dirIndex > -1 ? tipDir : ''
    return hasDir || (isVertical ? 'left' : 'top')
  }

  getHtml () {
    let val = this.getTipVal()
    return `<div class="mip-range mip-range-${this.direction} ${this.disabled ? 'mip-range-disabled' : ''}">
              <div class="mip-range-container">
                <div class="mip-range-tip-${this.tipShow} mip-range-dot">
                  <div class="mip-range-tip-${this.tipDirection()} mip-range-tip-wrap">
                    <span class="mip-range-tip">
                      ${val[0]}
                    </span>
                  </div>
                </div>
                <div class="mip-range-tip-${this.tipShow} mip-range-dot">
                  <div class="mip-range-tip-${this.tipDirection()} mip-range-tip-wrap">
                    <span class="mip-range-tip">
                      ${val[1]}
                    </span>
                  </div>
                </div>
                <div class="mip-range-process ${this.fixRange ? 'mip-range-process-dragable' : ''}">
                  <div class="mip-range-tip-${this.tipDirection()} mip-range-tip-wrap hideV mip-merged-tip">
                    <span class="mip-range-tip">
                      ${val[0]} - ${val[1]}
                    </span>
                  </div>
                </div>
                <input class="mip-range-range" type="range" min=${this.min} max=${this.max} value=${this.getRangeVal()}>
              </div>
            </div>
    `
  }

  wrapStyles () {
    let { isVertical, width, height, dotSize } = this
    return isVertical
      ? {
        height: typeof height === 'number' ? `${height}px` : height,
        padding: `${dotSize / 2}px`
      }
      : {
        width: typeof width === 'number' ? `${width}px` : width,
        padding: `${dotSize / 2}px`
      }
  }

  elemStyles () {
    let { isVertical, width, height } = this
    return isVertical
      ? {
        width: `${width}px`,
        height: '100%'
      }
      : {
        height: `${height}px`
      }
  }

  dotStyles () {
    let { isVertical, dotSize, width, height } = this
    return isVertical
      ? {
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        left: `${(-(dotSize - width) / 2)}px`
      }
      : {
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        top: `${(-(dotSize - height) / 2)}px`
      }
  }

  tipMergedPosition () {
    let { tipDirection, isVertical, dotSize, width, height } = this
    let offset = isVertical ? (width / 2) - 9 : (height / 2) - 9
    return {
      [tipDirection]: `${dotSize / -2 + offset}px`
    }
  }

  setValueOnPos (pos, isDrag) {
    let { currentSlider } = this
    // 可移动的像素范围
    let range = this.limit()[currentSlider]
    // 可显示的数值范围
    let valueRange = this.valueLimit()[currentSlider]
    // 是不是第二个控制柄
    let isSecondSlider = currentSlider === 1
    if (pos >= range[0] && pos <= range[1]) {
      // 范围内
      this.setTransform(pos)
      // 获得当前位置的值并更新
      let v = this.getValueByIndex(Math.round(pos / this.gap()))
      this.setCurrentValue(v, isDrag)
    } else if (pos < range[0]) {
      // 拖出了最小边界
      this.setTransform(range[0])
      this.setCurrentValue(valueRange[0])
      if (isSecondSlider) {
        this.currentSlider = 0
        this.anotherSlider = 1
      }
    } else {
      // 拖出了最大边界
      this.setTransform(range[1])
      this.setCurrentValue(valueRange[1])
      if (!isSecondSlider) {
        this.currentSlider = 1
        this.anotherSlider = 0
      }
    }
  }

  getPos (e) {
    let {isVertical, size, offset, bodyTop} = this
    return isVertical ? (size - (e.pageY + bodyTop - offset)) : (e.clientX - offset)
  }

  wrapClick (e) {
    e.stopPropagation()
    let { disabled, clickable, processDragging, isSingle } = this
    let position = this.position()
    if (disabled || !clickable || processDragging) return false
    // 计算距离起点的距离
    let ev = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    let pos = this.getPos(ev)
    // 距离谁最近
    if (isSingle) {
      this.currentSlider = 1
      this.anotherSlider = 0
    } else {
      this.currentSlider = pos > ((position[1] - position[0]) / 2 + position[0]) ? 1 : 0
      this.anotherSlider = this.currentSlider === 0 ? 1 : 0
    }
    // 控制柄移动
    this.setValueOnPos(pos)
  }

  dragging (e) {
    e.preventDefault()
    let { canMove, processDragging, processSign } = this
    if (!canMove) return false
    let ev = e.targetTouches && e.targetTouches[0] ? e.targetTouches[0] : e
    if (processDragging) {
      // 两个控制柄同时移动
      this.currentSlider = 0
      this.anotherSlider = 1
      this.setValueOnPos(processSign.pos[0] + this.getPos(ev) - processSign.start, true)
      this.currentSlider = 1
      this.anotherSlider = 0
      this.setValueOnPos(processSign.pos[1] + this.getPos(ev) - processSign.start, true)
    } else {
      this.setValueOnPos(this.getPos(ev), true)
    }
    // 检测两个tip是否碰撞
    this.tipHit()
  }

  dragComplete () {
    // 不是有效拖动
    if (!this.canMove) {
      return false
    }
    // 派发drag-end事件 并复位
    viewer.eventAction.execute('dragEnd', this.element, this.currentValue)
    this.canMove = false
    this.refs.wrapper.classList.remove('mip-range-state-drag')
    setTimeout(() => {
      this.processDragging = false
      this.refs.wrapper.classList.remove('mip-range-state-process-drag')
    }, 0)
    this.setPosition()
  }

  dragStart (e, index = 0, isProcess) {
    e.stopPropagation()
    let { canMove, disabled, fixRange, isSingle } = this
    let position = this.position()
    //  控制点无缓动
    canMove || this.setTransitionTime(0)
    if (disabled) return false
    this.currentSlider = index
    // 进度条滑动
    if (isProcess) {
      if (!fixRange || isSingle) {
        return false
      }
      this.processDragging = true
      this.refs.wrapper.classList.add('mip-range-state-process-drag')
      this.refs.wrapper.classList.remove('mip-range-state-drag')
      // 保存当前状态
      this.processSign = {
        pos: position,
        start: this.getPos((e.targetTouches && e.targetTouches[0]) ? e.targetTouches[0] : e)
      }
    }
    this.canMove = true
    if (!this.processDragging) {
      this.refs.wrapper.classList.add('mip-range-state-drag')
    }
    viewer.eventAction.execute('dragStart', this.element, this.currentValue)
  }

  showTip () {
    if (this.hideV === 1) {
      this.refs.tip0.classList.add('hideV')
      this.refs.tip1.classList.add('hideV')
      this.refs.mergedTip.classList.remove('hideV')
    } else {
      this.refs.tip0.classList.remove('hideV')
      this.refs.tip1.classList.remove('hideV')
      this.refs.mergedTip.classList.add('hideV')
    }
  }

  tipHit () {
    let tipRectL = util.rect.getElementRect(this.refs.tip0)
    let tipRectR = util.rect.getElementRect(this.refs.tip1)
    // class延迟去除
    let delayTime = parseInt(this.tipExist, 10)
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.refs.wrapper.classList.remove('mip-range-state-change')
    }, delayTime)
    // 是否碰撞
    let horHit = !this.isVertical && tipRectL.right > tipRectR.left
    let verHit = this.isVertical && tipRectR.top + tipRectR.height > tipRectL.top
    // 碰撞合并
    horHit || verHit ? this.hideV = 1 : this.hideV = 0
    this.showTip()
  }

  getRangeVal () {
    if (!Array.isArray(this.range)) {
      return [0, this.range]
    }
    return this.range
  }

  initialize () {
    let ele = this.element
    let wrapper = ele.firstElementChild
    let sliderBar = ele.querySelector('.mip-range-container')
    let [dot0, dot1] = ele.querySelectorAll('.mip-range-dot')
    let [tip0, tip1] = ele.querySelectorAll('.mip-range-tip-wrap')
    let process = ele.querySelector('.mip-range-process')
    let mergedTip = ele.querySelector('.mip-merged-tip')

    this.refs = {
      wrapper: wrapper,
      sliderBar: sliderBar,
      dot0: dot0,
      dot1: dot1,
      tip0: tip0,
      tip1: tip1,
      process: process,
      mergedTip: mergedTip
    }

    util.css(wrapper, this.wrapStyles())
    util.css(sliderBar, this.elemStyles())
    util.css(sliderBar, this.barStyle)
    util.css([dot0, dot1], this.dotStyles())
    util.css([dot0, dot1], this.dotStyle)
    util.css([tip0, tip1], {transitionDuration: `${this.tipExist}ms`})
    util.css(process, this.processRect)
    util.css(process, this.processStyle)
    util.css(mergedTip, this.tipMergedPosition())
    if (this.isSingle) {
      util.css(dot0, {display: 'none'})
    }

    wrapper.addEventListener('click', this.wrapClick.bind(this))
    wrapper.addEventListener('touchmove', this.dragging.bind(this))
    wrapper.addEventListener('mousemove', this.dragging.bind(this))
    wrapper.addEventListener('touchend', this.dragComplete.bind(this))
    wrapper.addEventListener('mouseup', this.dragComplete.bind(this))
    wrapper.addEventListener('mouseleave', this.dragComplete.bind(this))

    dot0.addEventListener('touchstart', e => { this.dragStart(e, 0) })
    dot0.addEventListener('mousedown', e => { this.dragStart(e, 0) })
    dot0.addEventListener('transitionend', this.tipHit.bind(this))
    dot1.addEventListener('touchstart', e => { this.dragStart(e, 1) })
    dot1.addEventListener('mousedown', e => { this.dragStart(e, 1) })
    dot1.addEventListener('transitionend', this.tipHit.bind(this))

    process.addEventListener('touchstart', e => { this.dragStart(e, 0, true) })
    process.addEventListener('mousedown', e => { this.dragStart(e, 0, true) })

    viewer.eventAction.execute('dragging', ele, this.currentValue)
  }

  build () {
    this.element.innerHTML = this.getHtml()
    this.initialize()
    this.getStaticData()
    this.setValue(this.getRangeVal(), 0)
    this.bindEvents()
    this.registerEvent()
  }
}
