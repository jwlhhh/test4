<template>
  <div class="box">
    <div>ddd</div>
    <div class="player-title">{{ videoName }}<div class="close-btn" @click="closeVideo" />asd</div>
    <div :id="id"></div>
    <button id="btn" @click="btn">播放</button>
<!--    <video>-->
<!--      <source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" type="rtsp">-->
<!--    </video>-->
  </div>
</template>
<script>
import WasmPlayer from './../../../public/EasyWasmPlayer.js'
import uuid from '@/utils/uuid'
export default {
  data() {
    return {
      // url: 'rtsp://192.168.1.135:80/live',
      // url: 'ws://192.168.1.137:3000/websocket',
      url: 'ws://192.168.1.65:3000/play?stream=rtsp://username:password@192.168.1.64:5504/Streaming/Channels/102',
      videoId: '',
      videoName: '12345',
      id: uuid(), // 生成随机id
      player: null,
    }
  },
  mounted() {
    this.inintPlayer()
  },
  methods: {
    closeVideo() { // 通过传进的id关闭播放器窗口
      this.$nextTick(() => {
        this.$emit('closePlayer', this.videoId)
      })
    },
    inintPlayer() {  // 播放器实例化
      this.$nextTick(() => {
        this.player = new WasmPlayer(null, this.id, this.callbackfun, { Height: true, fluent: true, HideKbs: true })
        // console.log(player)
        this.player.play(this.url, 1);
        console.log(this.player.play(this.url,1));
      })
    },
    callbackfun(e) {},
    btn() {
      this.player.play(this.url,1);
      console.log(this.player.play(this.url,1));
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width:1000px;
  height:100%;
  //background-color: #0a0d16;
  position: relative;
  /deep/ .iconqingxiLOGO:before { // 去除logo
    content: '';
  }
  /deep/ .iconfont + div {
    right: 55px;
  }
  .player-title {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    line-height: 25px;
    width: 100%;
    z-index: 10000;
    //background: rgba(0, 0, 0, 0);
    //color: #ffffff;
  }
  .player-box {
    height: 400px;
  }
  .close-btn {
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 2px;
    right: 2px;
    background-image: url("./../../assets/img/3.jpg");
  }
}
</style>