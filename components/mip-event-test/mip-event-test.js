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
    button.addEventListener('click', (event) => {
      console.log('a execute try')
      event.value = [1, 2, 3]
      event.tmp = {'a': 1, 'b': 2}
      viewer.eventAction.execute('try', this.element, event)
    })
    this.element.appendChild(button)
  }
}
