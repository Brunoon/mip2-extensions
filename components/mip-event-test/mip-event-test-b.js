let {
  CustomElement,
  util
} = MIP

export default class MipEventTestB extends CustomElement {
  build () {
    this.addEventAction('addTip', (event, str) => {
      let tip = document.createElement('div')
      util.css(tip, {
        width: '50px',
        height: '50px',
        backgroundColor: '#aaa'
      })
      this.element.appendChild(tip)
      console.log('b add tip')
      console.log(str)
    })
  }
}
