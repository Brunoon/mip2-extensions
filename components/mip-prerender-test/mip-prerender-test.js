let {
  CustomElement,
  util,
  viewer
} = MIP

export default class MipPrerenderTest extends CustomElement {
  constructor (...args) {
    super(...args)
    console.log('constructor')
  }

  build () {
    let container = document.createElement('div')
    util.css(container, {
      height: '500px',
      width: '500px',
      backgroundColor: '#000000'
    })
    this.element.appendChild(container)
    this.container = container

    // util.css(this.element, {position: 'fixed'})
    // let script = document.createElement('script')
    // script.setAttribute('type', 'text/javascript')
    // script.setAttribute('src', 'http://localhost:8080/examples/prerender/example/3p.js')
    // script.async = false // not work
    // document.body.appendChild(script)

    // window.onload = (e) => {
    //   console.log('component receives load event!')
    //   setTimeout(() => {
    //     util.css(container, {
    //       height: '500px',
    //       width: '500px',
    //       backgroundColor: '#00FF00'
    //     })
    //   }, 2000)
    // }

    window.addEventListener('DOMContentLoaded', () => {
      console.log('component receives DOMContentLoaded event!')
      setTimeout(() => {
        util.css(container, {
          height: '500px',
          width: '500px',
          backgroundColor: '#0000FF'
        })
      }, 1000)
    })

    window.addEventListener('load', (e) => {
      console.log('component receives load event! listener')
      setTimeout(() => {
        util.css(container, {
          height: '500px',
          width: '500px',
          backgroundColor: '#00FF00'
        })
      }, 2000)
    })

    console.log('standalone:', MIP.viewer.page.standalone)

    // prerender test
    container.addEventListener('click', () => {
      viewer.page.prerender('http://localhost:8080/examples/prerender/mip-tabs.html').then(resolve => {
        viewer.open('http://localhost:8080/examples/prerender/mip-tabs.html', {
          cacheFirst: true
        })
      })
    })

    // window.addEventListener('test', () => {
    //   console.log('receive test event!')
    // })
    // let evt = document.createEvent('event')
    // evt.initEvent('load', true, true)
    // window.dispatchEvent(evt)
  }

  // firstInviewCallback () {
  //   window.addEventListener('DOMContentLoaded', () => {
  //     console.log('component receives DOMContentLoaded event!')
  //     setTimeout(() => {
  //       util.css(this.container, {
  //         height: '500px',
  //         width: '500px',
  //         backgroundColor: '#0000FF'
  //       })
  //     }, 1000)
  //   })
  //   window.addEventListener('load', () => {
  //     console.log('component receives load event!')
  //     setTimeout(() => {
  //       util.css(this.container, {
  //         height: '500px',
  //         width: '500px',
  //         backgroundColor: '#00FF00'
  //       })
  //     }, 2000)
  //   })
  // }

  firstInviewCallback () {
    console.log('firstInviewCallback!')
  }
}
