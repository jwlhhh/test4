<template>
  <div class="page">
    <div>
      <el-button @click="modifyPersonalInfo">修改个人信息</el-button>
      <el-button @click="modifyPassword">修改密码</el-button>
    </div>
    <el-dialog top="15vh" title="修改个人信息" :visible.sync="modifyPersonalInfoVisible" :modal-append-to-body="false" width="440px">
      <div class="modifyClass">
        <el-form
            :model="newUserInfo"
            :show-message="false"
            label-position="left"
            ref="form"
            label-width="90px"
            size="small"
        >
          <el-form-item label="姓名:" class="info_item">
            <el-input v-model="newUserInfo.name" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="出生日期:" class="info_item">
            <el-date-picker
                v-model="newUserInfo.birth"
                style="width: 236px"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别:" class="info_item">
            <el-select v-model="newUserInfo.gender" style="width: 236px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住址:" class="info_item">
            <el-input v-model="newUserInfo.address" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="身高:" class="info_item">
            <el-input v-model="newUserInfo.height" style="width: 236px"></el-input>
            <span style="font-size: 14px !important;">(单位:CM)</span>
          </el-form-item>
          <el-form-item label="体重:" class="info_item">
            <el-input v-model="newUserInfo.weight" style="width: 236px"></el-input>
            <span style="font-size: 14px !important;">(单位:KG)</span>
          </el-form-item>
          <el-form-item label="联系电话:" class="info_item">
            <el-input v-model="newUserInfo.telephone" style="width: 236px"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="addButton" type="primary" @click="confirmModifyPersonalInfo">确 定</el-button>
        <el-button @click="modifyPersonalInfoVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog top="15vh" title="修改密码" :visible.sync="modifyPasswordVisible" :modal-append-to-body="false" width="500px">
      <div class="modifyClass">
        <el-form
            :model="newUserInfo"
            :show-message="false"
            ref="form"
            label-width="120px"
            size="small"
        >
          <el-form-item label="原密码:" class="info_item">
            <el-input type="password" v-model="modifyPasswordInfo.oldPassword" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" class="info_item">
            <el-input type="password" v-model="modifyPasswordInfo.newPassword" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" class="info_item">
            <el-input type="password" v-model="modifyPasswordInfo.confirmNewPassword" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="addButton" type="primary" @click="confirmModifyPassword">确 定</el-button>
        <el-button @click="modifyPasswordVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <div class="content1">
      <div class="left">
        <div class="physical">
<!--          个人信息-->
          <el-card>
            <div slot="header" class="info-header">
              <img style="float: left; margin-top: 6px" src="../../assets/material/info_right.png">
              <span>个人信息</span>
              <img style="float: right; margin-top: 10px" src="../../assets/material/info_left.png">
            </div>
            <el-form label-position="left" style="color: white" ref="form" label-width="100px">
              <el-form-item v-if="userInfo.name !== null && userInfo.name !== ''" label="姓名" class="info_item">
                <span style="color: white">{{userInfo.name}}</span>
              </el-form-item>
              <el-form-item v-if="userInfo.birth !== null && userInfo.birth !== ''" label="年龄" class="info_item">
                {{new Date().getFullYear() - new Date(userInfo.birth).getFullYear()}}
              </el-form-item>
              <el-form-item v-if="userInfo.gender !== null && userInfo.gender !== ''" label="性别" class="info_item">
                {{userInfo.gender}}
              </el-form-item>
              <el-form-item v-if="userInfo.address !== null && userInfo.address !== ''" label="住址" class="info_item">
                {{userInfo.address}}
              </el-form-item>
              <el-form-item v-if="userInfo.height !== null && userInfo.height !== ''" label="身高" class="info_item">
                {{userInfo.height}}
              </el-form-item>
              <el-form-item v-if="userInfo.weight !== null && userInfo.weight !== ''" label="体重" class="info_item">
                {{userInfo.weight}}KG
              </el-form-item>
              <el-form-item v-if="userInfo.bmi !== null && userInfo.bmi !== ''" label="BMI指数" class="info_item">
                {{userInfo.bmi}}
              </el-form-item>
              <el-form-item v-if="userInfo.telephone !== null && userInfo.telephone !== ''" label="联系电话" class="info_item">
                {{userInfo.telephone}}
              </el-form-item>
            </el-form>
          </el-card>
