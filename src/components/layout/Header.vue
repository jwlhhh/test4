<template>
  <div class="header">
    <div class="content">
      <img src="../../assets/material/top.png">
      <div class="title">职业消防智慧训练系统</div>
    </div>
    <div class="button">
<!--      <img src="../../assets/material/menu_left.png">-->
      <div class="logout" @click="logout">退出</div>
<!--      <span class="left_menu">退出</span>-->
<!--      <span class="right_menu">消防员</span>-->
<!--      <button class="left_menu">退出</button>-->
<!--      <button class="right_menu">退出</button>-->
<!--      <img class="left_menu" src="../../assets/material/menuleft.png">-->
<!--      <img class="right_menu" src="../../assets/material/menuright.png">-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: "",
    };
  },
  watch: {},
  methods: {
    logout() {
      console.log("---")
      let UserID = localStorage.getItem("UserID");
      localStorage.removeItem("token");
      localStorage.clear();
      this.$router.push("/login");
      // this.$socket.client.emit("offline", UserID);
      window.location.reload();
    },
  },
  mounted() {
    this.name = JSON.parse(localStorage.getItem("userInfo")).name
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  text-align: center;

  .content {
    width: 100%;
    height: 70px;
    position: relative;
    img {
      width: 80%;
      height: 100%;
    }
    .title {
      color: white;
      font-size: 40px;
      font-family: artFont;
      position: absolute;
      margin:auto;
      top:10px;
      bottom:0;
      right:0;
      left:0;
    }
  }
  .button {
    position: absolute;
    width: 150px;
    height: 40px;
    background-image: url("../../assets/material/menu_left.png");
    background-size:150px 40px;
    img {
      width: 50%;
      //background-image: url("../../assets/material/menu_left.png");
    }
    .logout {
      //left: 10px;
      color: #0B4C86;
      font-family: artFont;
      font-size: 26px;
      cursor: pointer;
    }

    .left_menu {
      width: 200px;
      height: 40px;
      //background-image: url("../../assets/material/menuleft.png");
      position: absolute;
      left: 10px;
    }
    .right_menu {
      width: 200px;
      height: 40px;
      //background-image: url("../../assets/material/menuright.png");
      position: absolute;
      right: 0;
    }
  }
}

</style>
