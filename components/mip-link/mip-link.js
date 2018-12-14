let {
  CustomElement,
  util
} = MIP

export default class MipLink extends CustomElement {
  isNoCache () {
    let cacheMeta = document.querySelector('meta[property="mip:use_cache"]')
    if (cacheMeta && cacheMeta.getAttribute('content') === 'no') {
      return true
    }
    return false
  }

  firstInviewCallback () {
    let ele = this.element
    ele.setAttribute('pageType', this.isNoCache() ? 2 : 1)

    let tagA = document.createElement('a')
    let href = ele.getAttribute('href') || ''
    tagA.setAttribute('href', href)
    tagA.setAttribute('mip-link', '')

    for (let child of [...ele.childNodes]) {
      tagA.appendChild(child)
    }
    ele.appendChild(tagA)

    util.css(tagA, {
      margin: '0',
      padding: '0',
      width: '100%',
      display: 'block',
      fontSize: '14px',
      color: 'rgb(0, 0, 0)'
    })
  }
}