<!--          体能素质-->
          <el-card style="margin-top: 30px">
            <div slot="header" class="info-header">
              <img style="float: left; margin-top: 6px" src="../../assets/material/info_right.png">
              <span>体能素质</span>
              <img style="float: right; margin-top: 10px" src="../../assets/material/info_left.png">
            </div>
            <div class="info_percentage">
              <div>01 耐力</div>
              <el-progress
                  :percentage="60"
                  :stroke-width="10"
              >
              </el-progress>
            </div>
            <div class="info_percentage">
              <div>02 力量</div>
              <el-progress
                  :percentage="79"
                  :stroke-width="10"
              >
              </el-progress>
            </div>
            <div class="info_percentage">
              <div>03 速度</div>
              <el-progress
                  :percentage="83"
                  :stroke-width="10"
              >
              </el-progress>
            </div>
            <div class="info_percentage">
              <div>04 柔韧</div>
              <el-progress
                  :percentage="66"
                  :stroke-width="10"
              >
              </el-progress>
            </div>
            <div class="info_percentage">
              <div>05 灵敏</div>
              <el-progress
                  :percentage="92"
                  :stroke-width="10"
              >
              </el-progress>
            </div>

          </el-card>
        </div>
<!--        <div>-->
<!--          <img style="width: 90%" src="../../assets/material/character.png">-->
<!--        </div>-->
      </div>
      <div class="middle">
        <img src="../../assets/material/character.png">
      </div>
      <div class="right">
        <div class="physical">
          <el-card class="chart">
            <div slot="header" class="info-header">
              <img style="float: left; margin-top: 6px" src="../../assets/material/info_right.png">
              <span>体能素质</span>
              <img style="float: right; margin-top: 10px" src="../../assets/material/info_left.png">
            </div>
            <div id="chart2" class="chart_info"/>
          </el-card>
          <el-card class="chart">
            <div slot="header" class="info-header">
              <img style="float: left; margin-top: 6px" src="../../assets/material/info_right.png">
              <span>体能素质</span>
              <img style="float: right; margin-top: 10px" src="../../assets/material/info_left.png">
            </div>
            <div id="chart3" class="chart_info"/>
          </el-card>
        </div>
<!--        <div id="chart3" class="physical1"/>-->
      </div>
    </div>
  </div>
</template>

