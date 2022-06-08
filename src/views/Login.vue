<template>
  <div class="page">
    <div class="pageContent">
      <div class="bgc">
        <img src="../assets/material/login1.jpg"/>
      </div>
      <div class="loginAndRegister">
        <div class="systemTitle">
          <img src="../assets/material/logo.png"/>
          <br/>
          <span class="systemName">职业消防智慧训练系统</span>
        </div>
        <div class="login-box">

          <el-form
              label-position="left"
              label-width="0px"
              class="demo-ruleForm login-container"
              ref="loginform"
              :rules="rules"
              status-icon
              :model="loginInfo"
              v-if="!registerData.registerFlag"
          >
<!--            <h3 class="title">用户登录</h3>-->
            <el-form-item prop="username">
              <el-input
                  type="text"
                  prefix-icon="el-icon-user-solid"
                  v-model="loginInfo.username"
                  auto-complete="off"
                  placeholder="用户名"
                  id="loginEmail"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="loginInfo.password"
                  auto-complete="off"
                  placeholder="密码"
                  id="loginPassword"
              ></el-input>
              <label id="showPasswordToggle"> </label>
            </el-form-item>
            <el-form-item style="width: 100%; margin-top: -10px">
              <div>
                <!--              <router-link :to="{path: '/memberDetail'}">-->
                <el-button
                    class="loginButton"
                    type="primary"
                    style=""
                    @click="userLogin"
                >登录
                </el-button
                >
                <!--              </router-link>-->


              </div>
              <div class="login-box-bottom" style="margin-top: 20px">
<!--                <el-button class="registration" style="width: 48%" @click="registerData.registerFlag = true" round>-->
<!--                  立即注册-->
<!--                </el-button>-->
                <el-link  :underline="false" @click="registerData.registerFlag = true">立即注册</el-link>
                <el-link  :underline="false">忘记密码</el-link>

<!--                <el-button type="warning" style="width: 48%; float: right" @click="touristLogin" round>-->
<!--                  游客登录-->
<!--                </el-button>-->
              </div>
            </el-form-item>
          </el-form>

          <el-form
              label-position="left"
              label-width="90px"
              class="demo-ruleForm login-container register"
              ref="register"
              :rules="rules"
              status-icon
              :model="registerData.registerInfo"
              v-if="registerData.registerFlag"
          >
<!--            <h3 class="title">账号注册</h3>-->
            <el-form-item prop="username" label="用户名:">
              <el-input
                  type="text"
                  placeholder="用户名"
                  v-model="registerData.registerInfo.username"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码:">
              <el-input
                  type="password"
                  placeholder="密码"
                  v-model="registerData.registerInfo.password"></el-input>
            </el-form-item>

            <el-form-item prop="name" label="真实姓名:">
              <el-input
                  type="text"
                  placeholder="真实姓名"
                  v-model="registerData.registerInfo.name"></el-input>
            </el-form-item>

            <el-form-item prop="telephone" label="联系方式:">
              <el-input
                  type="text"
                  placeholder="联系方式"
                  v-model="registerData.registerInfo.telephone"></el-input>
            </el-form-item>


            <el-form-item style="width: 100%" label-width="0">
              <div>
                <el-button
                    type="primary"
                    class="loginButton"
                    @click="userRegister"
                >确定
                </el-button>
              </div>
              <div class="mt5">
                <el-link @click="registerData.registerFlag = false" :underline="false"
                         style="width: 100%; font-size: 16px; text-align: center; ">返回登录
                </el-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

<!--      <div class="tourist">-->
<!--        <el-button-->
<!--            class="touristButton"-->
<!--            type="primary"-->
<!--            style=""-->
<!--            @click=""-->
<!--        >游客登录-->
<!--        </el-button-->
<!--        >-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
import {login, register} from "../api/user/user.js";

export default {
  name: "app-login",
  data() {
    return {
      loginInfo: {
        username: "admin",
        password: "123"
      },
      registerData: {
        registerFlag: false,
        registerInfo: {
          username: "",
          name: "",
          password: "",
          telephone: ""
        },
      },
      rules: {
        username: [{required: true, trigger: "blur"}],
        password: [{required: true, trigger: "blur"}],
        name: [{required: true, trigger: "blur"}],
        telephone: [{required: true, trigger: "blur"}],
      },
    };
  },
  methods: {
    userLogin() {
      //打开浏览器新窗口
      // window.open(href, '_blank')
      this.$refs["loginform"].validate((v) => {
        if (v) {
          login(this.loginInfo);
        } else {
          this.$message.error("请输入用户名或密码");
        }
      });
      // window.open("/memberDetail", '_self')
    },
    touristLogin() {
      this.loginInfo.password = "";
      this.loginInfo.username = "";
      login(this.loginInfo);
    },
    userRegister() {
      // console.log(this.registerData.registerInfo)
      this.$refs["register"].validate((v) => {
        if (v) {
          console.log(this.registerData.registerInfo);
          let u = this.registerData.registerInfo;
          register(u.username, u.password, u.name, u.telephone).then((res) => {
            console.log(res);
            if (res == "注册成功") {
              this.$message.success("注册成功");
              this.registerData.registerFlag = false;
            } else {
              this.$message.error(res);
            }
          });
        } else {
          this.$message.error("请完善注册信息");
        }
      })
    }
  },
  mounted() {
    localStorage.clear();
    this.$localforage.clear();
  },
};
</script>

<style scoped lang="scss">
  .title {
    text-align: center;
    margin-bottom: 15px;
    font-size: 24px;
    color: #ffffff;
  }
  .bgc {
    width: 55%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -webkit-background-size: cover;
    -o-background-size: cover;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0 0px 100% 0px;
    }
  }

  .page {
    background-image: linear-gradient(to bottom, #052038, #333333);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
  .pageContent {
    width: 100%;
    height: 100%;
  }

  .loginAndRegister {
    width: 450px;
    height: 550px;
    position: absolute;
    right: 10%;
    top:10%;

    .systemTitle {
      width: 100%;
      color: #ffffff;
      margin-bottom: 30px;


      //line-height: 80px;
      //-webkit-transform: translate(-50%, -50%);
      //transform: translate(-50%, -50%);
      img {
        width: 80px;
        height: 80px;
        margin-left: 150px;
        margin-bottom: 30px;
      }
      .systemName {
        margin-left: 15px;
        font-size: 40px;
        font-family: artFont;
      }
    }

    .login-box {
      border-radius: 0.4em;
      display: block;
      width: 96%;
      background-color: rgba(255,255,255,.8);
      margin-bottom: -20px;
      padding: 2.25em 2.25em 0.1em 2.25em;
      box-sizing: border-box;
    }
  }

  .loginButton {
    width: 200px;
    background-color: #0B4C86;
    font-size: 24px;
    margin-top: 10px;
    position: relative;
    left: 23%;
    font-family: artFont;
  }

  .tourist {
    position: absolute;
    right: 5%;
    bottom: 5%;
    .touristButton {
      width: 150px;
      background-color: #0B4C86;
      font-size: 24px;
      margin-top: 10px;
      position: relative;
      left: 23%;
      font-family: artFont;
    }
  }

  .login-box-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }



  
  .registration {
    color: white;
    background-color: rgb(157, 155, 155);
  }



</style>
