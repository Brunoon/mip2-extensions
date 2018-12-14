let {
  CustomElement,
  util
} = MIP

export default class MipMathml extends CustomElement {
  constructor (...args) {
    super(...args)
    this.formula = this.element.getAttribute('formula') || ''
    this.inline = this.element.getAttribute('inline') === ''
    this.mathjaxConfig = this.element.getAttribute('mathjax-config') || 'TeX-MML-AM_CHTML'

    this.MATHJAX_CDN = `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=${this.mathjaxConfig}`
    this.iframeID = `${Date.now()}_${Math.ceil(Math.random() * 100000)}`
    this.height = 0
    this.width = 'auto'
    this.wrapper = null
  }

  getIframeBody () {
    /* eslint-disable no-useless-escape */
    return `
              <script type="text/javascript" src="${this.MATHJAX_CDN}"></script>
              <div>${this.formula}</div>
              <script>
              MathJax.Hub.Queue(function() {
                var rendered = document.getElementById('MathJax-Element-1-Frame')
                var display = document.getElementsByClassName('MJXc-display')
                // 移除 mathjax 和 body 的默认边距
                if (display[0]) {
                  document.body.setAttribute('style','margin:0')
                  display[0].setAttribute('style','margin-top:0;margin-bottom:0')
                  window.parent.postMessage({
                    iframeID: '${this.iframeID}',
                    width: rendered.offsetWidth,
                    height: rendered.offsetHeight
                  }, '*')
                }
              })
              </script>
           `
  }

  build () {
    window.addEventListener('message', this.messageHandler.bind(this))

    if (this.inline) {
      // 如果是内敛要设置父级原生为 inline-block
      util.css(this.element, {
        display: 'inline-block',
        verticalAlign: 'middle'
      })
    }

    let wrapper = document.createElement('div')
    util.css(wrapper, {
      width: this.width,
      height: this.height,
      margin: '0 auto',
      textAlign: 'center'
    })
    this.wrapper = wrapper
    this.element.appendChild(wrapper)

    let iframeBody = this.getIframeBody()
    if (iframeBody) {
      let iframe = document.createElement('iframe')
      iframe.setAttribute('srcdoc', iframeBody)
      iframe.setAttribute('frameborder', 0)
      iframe.setAttribute('scrolling', 'no')
      util.css(iframe, {
        display: 'block',
        width: 0,
        height: 0,
        maxHeight: '100%',
        minHeight: '100%',
        maxWidth: '100%',
        minWidth: '100%'
      })
      wrapper.appendChild(iframe)
    }
  }

  disconnectedCallback () {
    window.removeEventListener('message', this.messageHandler.bind(this))
  }

  messageHandler (event) {
    if (event.origin === location.origin && event.data && this.iframeID === event.data.iframeID) {
      const {width, height} = event.data

      this.height = `${height}px`

      if (this.inline) {
        this.width = `${width}px`
      }
    }
    util.css(this.wrapper, {
      height: this.height,
      width: this.width
    })
  }
}
