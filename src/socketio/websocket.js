
//const socket=new WebSocket("ws://192.168.1.137:3000/caozuo")
const socket=new WebSocket("ws://localhost:8181")

function init() {
  // 实例化socket
  //socket = new WebSocket("ws://192.168.1.137:3000/caozuo");
  // 监听socket连接
  socket.onopen = open;
  // 监听socket错误信息
  socket.onerror = error;
  // 监听socket消息
  // this.socket.onmessage = this.onmessage;
}

function  open() {
  // this.socket.send("发送数据");
  console.log("连接已打开...");
}
function  error() {
  console.log("error!!!!!");
}
function onclose() {
  // 关闭 websocket
  console.log("连接已关闭...");
}


