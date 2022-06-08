<template>
  <div class="top">
    <div class="content">
      <div class="left">
        <img src="../../assets/img/8.png" />
        <span class="text">城市应急指挥系统</span>
      </div>
      <div class="right">
        <span class="userinfo">
          <span class="name">欢迎您：张三</span>

<!--          <span class="name">{{userName}}</span>-->
          <!--          {{ this.$store.getters.userInfo.name }}-->
          <a class="logout" @click="logout">
            <i class="el-icon-switch-button" style="margin-left: 10px"></i>
            <span click="logout">退出登录</span>
          </a>
          <el-button>func</el-button>
        </span>

      </div>

    </div>
  </div>
</template>

<script>
import SubPage from "../../views/subPage/subPage";
export default {
  name: "top",
  components: {SubPage},
  data() {
    return {
      userName: ""
    }
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("userInfo")).name;
  },
  mounted() {

  },
  methods: {
    logout() {
      let UserID = localStorage.getItem("UserID");
      localStorage.removeItem("token");
      localStorage.clear();
      this.$router.push("/login");
      // this.$socket.client.emit("offline", UserID);
      window.location.reload();
    }
  }
}
</script>

<style scoped lang="scss">
  .top {
    height: 80px;
    width: 100%;
    border-bottom: 1.5px solid #999;
  }
  .content {
    width: 94%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .left {
      flex-shrink: 1;
    }
    .right {
      flex-shrink: 0;
    }
    .userinfo {
      color: #07458A;
      font-weight: bold;
      a {
        cursor: pointer;
      }
    }
  }
  img {
    float: left;
    margin-top: 0px;
    width: 80px;
  }
  span {
    line-height: 100px;
    font-size: 18px;
    margin-bottom: 0px;
  }
  .text {
    float: left;
    margin-bottom: 0px;
    font-size: 24px;
    font-weight: bold;
  }

  @media (max-width: 800px) {
    .text {
      font-weight: bold;
      font-size: 18px;
    }
    .name {
      display: none;
    }
  }
</style>