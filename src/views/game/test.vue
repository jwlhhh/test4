<template>
  <div class="page">
    <top class="header"></top>
    <div class="wfsjs">
      <video id="video1" @click="videoClick"
        @mousedown="down" @mouseup="up" class="train">
      </video>
      <button @click="clickbtn" v-if="!videoFlag" class="beginGame">> 开始训练 <</button>
    </div>
    <div class="back">
      <back-home class="backHome" @click.native="clickHome" id="back"></back-home>
      <back-last class="backLast" @click.native="clickLast"></back-last>
    </div>

  </div>
</template>
<script>
import Wfs from './wfs.js'

export default {
  data() {
    return {
      gameWidth: 0,
      gameHeight: 0,
      socketUrl: 'ws://192.168.1.137:3000/websocket',
      socket: "",
      offsetTop: 0,
      offsetLeft: 0,
      leftDown: false,
      leftUp: false,
      rightDown: false,
      rightUp: false,
      allDown: false,
      allUp: false,
      downMousePosition: 0,
      upMousePosition: 0,
      videoFlag: false,
      video1: null
    }
  },
  components: {
    top: () => import("../../components/header/top.vue"),
    backHome: () => import("../../components/back/backHome"),
    backLast: () => import("../../components/back/backLast"),
  },
  mounted() {
    this.init();
    this.gameHeight = window.innerHeight * 0.8;
    this.gameWidth = window.innerHeight * 0.6;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        // this.gameWidth = window.innerWidth * 0.8;
        // this.gameHeight = window.innerHeight * 0.6;
        // console.log(window.innerWidth, window.innerHeight);
        //监听浏览器窗口大小改变
        //浏览器变化执行动作
      });
    });

    //右键不弹出菜单
    document.oncontextmenu = function () {
      return false;
    };

    document.onkeydown = (e) => {
      //键盘按键判断
      if(e) {
        let obj = {};
        obj.status = "key";
        obj.keyCode = e.keyCode;
        this.socket.send(JSON.stringify(obj));
        // console.log(obj);
      }
    };

    // document.onmousemove = e => {
    //   let video = document.getElementsByTagName("video")[0];
    //   this.offsetLeft = video.offsetLeft;
    //   this.offsetTop = video.offsetTop;
    //   console.log(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    // };
  },
  methods: {
    test() {
      // this.
    },
    init() {
      // 实例化socket
      this.socket = new WebSocket("ws://192.168.1.137:3000/caozuo");
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      // this.socket.onmessage = this.onmessage;
    },
    open() {
      // this.socket.send("发送数据");
      console.log("连接已打开...");
    },
    error() {
      console.log("error!!!!!");
    },
    onclose() {
      // 关闭 websocket
      console.log("连接已关闭...");
    },
    clickbtn() {
      if (Wfs.isSupported()) {
        // 创建WFS库
        let wfs = new Wfs();
        // 获取元素
        this.video1 = document.getElementById("video1")
        this.videoFlag = true;
        console.log(this.video1)
        console.log(wfs);
        // 关联到通道ch1
        wfs.attachMedia(this.video1, 'ch1');
      }
    },

    videoClick() {
      // this.socket.send("aaa");
      console.log("111")
      // sendMsg("aaa");
    },

    down() {
      let video = document.getElementsByTagName("video")[0];
      this.offsetLeft = video.offsetLeft;
      this.offsetTop = video.offsetTop;
      document.onmousedown = e => {
        let obj = {};
        e.preventDefault();
        if (e.button === 0) {
          this.leftDown = true;
          this.leftUp = false;
          this.allUp = false;
          console.log("鼠标左键按下", e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
          obj.status = "down";
          obj.MouseClickKey = 1;
          obj.mouseX = e.clientX - this.offsetLeft;
          obj.mouseY = e.clientY - this.offsetTop;
          this.socket.send(JSON.stringify(obj));
          document.onmousemove = e => {
            console.log(e.clientX, e.clientY);
          };
        } else if (e.button === 2) {
          this.rightDown = true;
          this.rightUp = false;
          this.allUp = false;
          console.log("鼠标右键按下", e.clientX, e.clientY);
          obj.status = "down";
          obj.MouseClickKey = 2;
          obj.mouseX = e.clientX - this.offsetLeft;
          obj.mouseY = e.clientY - this.offsetTop;
          this.socket.send(JSON.stringify(obj));
          document.onmousemove = e => {
            console.log(e.clientY, e.clientY);
          };
        }
        document.onmousemove = e => {
          let obj = {};
          if (this.leftDown) {
            obj.status = "drag";
            obj.MouseStatus = 1;
            obj.mouseX = e.clientX - this.offsetLeft;
            obj.mouseY = e.clientY - this.offsetTop;
            this.socket.send(JSON.stringify(obj));
          }
          if (this.rightDown) {
            obj.status = "drag";
            obj.MouseStatus = 2;
            obj.mouseX = e.clientX - this.offsetLeft;
            obj.mouseY = e.clientY - this.offsetTop;
            this.socket.send(JSON.stringify(obj));
          }
          if (this.leftDown && this.rightDown) {
            this.allDown = true;
            this.allUp = false;
            obj.status = "drag";
            obj.MouseStatus = 3;
            obj.mouseX = e.clientX - this.offsetLeft;
            obj.mouseY = e.clientY - this.offsetTop;
            this.socket.send(JSON.stringify(obj));
          }
        }
        console.log()
      };
    },
    up() {
      let video = document.getElementsByTagName("video")[0];
      this.offsetLeft = video.offsetLeft;
      this.offsetTop = video.offsetTop;
      let obj = {};
      document.onmouseup = e => {
        if (e.button === 0) {
          this.leftDown = false;
          this.leftUp = true;
          console.log("鼠标左键弹起", e.clientX, e.clientY);

          obj.status = "up";
          obj.MouseClickKey = 3;
          obj.mouseX = e.clientX - this.offsetLeft;
          obj.mouseY = e.clientY - this.offsetTop;
          this.socket.send(JSON.stringify(obj));

          this.allDown = false;
          document.onmousemove = '';
        } else if (e.button === 2) {
          this.rightDown = false;
          this.rightUp = true;
          console.log("鼠标右键弹起", e.clientX, e.clientY);

          obj.status = "up";
          obj.MouseClickKey = 4;
          obj.mouseX = e.clientX - this.offsetLeft;
          obj.mouseY = e.clientY - this.offsetTop;
          this.socket.send(JSON.stringify(obj));

          this.allDown = false;
          document.onmousemove = '';
        }
        if (this.rightUp && this.leftUp) {
          this.allUp = true;
          this.allDown = false;
          // console.log("==============")
        }

        if(this.allUp) {
          // console.log("***********")
        }
      }

    },

    move() {

    },

    clickLast() {
      window.history.go(-1);
    },
    clickHome() {
      this.$router.push("/mainPage");
    }
  },
  beforeDestroy() {
    // socketClose();
    this.onclose(); // 离开路由之后断开websocket连接
    document.onkeydown = '';
    document.oncontextmenu = function() {
      return true;
    };
    document.onmousedown = '';
    document.onmouseup = '';
    document.onmousemove = '';
  }
}
</script>

