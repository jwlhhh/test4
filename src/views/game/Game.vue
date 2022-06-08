<template>
<!--  <div class="page">-->
<!--    <canvas id="mycanvas" width="1280px" height="720px" @mousedown="down" @mouseup="up"></canvas>-->
<!--  </div>-->
  <div>
<!--    <video class="demo-video" ref="player" muted autoplay ></video>-->
<!--    <broadcast :src=src></broadcast>-->
<!--    <p>jjjjj</p>-->
    <img id="image" style="width: 1200px; height: 720px"/>

  </div>
</template>

<script>
import {getPic} from "../../api/game/game.js"
import flvjs from 'flv.js'

import broadcast from"./components/FlvPlayer"


export default {
  name: "Game",
  components: {
    broadcast
  },
  data() {
    return {
      imgWidth: 0,
      imgHeight: 0,
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
      arr: [],
      imgSrc: "",
      path: "ws://http://192.168.1.137:3000/websocket",
      socket: "",
      // flvPlayer: null
      player: null,
      end: 0,
      start: 0,
    };
  },
  created() {
  },
  mounted() {
    this.init();
    // this.$nextTick(() => {
    //   window.addEventListener('resize', () => {
    //     console.log(window.innerWidth, window.innerHeight);
    //     //监听浏览器窗口大小改变
    //     //浏览器变化执行动作
    //   });
    // });
    document.oncontextmenu = function () {
      return false;
    };
    // document.onkeydown = (e) => {
    //   //键盘按键判断
    //   if(e) {
    //     let obj = {};
    //     obj.status = "key";
    //     obj.keyCode = e.keyCode;
    //     this.socket.send(JSON.stringify(obj));
    //     console.log(obj);
    //   }
    // };
    // document.onmousemove = e => {
    //   // let canvas = document.getElementsByTagName("canvas")[0];
    //   this.offsetLeft = this.$refs.player.offsetLeft;
    //   this.offsetTop = this.$refs.player.offsetTop;
    //   console.log(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    // };


  },
  methods: {
    videoClick() {
      this.player.pause();
    },
    init() {
      // 实例化socket
      this.socket = new WebSocket("ws://192.168.1.137:3000/TestHandler");
      // 监听socket连接
      this.socket.onopen = this.open;
      this.start = new Date();
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息

      this.socket.onmessage = this.onmessage;
    },
    open() {
      // this.socket.send("发送数据");
      console.log("数据发送中...");
    },
    error() {
      console.log("error!!!!!");
    },
    blobToDataURI(blob, callback) {
      const self = this;
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
        self.end = new Date();
        callback(e.target.result);
      }
    },
    onmessage(evt) {
      // var bytes = new Uint8Array(evt.data);
      // var blob = new Blob([bytes], { type: "image/png" });
      // var url = URL.createObjectURL(blob);
      // // url = url.replace('localhost', '192.168.1.110')
      // document.getElementById('image').src = url;
      // console.log(url)


      this.blobToDataURI(evt.data, (url)=>{
        document.getElementById('image').src = url;
        console.log('e-s', this.end, this.start, this.end - this.start)
      })

      // var str12 = arrayBufferToBase64(evt.data);//转换字符串
      // console.log(str12);
      // document.getElementById('image').src = 'data:image/png;base64,'+str12;
      // var outputImg = document.getElementById('image');
      // outputImg.src = 'data:image/png;base64,'+str12;
      // // append it to your page
      // document.body.appendChild(outputImg);
      // console.log(outputImg);
      // function arrayBufferToBase64( buffer ) {
      //   var binary = '';
      //   var bytes = new Uint8Array( buffer );
      //   var len = bytes.byteLength;
      //   console.log('length:', len, bytes)
      //   for (var i = 0; i < len; i++) {
      //     binary += String.fromCharCode( bytes[ i ] );
      //   }
      //   return window.btoa( binary );
      // }


      // console.log(evt,"---------------");
      // if (evt.data instanceof Blob) {
      //   var imgData = evt.data;
      //   var bytes = new Uint8Array(imgData);
      //   var blob = new Blob([bytes], { type: "image/png" });
      //   var url = URL.createObjectURL(blob);
      //   console.log(url)
      //   document.getElementById('image').src = url;
        /*var reader = new FileReader();
        reader.readAsArrayBuffer(blob)
        reader.onload = function(){
          var receive_data = this.result;//这个就是解析出来的数据

          var v2 = new Uint8Array(receive_data, 0);
          //获取对象
          var mycanvas = document.getElementById("mycanvas");
          // 搭建环境
          var cxt = mycanvas.getContext("2d");
          // 创建新的空白图片
          var myImg = cxt.createImageData(1280, 720);
          // 设置像素点的颜色
          for (var i = 0; i < myImg.data.length; i += 4) {
            myImg.data[i + 0] = v2[i + 0];//红
            myImg.data[i + 1] = v2[i + 1];//绿
            myImg.data[i + 2] = v2[i + 2];//蓝
            myImg.data[i + 3] = v2[i + 3] + 256;//不透明度
          }
          //将图像数据放回到画布中
          cxt.putImageData(myImg, 0, 0);
        }*/
      // }
    },
    onclose() {
        // 关闭 websocket
        console.log("连接已关闭...");
      },
    // down() {
    //   this.offsetLeft = this.$refs.player.offsetLeft;
    //   this.offsetTop = this.$refs.player.offsetTop;
    //   document.onmousedown = e => {
    //     let obj = {};
    //     e.preventDefault();
    //     // console.log(e.button,"==========>");
    //     if (e.button === 0) {
    //       this.leftDown = true;
    //       this.leftUp = false;
    //       this.allUp = false;
    //       console.log("鼠标左键按下", e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    //       obj.status = "down";
    //       obj.MouseClickKey = 1;
    //       obj.mouseX = e.clientX - this.offsetLeft;
    //       obj.mouseY = e.clientY - this.offsetTop;
    //       this.socket.send(JSON.stringify(obj));
    //       document.onmousemove = e => {
    //         console.log(e.clientX, e.clientY);
    //       };
    //     } else if (e.button === 2) {
    //       this.rightDown = true;
    //       this.rightUp = false;
    //       this.allUp = false;
    //       console.log("鼠标右键按下", e.clientX, e.clientY);
    //       obj.status = "down";
    //       obj.MouseClickKey = 2;
    //       obj.mouseX = e.clientX - this.offsetLeft;
    //       obj.mouseY = e.clientY - this.offsetTop;
    //       this.socket.send(JSON.stringify(obj));
    //       document.onmousemove = e => {
    //         console.log(e.clientY, e.clientY);
    //       };
    //     }
    //     document.onmousemove = e => {
    //       let obj = {};
    //       if (this.leftDown) {
    //         obj.status = "drag";
    //         obj.MouseStatus = 1;
    //         obj.mouseX = e.clientX - this.offsetLeft;
    //         obj.mouseY = e.clientY - this.offsetTop;
    //         this.socket.send(JSON.stringify(obj));
    //       }
    //       if (this.rightDown) {
    //         obj.status = "drag";
    //         obj.MouseStatus = 2;
    //         obj.mouseX = e.clientX - this.offsetLeft;
    //         obj.mouseY = e.clientY - this.offsetTop;
    //         this.socket.send(JSON.stringify(obj));
    //       }
    //       if (this.leftDown && this.rightDown) {
    //         this.allDown = true;
    //         this.allUp = false;
    //         obj.status = "drag";
    //         obj.MouseStatus = 3;
    //         obj.mouseX = e.clientX - this.offsetLeft;
    //         obj.mouseY = e.clientY - this.offsetTop;
    //         this.socket.send(JSON.stringify(obj));
    //       }
    //     }
    //     console.log()
    //   };
    // },
    // up() {
    //   let canvas = document.getElementsByTagName("canvas")[0];
    //   this.offsetLeft = this.$refs.player.offsetLeft;
    //   this.offsetTop = this.$refs.player.offsetTop;
    //   let obj = {};
    //   document.onmouseup = e => {
    //     if (e.button === 0) {
    //       this.leftDown = false;
    //       this.leftUp = true;
    //       console.log("鼠标左键弹起", e.clientX, e.clientY);
    //
    //       obj.status = "up";
    //       obj.MouseClickKey = 3;
    //       obj.mouseX = e.clientX - this.offsetLeft;
    //       obj.mouseY = e.clientY - this.offsetTop;
    //       this.socket.send(JSON.stringify(obj));
    //
    //       this.allDown = false;
    //       document.onmousemove = '';
    //     } else if (e.button === 2) {
    //       this.rightDown = false;
    //       this.rightUp = true;
    //       console.log("鼠标右键弹起", e.clientX, e.clientY);
    //
    //       obj.status = "up";
    //       obj.MouseClickKey = 4;
    //       obj.mouseX = e.clientX - this.offsetLeft;
    //       obj.mouseY = e.clientY - this.offsetTop;
    //       this.socket.send(JSON.stringify(obj));
    //
    //       this.allDown = false;
    //       document.onmousemove = '';
    //     }
    //     if (this.rightUp && this.leftUp) {
    //       this.allUp = true;
    //       this.allDown = false;
    //       console.log("==============")
    //     }
    //
    //     if(this.allUp) {
    //       console.log("***********")
    //     }
    //   }
    //
    // },

},
  beforeDestroy() {},
  destroyed() {
    // this.onclose(); // 离开路由之后断开websocket连接
    // document.onkeydown = '';
    // document.oncontextmenu = function() {
    //   return true;
    // };
    // document.onmousedown = '';
    // document.onmouseup = '';
    // document.onmousemove = '';
    // this.player.destroy();

  }
};
</script>

<style scoped lang="scss">

.page {
  position: fixed;
  width: 100%;
  height: 100%;

  canvas {
    margin-left: 10px;
  }
}
</style>