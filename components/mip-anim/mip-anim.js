let {
  CustomElement,
  util
} = MIP

export default class MipAnim extends CustomElement {
  constructor (...args) {
    super(...args)
    this.src = this.element.getAttribute('src') || ''
    this.alt = this.element.getAttribute('alt') || ''
  }

  initialize () {
    let container = document.createElement('div')
    let placeholderImg = this.element.querySelector('mip-img')
    // 有默认图情况
    if (placeholderImg) {
      container.appendChild(placeholderImg)
      // 有默认图且有gif图情况  gif加载成功前显示默认图
      if (this.src) {
        promiseIf({ src: this.src, alt: this.alt }).then(imageobj => {
          util.css(placeholderImg, {display: 'none'})
          container.appendChild(imageobj)
        })
      }
    // 只有gif图
    } else {
      promiseIf({ src: this.src, alt: this.alt }).then(imageobj => {
        container.appendChild(imageobj)
      })
    }
    this.element.appendChild(container)

    // 判断图片是否加载成功
    function promiseIf (data) {
      return new Promise((resolve, reject) => {
        let images = document.createElement('img')
        images.src = data.src
        images.alt = data.alt
        images.onload = () => {
          resolve(images)
        }
      })
    }
  }

  firstInviewCallback () {
    this.initialize()
  }
}