<style scoped lang="scss">
  .page {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(110, 164, 225, .25);
  }
  .back {
    position: fixed;
    //right: 10px;
    //bottom: 50px;
    left: 2%;
    top:13%;
    .backHome {
      cursor: pointer;
      float: right;
    }
    .backLast {
      cursor: pointer;
      float: right;
      margin-right: 10px;
    }
  }
  .wfsjs {
    width: 90%;
    margin: 0 auto;
    //display: flex;
  }
  .beginGame {
    width: 200px;
    height: 60px;
    background-color: $primaryColor;
    color: white;
    border-radius: 10px;
    font-size: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .train {
    position: absolute;
    width: 98%;
    //height: 85%;
    left: 50%;
    top: 90px;
    transform: translate(-50%);
  }

  @media (max-width: 800px) {
    .header {
      display: none;
    }
    .wfsjs {
      width: 100%;
      margin: 0 auto;
      //display: flex;
    }
    .back {
      position: fixed;
      top: 9%;
      left: 68%;
      transform: rotate(90deg);
    }

    .beginGame {
      //transform: rotate(90deg);
      width: 150px;
      font-size: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    .train {
      height: 120%;
      width: 173%;
      top:-10%;
      left:-37%;
      transform: rotate(90deg);
    }


  }
</style>
