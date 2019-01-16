import detector from './video-detector'
import JSMpeg from './jsmpeg'
import './mip-novel-video.less'

let {
  CustomElement,
  util
} = MIP

const customStorage = util.customStorage(0)

const COUNTDOWNINDEX = 10
const PREDATE = 'ad-time'

const isSF = !window.MIP.standalone

export default class MipNovelVideo extends CustomElement {
  constructor (...args) {
    super(...args)
    let ele = this.element
    this.videoid = ele.getAttribute('videoid') || ''
    this.poster = ele.getAttribute('poster') || ''
    this.videourl = ele.getAttribute('videourl') || ''
    this.tsurl = ele.getAttribute('tsurl') || ''
    this.jumpurl = ele.getAttribute('jumpurl') || ''

    this.count = COUNTDOWNINDEX
    this.timer = null
    this.forbidClick = true
    this.played = false
    this.videoPlayer = null
    this.jSMpegPlayer = null
    this.isShouldVideo = false

    this.refs = {}
  }

  initialize () {
    let ele = this.element
    let html =
      `
        <div
          class="video-container show-container">
          <div class="video-mask"></div>
          <div class="content-video">
            <div class="content show-content">
              <div class="content-title">
                <div class="content-tip">观看广告 免费阅读所有章节</div>
                <div class="content-count">
                  <span>${this.count}秒</span>后可跳过
                </div>
                <div class="close-video">关闭</div>
              </div>
              ${this.isOriginalVideo() ? `
              <div class="video">
                <video
                  poster=${this.poster}
                  src=${this.videourl}
                  muted="true"
                  class="video"
                  autoplay
                  webkit-playsinline
                  playsinline
                >
                </video>
              </div>` : `
              <div class="video">
                <div class="video-cover"></div>
                <canvas class="video-canvas"></canvas>
              </div>`}
              <div class="pinpai">
                <div class="pinpai-back"></div>
                <div class="pinpai-title">品牌广告</div>
              </div>
            </div>
          </div>
        </div>
      `

    ele.innerHTML = html

    this.refs = {
      videoCover: ele.querySelector('.video-cover'),
      videoCanvas: ele.querySelector('.video-canvas')
    }

    ele.querySelector('.close-video').addEventListener('click', e => {
      this.closeVideo(e, true)
    })
    if (this.refs.videoCanvas) {
      this.refs.videoCanvas.addEventListener('click', () => {
        this.gotoAdUrl()
      })
    }
  }

  isShow () {
    return this.videourl && this.tsurl && isSF && detector.getMobileSystemVersion() && isShouldVideo
    // return true
  }

  isOriginalVideo () {
    return detector.isRenderVideoElement()
    // return true
  }

  // 过期重新统计videoid
  timeExpired () {
    let myDate = new Date().getDate()
    let preDate = customStorage.get(PREDATE)
    if (preDate == null) {
      customStorage.set(PREDATE, myDate)
      return
    }
    let currentDate = myDate
    if (currentDate !== +preDate) {
      customStorage.rm(this.videoid)
      customStorage.rm(PREDATE)
    }
  }

  initVideoIndex () {
    let videoIndex = customStorage.get(this.videoid)
    if (videoIndex == null) {
      customStorage.set(this.videoid, 1)
    } else {
      videoIndex++
      customStorage.set(this.videoid, videoIndex)
    }
  }

  readContainerNoScroll () {
    document.documentElement.setAttribute('style', 'height: 100% !important; overflow: hidden')
    document.body.setAttribute('style', 'height: 100% !important; overflow: hidden')
  }

  readContainerScroll () {
    document.documentElement.setAttribute('style', '')
    document.body.setAttribute('style', '')
  }

  initVideo () {
    this.videoPlayer = this.element.querySelector('video')
    if (this.videoPlayer) {
      this.videoPlayer.pause()
      this.videoPlayer.addEventListener('ended', () => {
        this.closeVideo()
      })
    }
  }

