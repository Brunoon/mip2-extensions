import mark from 'mip-sandbox/lib/global-mark'
import generate from 'mip-sandbox/lib/generate-lite'
import detect from 'mip-sandbox/lib/unsafe-detect'
/* global mipDataPromises */
/* global Promise */
/* global fetch */

let {
  CustomElement
} = MIP

const SYNC_SIZE = 2
const ASYNC_SIZE = 10

function getSize (script) {
  return script.replace(/[^\x00-\xff]/g, 'aa').length // eslint-disable-line no-control-regex
}

function detectUnsafe (ast) {
  let unsafeList = detect(ast, MIP.sandbox.WHITELIST_STRICT)

  if (unsafeList.length) {
    let tips = unsafeList.map(identify => {
      return `${identify.name}: start[${JSON.stringify(identify.loc.start)}] end[${JSON.stringify(identify.loc.end)}]`
    }).join('\n')

    console.error(`WARNING: Forbidden global variable[s] included in <mip-script>! Variable[s] Listed as below\n\n${tips}`)
  }
}

function execute (ast, element) {
  let generated = generate(ast, MIP.sandbox.WHITELIST_STRICT_RESERVED, {prefix: 'MIP.sandbox.strict'})
  let scriptEle = document.createElement('script')
  scriptEle.innerHTML = generated
  scriptEle.setAttribute('class', 'mip-script')
  document.body.appendChild(scriptEle)
  element.remove()
}

function run (script, element) {
  let ast
  try {
    ast = mark(script)
  } catch (e) {
    console.error('Fail to generate AST of script: ', e)
    return
  }
  detectUnsafe(ast)

  if (/MIP.watch/.test(script) && mipDataPromises && mipDataPromises.length) {
    Promise.all(mipDataPromises).finally(() => execute(ast, element))
  } else {
    execute(ast, element)
  }
}

export default class MipScript extends CustomElement {
  prerenderAllowed () {
    return true
  }

  connectedCallback () {
    let ele = this.element
    let src = ele.getAttribute('src')
    if (src) {
      fetch(src)
        .then(res => {
          if (res.ok) {
            res.text().then(data => {
              if (!data) {
                return
              }
              if (getSize(script) > 1024 * ASYNC_SIZE) {
                console.error(`WARNING: ASYNC <mip-script> is out of range. Src: ${src}. Please keep it under ${ASYNC_SIZE}KB`)
                return
              }
              run(data, ele)
            })
          } else {
            console.error(`Fetch script ${src} failed!`)
          }
        })
        .catch(console.error)
    }

    let script = ele.textContent.trim()

    if (!script) {
      return
    }
    if (getSize(script) > 1024 * SYNC_SIZE) {
      console.error(`WARNING: <mip-script> is out of range.Please keep it under ${SYNC_SIZE}KB`)
      return
    }

    run(script, ele)
  }
}
