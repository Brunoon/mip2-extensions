let {
  CustomElement,
  viewer,
  util
} = MIP

export default class MipEventTest extends CustomElement {
  build () {
    let button = document.createElement('button')
    util.css(button, {
      width: '100px',
      height: '100px',
      backgroundColor: '#eee'
    })
    button.addEventListener('click', () => {
      console.log('a execute try')
      viewer.eventAction.execute('try', this.element, 'native')
    })
    this.element.appendChild(button)
  }
}