<script>
import {getUserDetailInfo, modifyInfo, modifyPassword} from "../../api/user/user"
import { getQuestion } from "@api/test";
const option1 = {
  title: {
    // text: '能力概览'
  },
  legend: {
    data: []
  },
  radar: {
    // shape: 'circle',
    indicator: [
      {name: '心理素质', max: 100},
      {name: '应变能力', max: 100},
      {name: '爆发力', max: 100},
      {name: '耐力', max: 100},
      {name: '体能', max: 100},
      {name: '速度', max: 100}
    ],
    name: {
      textStyle: {
        color: '#fff',
      }
    },
    splitArea: {
      areaStyle: {
        color: ['#073f70']
      }
    }
  },
  series: [{
    name: '雷达图',
    type: 'radar',
    data: [
      {
        value: [70, 76, 80, 100, 90, 70],
        name: '评估得分',
        areaStyle: {
          color: 'rgba(1,255,255,0.36)',
        }
      }
    ]
  }]
};
export default {
  name: "personal",
  components: {
  },
  data() {
    return {
      modifyPersonalInfoVisible: false,
      modifyPasswordVisible: false,
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(33,197,255,0.8)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(33,197,255,0)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ],
      },
      tableData: [{
        subject: "心理素质",
        type: "类型",
        status: "状态",
        grade: "70"
      },
        {
        subject: "应变能力",
        type: "类型",
        status: "状态",
        grade: "76"
      },
        {
        subject: "爆发力",
        type: "类型",
        status: "状态",
        grade: "80"
      },
        {
        subject: "耐力",
        type: "类型",
        status: "状态",
        grade: "100"
      },
        {
          subject: "体能",
          type: "类型",
          status: "状态",
          grade: "90"
        },
        {
          subject: "速度",
          type: "类型",
          status: "状态",
          grade: "70"
        }],
      userInfo: [],
      newUserInfo: [],
      modifyPasswordInfo: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      timer: "",
    };
  },
  mounted() {
    this.drawChart();
    this.drawChart1();
    getUserDetailInfo().then(res => {
      this.userInfo = res;
      let _obj = JSON.stringify(res),
          objClone = JSON.parse(_obj);
      this.newUserInfo = objClone;
      console.log(res)
    })
  },
  methods: {
    modifyPersonalInfo() {
      //获取
    //  getQuestion()
      let _obj = JSON.stringify(this.userInfo),
          objClone = JSON.parse(_obj);
      this.newUserInfo = objClone;
      this.modifyPersonalInfoVisible = true;
    },
    confirmModifyPersonalInfo() {
      modifyInfo(this.newUserInfo).then(res => {
        if(res.code === 200) {
          getUserDetailInfo().then(res => {
            this.userInfo = res;
            let _obj = JSON.stringify(res),
                objClone = JSON.parse(_obj);
            this.newUserInfo = objClone;
          })
          this.$message.success("修改成功!")
        } else {
          this.$message.success("修改失败，请稍后重试！");
        }
      })
      this.modifyPersonalInfoVisible = false;
      console.log(this.newUserInfo)
    },
    modifyPassword() {
      this.modifyPasswordInfo.oldPassword = ''
      this.modifyPasswordInfo.newPassword = ''
      this.modifyPasswordInfo.confirmNewPassword = ''

      this.modifyPasswordVisible = true;
    },
    confirmModifyPassword() {
      if(this.modifyPasswordInfo.oldPassword === '' || this.modifyPasswordInfo.newPassword === '' || this.modifyPasswordInfo.confirmNewPassword === '') {
        this.$message.error("请将信息补充完整！")
      } else if(this.modifyPasswordInfo.oldPassword !== this.userInfo.password) {
        this.$message.error("原密码不正确，请重新输入！")
      } else if(this.modifyPasswordInfo.newPassword !== this.modifyPasswordInfo.confirmNewPassword) {
        this.$message.error("新密码两次输入不一致，请重新输入！")
      } else if(this.modifyPasswordInfo.oldPassword === this.modifyPasswordInfo.newPassword) {
        this.$message.error("新密码与原密码相同，请重新输入！")
      } else {
        let obj = {}
        obj.newpassword = this.modifyPasswordInfo.newPassword;
        obj.oldpassword = this.modifyPasswordInfo.oldPassword;
        obj.userId = this.userInfo.userId;
        modifyPassword(obj).then(res => {
          if(res.code === 200) {
            this.$message.success("修改成功，请重新登录！")
            this.modifyPasswordVisible = false;
            this.timer = setInterval(this.logout, 1000);
          } else {
            this.$message.error("修改失败，请稍后重试！")
          }
          console.log(res)
        })
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.clear();
      this.$router.push("/login");
      // this.$socket.client.emit("offline", UserID);
      window.location.reload();
    },
    drawChart() {
      // console.info(this.option)
      // const chart = this.$echarts.init(document.getElementById('chart'))
      const chart2 = this.$echarts.init(document.getElementById('chart2'))
      // chart.setOption(this.option)
      chart2.setOption(this.option)
    },
    drawChart1() {
      // const chart1 = this.$echarts.init(document.getElementById('chart1'))
      const chart3 = this.$echarts.init(document.getElementById('chart3'))
      // chart1.setOption(option1)
      chart3.setOption(option1)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style scoped lang="scss">
.info-header {
  font-size: 20px;
  height: 30px;
}
.page {
  width: 100%;
  height: 100% !important;
  margin: 0 auto;
  top: 0;
  left: 0;
  color: white;
  overflow: auto;
  .content1 {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 28%;
      overflow: auto;
      .physical {
        width: 90%;
        margin: 0 auto;
        .info-header {
          font-size: 20px;
          height: 30px;
        }
        .info_item {
          margin-bottom: 0px;
        }
        .info_percentage {
          margin-top: 10px;
        }
      }
    }
    .middle {
      //position: absolute;
      width: 35%;
      height: calc(100vh - 240px);
      display: flex;
      align-items: center;
      img {
        text-align: center;
        margin: 0 auto;
        width: 100%;
      }
    }
    .right {
      width: 28%;
      overflow: auto;
      .physical {
        width: 90%;
        margin: 0 auto;
        .chart {
          width: 100%;
          .chart_info {
            margin: 0 auto;
            width: 95%;
            height: 300px;
          }
        }
      }
    }
  }

  ::v-deep .el-card {
    border: none;
    color: white;
    font-family: artFont;
    background-color: transparent;
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #737171 !important;
    height: 50px !important;
    padding: 18px 5px !important;
  }
  ::v-deep .el-card__body {
    padding: 10px !important;
  }

  ::v-deep .physical .el-form--label-left .el-form-item__label {
    color: white !important;
    font-size: 18px !important;
  }
  ::v-deep .el-form-item__content {
    font-size: 18px !important;
  }
  ::v-deep .el-progress-bar__inner{
    background-color: unset;
    background-image: linear-gradient(to right, rgba(33,197,255,0), rgba(33,197,255,0.8)) !important;
  }

  ::v-deep .el-progress-bar__outer {
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid #737171 !important;
  }

  ::v-deep .el-progress__text {
    color: white;
  }
}
</style>
