import './mip-confirm.less'

let {
  CustomElement,
  util,
  viewer
} = MIP

export default class MipConfirm extends CustomElement {
  constructor (...args) {
    super(...args)
    let ele = this.element
    this.infoText = ele.getAttribute('info-text') || ''
    this.infoTitle = ele.getAttribute('info-title') || ''
    this.pattern = ele.getAttribute('pattern') || 'alert'
  }

  getHtml () {
    return `
              <div class="mip-confirm-mydialog">
                <mip-fixed
                  type="top left bottom right"
                  class="mask"
                >
                </mip-fixed>
                <mip-fixed
                  class="wrapper"
                  type="top"
                >
                  <div class="mip-confirm-toast">
                    <div class="mip-confirm-title">
                      <div>${this.infoTitle}</div>
                    </div>
                    <p class="mip-confirm-content">${this.infoText}</p>
                    <div class="mip-confirm-footer">
                      <button class="mip-confirm-footer-btn mip-confirm-footer-left">
                        取消
                      </button>
                      <button class="mip-confirm-footer-btn mip-confirm-footer-right">
                        确定
                      </button>
                    </div>
                    <div class="mip-confirm-footer">
                      <button class="mip-confirm-footer-btn mip-confirm-footer-bottom">
                        确定
                      </button>
                    </div>
                  </div>
                </mip-fixed>
              </div>
            `
  }

  initialize () {
    let ele = this.element
    let html = this.getHtml()
    ele.innerHTML = html

    let myDialog = ele.firstElementChild
    let [confirm1, confirm2] = ele.querySelectorAll('.mip-confirm-footer')
    let cancelBtn = ele.querySelector('.mip-confirm-footer-left')
    let confirmBtn = ele.querySelector('.mip-confirm-footer-right')
    let oneBtn = ele.querySelector('.mip-confirm-footer-bottom')

    util.css(myDialog, {display: 'none'})
    if (this.pattern === 'confirm') {
      util.css(confirm2, {display: 'none'})
    } else {
      util.css(confirm1, {display: 'none'})
    }

    let cancel = () => {
      viewer.eventAction.execute('ready', ele, false)
      util.css(myDialog, {display: 'none'})
    }

    let isOk = () => {
      viewer.eventAction.execute('ready', ele, true)
      util.css(myDialog, {display: 'none'})
    }

    cancelBtn.addEventListener('click', cancel)
    confirmBtn.addEventListener('click', isOk)
    oneBtn.addEventListener('click', isOk)
  }

  build () {
    this.initialize()

    let myDialog = this.element.querySelector('.mip-confirm-mydialog')
    this.addEventAction('show', str => {
      util.css(myDialog, {display: 'block'})
    })
    this.addEventAction('hidden', str => {
      util.css(myDialog, {display: 'none'})
    })
  }
}
