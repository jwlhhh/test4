<template>
  <div>
    <el-container  class="control">
    <el-header>发布数据</el-header>
      <el-main>
        <el-form
            :model="fabuData"
            :show-message="false"
            ref="fabu"
            label-width="80px">
          <el-form-item  label="线速度：" style="margin-top: 20px">
            <el-input v-model="fabuData.linear.x" ></el-input>
          </el-form-item>
          <el-form-item  label="角速度：">
            <el-input v-model="fabuData.angular.z"></el-input>
          </el-form-item>
        </el-form>
<!--        <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dataFabu">确 定</el-button>-->
<!--      </span>-->
        <el-button  @click="dataFabu"
                 plain
                   style="font-size: 15px;margin-left:400px"
        >发送数据</el-button>
      </el-main>
    </el-container>
    <div style="">
<!--      <el-dialog title="发布数据" :visible.sync="fabuData.fabuFlag" width="500px" top="25vh"-->
<!--                 :modal-append-to-body="false">-->
<!--        <el-form-->
<!--            :model="fabuData"-->
<!--            :show-message="false"-->
<!--            ref="fabu"-->
<!--            label-width="80px">-->
<!--          <el-form-item  label="线速度：" style="margin-top: 20px">-->
<!--            <el-input v-model="fabuData.linear.x" ></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item  label="角速度：">-->
<!--            <el-input v-model="fabuData.angular.z"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dataFabu">确 定</el-button>-->
<!--      </span>-->
<!--      </el-dialog>-->
    </div>

  </div>
</template>

<script>
// import Socket from "../../socketio/websocket"
export default {
  name: "Control",
  data(){
    return{
      activeNames: ['1','1'],
      socket:'',
      fabuData:{
        fabuFlag:false,
        linear:{
          x:0,
          y:0,
          z:0
        },
        angular:{
          x:0,
          y:0,
          z:0
        }
      },
      reciveData:{

      }

    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      // 实例化socket
    //  this.socket = new WebSocket("ws://localhost:8181");
      //this.socket = new WebSocket("ws://localhost:8080/ws/asset");
      this.socket = new WebSocket("ws://172.20.10.2:8001/websocket");
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.onmessage;
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
    onmessage(e){
      console.log(e.data);
    },
    dataFabu(){
      //console.log(this.$refs['fabu'])
      //发布数据需要传入：两个三维向量
      // console.log(parseFloat(this.fabuData.linear.x))
      // console.log(parseFloat(this.fabuData.angular.z))
      //调用websocket函数传输数据至服务器端
      console.log(JSON.stringify(this.fabuData))
      this.socket.send(JSON.stringify(this.fabuData))
      this.fabuData.fabuFlag=false
    },
    beforeDestroy() {
      // socketClose();
      console.log("离开路由")
      this.onclose(); // 离开路由之后断开websocket连接
    }
  }
}
</script>
<style  scoped>
.control{
  font-size: 20px;
  height:100%;
}
.el-header{
  /*background-color:  #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  height: 500px;
  /*text-align: left;*/

}
.title {
  font-size: 20px;
  color: #1c7e7c;
}
.el-collapse{
  width: 100%;
  background-color:  #E9EEF3;
}
.el-collapse-item{
  background-color: #E9EEF3;
  width: 100%;
}
.el-collapse-item__wrap {
  border-bottom: 0px;
}
.el-collapse {
  border-bottom: 0px;
}


</style>
