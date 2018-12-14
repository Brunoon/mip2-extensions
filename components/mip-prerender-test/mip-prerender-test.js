let {
  CustomElement,
  util
} = MIP

export default class MipPrerenderTest extends CustomElement {
  constructor (...args) {
    super(...args)
    console.log('constructor')
  }

  build (para) {
    console.log('para:', para)
    let container = document.createElement('div')
    util.css(container, {
      height: '500px',
      width: '500px',
      backgroundColor: '#000000'
    })
    this.element.appendChild(container)

    window.addEventListener('load', () => {
      console.log('receive load event!')
    })

    window.addEventListener('DOMContentLoaded', () => {
      console.log('receive DOMContentLoaded event!')
    })
  }
}