  closeVideo (e, isClick) {
    e && e.stopPropagation()
    e && e.preventDefault()
    let container = this.element.querySelector('.video-container')
    let content = this.element.querySelector('.content')
    let isClosed = false
    if (this.videoPlayer) {
      this.videoPlayer.pause()
    }
    if (this.jSMpegPlayer) {
      this.jSMpegPlayer.pause()
    }
    if (!isClosed) {
      this.readContainerScroll()
      this.forbidClick = true
      this.played = true
      container.classList.add('close-container')
      let self = this
      setTimeout(() => {
        content.classList.add('close-content')
        /* global _hmt */
        isClick && _hmt && _hmt.push(['_trackEvent', 'close', 'click', this.videoid])
        setTimeout(() => {
          self.element.setAttribute('style', 'display: none !important')
          container.classList.remove('close-container')
          content.classList.remove('close-content')
        }, 200)
      }, 100)
    }
    isClosed = true
  }

  startTimer () {
    if (!this.timer && this.count > 0) {
      let countText = this.element.querySelector('.content-count')
      let closeText = this.element.querySelector('.close-video')
      this.count = COUNTDOWNINDEX
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= COUNTDOWNINDEX) {
          this.count--
          countText.querySelector('span').innerHTML = `${this.count}秒`
        } else {
          clearInterval(this.timer)
          this.timer = null
          util.css(countText, {display: 'none'})
          util.css(closeText, {display: 'block'})
        }
      }, 1000)
    }
  }

  initCanvasVideo () {
    let self = this
    if (this.refs.videoCover) {
      util.css(this.refs.videoCover, {backgroundImage: 'url(' + this.poster + ')'})
      let attributes = {
        class: 'video',
        loop: false,
        audio: false,
        poster: this.poster,
        canvas: this.refs.videoCanvas
      }
      this.jSMpegPlayer = new JSMpeg.Player(this.tsurl, attributes)
      this.jSMpegPlayer.pause()
      this.jSMpegPlayer.on('ended', () => {
        let event = new Event('ended')
        self.element.dispatchEvent(event)
        self.closeVideo()
      })
    }
  }

  noVideoMaskScroll () {
    let videoMask = this.element.querySelector('.video-mask')
    videoMask.addEventListener('touchmove', e => {
      e && e.preventDefault()
      e && e.stopPropagation()
      e && e.stopImmediatePropagation()
      return false
    })
    videoMask.addEventListener('scroll', e => {
      e && e.preventDefault()
      e && e.stopPropagation()
      e && e.stopImmediatePropagation()
      return false
    })
  }

  startPlayer () {
    let self = this
    this.element.setAttribute('style', 'display: block !important')
    let forceClose = setTimeout(() => {
      self.closeVideo()
    }, 15000)
    if (this.videoPlayer && this.isOriginalVideo()) {
      this.videoPlayer.addEventListener('playing', () => {
        self.startTimer()
        clearTimeout(forceClose)
      })
      this.videoPlayer.play()
    }
    if (this.jSMpegPlayer && !this.isOriginalVideo()) {
      this.jSMpegPlayer.on('playing', () => {
        let event = new Event('playing')
        self.element.dispatchEvent(event)
        util.css(self.refs.videoCanvas, {opacity: '1'})
        self.startTimer()
        clearTimeout(forceClose)
      })
      self.jSMpegPlayer.play()
    }
    /* global _hmt */
    _hmt && _hmt.push(['_trackEvent', 'video', 'show', this.videoid])
    this.noVideoMaskScroll()
    setTimeout(() => {
      self.forbidClick = false
    }, 500)
  }

  createVideo () {
    if (this.isOriginalVideo()) {
      this.initVideo()
    } else {
      this.initCanvasVideo()
    }
  }

  openVideo () {
    let self = this
    document.body.addEventListener('touchstart', e => {
      if (!self.forbidClick || self.played) {
        return
      }
      e && e.preventDefault()
      self.startPlayer()
    }, false)
  }

  gotoAdUrl () {
    if (this.forbidClick) return
    if (this.count <= COUNTDOWNINDEX) {
      this.forbidClick = true
      this.played = true
      this.element.setAttribute('style', 'display: none !important')
      window.top.location.href = this.jumpurl
      /* global _hmt */
      _hmt && _hmt.push(['_trackEvent', 'video', 'click', this.videoid])
    }
  }

  build () {
    this.initialize()

    if (!this.videourl || !this.tsurl) {
      return
    }
    this.timeExpired()
    this.initVideoIndex()
    this.isShouldVideo = +customStorage.get(this.videoid) === 2
    if (this.isShow()) {
      this.readContainerNoScroll()
    }
  }

  firstInviewCallback () {
    if (this.isShow()) {
      this.createVideo()
      this.openVideo()
    }
  }
}
