import './mip-city-selection.less'

let {
  CustomElement,
  util,
  viewer,
  viewport
} = MIP

let rect = util.rect
let CustomStorage = util.customStorage
let Storage = new CustomStorage(0)
Storage.clear()

export default class MipCitySelection extends CustomElement {
  constructor (...args) {
    super(...args)
    this.local = true
    this.async = false
    this.list = []
    this.history = JSON.parse(Storage.get('history')) || []
    this.maxHistory = 3
    this.offsetX = []
    this.cityMap = {}
  }

  scrollToCity (index) {
    this.getOffsetX()
    let finalOffsetX = this.offsetX[index]
    viewport.setScrollTop(finalOffsetX)
  }

  selectCity (city) {
    city = this.cityMap[city]
    this.getOffsetX()

    if (this.history.length === 0) {
      util.css(this.lastedVisitedWrapper, {display: 'block'})
    }

    let isExit = false
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].city === city.city) {
        let newCity = this.history[i]
        this.history.splice(i, 1)
        this.history.unshift(newCity)
        isExit = true
      }
    } if (!isExit) {
      this.history.unshift(city)
      this.history = this.history.slice(0, this.maxHistory)
    }

    this.lastedVisitedList.innerHTML = this.getPList(this.history)
    let history = JSON.stringify(this.history)
    Storage.set('history', history)
    viewer.eventAction.execute('citySelected', this.element, city)
  }

  getOffsetX () {
    let scrollTop = viewport.getScrollTop()
    let offsetX = []
    let currentCitys = [...this.element.querySelectorAll('.mip-city-selection-city')]
    for (let city of currentCitys) {
      offsetX.push(rect.getElementOffset(city).top + scrollTop)
    }
    this.offsetX = offsetX
  }

  getPList (data) {
    let pList = ''
    for (let city of data) {
      pList += `<p data-city=${city.city} class="mip-city-selection-item">${city.city}</p>`
    }
    return pList
  }

  getRecentVisitHtml () {
    return `<div class="mip-city-selection-content lasted-visited-hot ">
              <div class="mip-city-selection-part-letter content-wrapper">
                <div class="mip-city-selection-title">最近访问的城市</div>
                <div class="mip-city-item-list">
                  ${this.getPList(this.history)}
                </div>
              </div>
            </div>`
  }

  getHotCitiesHtml () {
    let dList = ''
    for (let item of this.list) {
      dList += `<div class="mip-city-selection-city mip-city-selection-part-letter city-json-content content-wrapper">
                  <div class="mip-city-selection-title">${item.key}</div>
                  ${this.getPList(item.cities)}
                </div>`
    }
    return `<div class="mip-city-selection-content">
              ${dList}
            </div>`
  }

  getSidebarHtml () {
    let aList = ''
    for (let [index, item] of this.list.entries()) {
      aList += `<div><a data-index=${index} class="mip-city-selection-link">${item.key}</div>`
    }
    return `<div>
              <mip-fixed class="mip-city-selection-sidebar-wrapper" type="right">
                <div class="mip-city-selection-sidebar">
                  ${aList}
                </div>
              </mip-fixed>
            </div>`
  }

  getCityMap () {
    let map = {}
    for (let item of this.list) {
      for (let city of item.cities) {
        map[city.city] = city
      }
    }
    return map
  }

  initialize () {
    let ele = this.element
    let url = ele.getAttribute('data-src') || ''

    let getdata = new Promise((resolve, reject) => {
      let cityData
      if (url) {
        this.local = false
        // 优先远程获取数据，覆盖本地配置数据
        fetch(url, {}).then(res => {
          if (res.ok) {
            res.json().then(data => {
              this.list = data.list
              resolve(data)
            })
          } else {
            reject(new Error('mip-city-selection 组件 Fetch 请求失败!'))
          }
        }).catch(() => {
          reject(new Error('mip-city-selection 组件 Fetch 请求失败!'))
        })
        this.async = true
      } else {
        cityData = ele.querySelector('script[type="application/json"]')
        this.async = false
        try {
          cityData = JSON.parse(cityData.textContent)
          this.list = cityData.list
        } catch (e) {
          reject(new Error('mip-city-selection 组件 json 配置错误, 请检查 json 格式。'))
        }
        resolve(cityData)
        this.local = true
      }
    })
    getdata.then(data => {
      if (!data) {
        console.error('mip-city-selection 需要配置分组选项。可以配置到组件中，也可以配置远程数据。')
      }
    })
    this.cityMap = this.getCityMap()

    let rencentVisit = this.getRecentVisitHtml()
    let hotCites = this.getHotCitiesHtml()
    let sidebar = this.getSidebarHtml()
    let html = `<div class="mip-city-selection-wrapper">
                  ${rencentVisit}
                  ${hotCites}
                  ${sidebar}
                </div>`
    ele.innerHTML = html

    this.lastedVisitedWrapper = this.element.querySelector('.lasted-visited-hot .content-wrapper')
    this.lastedVisitedList = this.lastedVisitedWrapper.querySelector('.mip-city-item-list')
    if (this.history.length === 0) {
      util.css(this.lastedVisitedWrapper, {display: 'none'})
    }

    //  缓存数据
    this.getOffsetX()

    ele.querySelector('.mip-city-selection-wrapper').addEventListener('click', e => {
      e = e || window.event
      let target = e.target || e.srcElement
      if (target.tagName === 'A') {
        this.scrollToCity(target.dataset.index)
      } else if (target.tagName === 'P') {
        this.selectCity(target.dataset.city)
      }
    })
  }

  build () {
    this.initialize()
    viewport.on('scroll', () => {
      this.getOffsetX()
    })
  }
}
