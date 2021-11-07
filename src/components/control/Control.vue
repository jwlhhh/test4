<template>
  <div>
    <el-container  class="control">
    <el-header>控制台</el-header>
      <el-main>
        <el-collapse  >
          <el-collapse-item name="发布命令"  >
            <template slot="title">
              <h3 class="title">发布数据</h3>
            </template>
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
              <el-button
                  type="primary"
                  style="width: 100px; background-color: #1c7e7c "
                  @click="dataFabu"
              >发布
              </el-button>
            </el-form>
          </el-collapse-item>

        </el-collapse>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Control",
  data(){
    return{
      activeNames: ['1','1'],
      fabuData:{
        linear:{
          x:'',
          y:0,
          z:0
        },
        angular:{
          x:0,
          y:0,
          z:''
        }
      },

    }
  },
  methods:{
    dataFabu(){
      //console.log(this.$refs['fabu'])
      //发布数据需要传入：两个三维向量
      console.log(parseFloat(this.fabuData.linear.x))
      console.log(parseFloat(this.fabuData.angular.z))
      //调用websocket函数传输数据至服务器端




    }
  }
}
</script>
<style  scoped>
.control{
  font-size: 20px;
}
.el-header{
  background-color:  #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
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
  background-color:  #E9EEF3;
  width: 100%;
}
.el-collapse-item__wrap {
  border-bottom: 0px;
}
.el-collapse {
  border-bottom: 0px;
}


</style>
