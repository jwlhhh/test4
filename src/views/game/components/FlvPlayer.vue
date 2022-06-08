<template>
  <div>
    <video
      id="flvPlayer"
      style="height:80%;width:80%;"
      controls
      autoplay>
    </video>
<!--controls
-->
  </div>
</template>

<script>
// 工具
import flvjs from 'flv.js'

export default {
  name: 'flvjs', // 不能使用 video 命名
  props: {
    src: {
      type: String,
      default: 'http://10.202.5.9:8090/live?app=live&stream=xiwan_1'
    }
  },
  data () {
    return {
      flvPlayer: null
    }
  },
  mounted () {
    this.playFlvPlayer()
  },
  watch: {
    src: {
      handler () {
        this.playFlvPlayer()
      }
    }
  },
  methods: {
    playFlvPlayer () { // 切换的时候，需要先销毁再重新创建
      const videoSrc = this.src
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('flvPlayer')
        if (this.flvPlayer) {
          this.flvPlayer.unload()
          this.flvPlayer.detachMediaElement()
          this.flvPlayer.destroy()
          this.flvPlayer = null
        }
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          // url: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TLaf2cc9d469939803949187b46da16c45.flv'
          url: videoSrc
        })
        this.flvPlayer.attachMediaElement(videoElement)
        this.flvPlayer.load()
        this.flvPlayer.play()
      }
    }
  }
}
</script>

<style></style>
