<template>
  <div class="bottom">
    <div class="content">
      <div class="bgc">
        <div class="menu" v-if="menu.length === 2">
          <el-dropdown>
            <div class="menu_item" v-for="(item, index) in menu">
              <div
                  v-if="item.children === null || item.children.length === 0"
                  :class="len_2[index]"
                  @click="toPage(item)"
              >
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown
                  trigger="click"
                  @command="handleCommand"
                  v-if="item.children === null || item.children.length !== 0"
                  style="font-family: artFont; color: white; font-size: 20px"
              >
                <div :class="len_2[index]">
                  <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                  <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                  <div>{{item.name}}</div>
                </div>
                <el-dropdown-menu slot="dropdown" style="background-color: #0B4C86">
                  <el-dropdown-item
                      v-for="child in item.children"
                      :command="child">
                    {{child.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
<!--              <div :class="len_2[index]">-->
<!--                <img src="../../assets/material/1.svg">-->
<!--                <div>{{item.name}}</div>-->
<!--              </div>-->
            </div>
          </el-dropdown>
        </div>

        <div class="menu" v-if="menu.length === 3">
          <div class="menu_item" v-for="(item, index) in menu">
            <div
                v-if="item.children === null || item.children.length === 0"
                :class="len_3[index]"
                @click="toPage(item)"
            >
              <img v-if="item.imgUrl !== null" :src=item.imgUrl>
              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
              <div>{{item.name}}</div>
            </div>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                v-if="item.children === null || item.children.length !== 0"
                style="font-family: artFont; color: white; font-size: 20px"
            >
              <div :class="len_3[index]">
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown-menu slot="dropdown" style="background-color: #0B4C86">
                <el-dropdown-item
                    v-for="child in item.children"
                    :command="child">
                  {{child.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="menu" v-if="menu.length === 4">
          <div class="menu_item" v-for="(item, index) in menu">
            <div
                v-if="item.children === null || item.children.length === 0"
                :class="len_4[index]"
                @click="toPage(item)"
            >
              <img v-if="item.imgUrl !== null" :src=item.imgUrl>
              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
              <div>{{item.name}}</div>
            </div>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                v-if="item.children === null || item.children.length !== 0"
                style="font-family: artFont; color: white; font-size: 20px"
            >
              <div :class="len_4[index]">
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="child in item.children"
                    :command="child">
                  {{child.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="menu" v-if="menu.length === 5">
          <div class="menu_item" v-for="(item, index) in menu">
            <div
                v-if="item.children === null || item.children.length === 0"
                :class="len_5[index]"
                @click="toPage(item)"
            >
              <img v-if="item.imgUrl !== null" :src=item.imgUrl>
              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
              <div>{{item.name}}</div>
            </div>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                v-if="item.children === null || item.children.length !== 0"
                style="font-family: artFont; color: white; font-size: 20px"
            >
              <div :class="len_5[index]">
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown-menu slot="dropdown" style="background-color: #0B4C86">
                <el-dropdown-item
                    v-for="child in item.children"
                    :command="child">
                  {{child.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="menu" v-if="menu.length === 6">
<!--          <div class="menu_item" v-for="(item, index) in menu">-->
<!--            <div :class="len_6[index]">-->
<!--              <img v-if="item.imgUrl !== null" :src=item.imgUrl>-->
<!--              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">-->
<!--              <div>{{item.name}}</div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="menu_item" v-for="(item, index) in menu">
            <div
                v-if="item.children === null || item.children.length === 0"
                :class="len_6[index]"
                @click="toPage(item)"
            >
              <img v-if="item.imgUrl !== null" :src=item.imgUrl>
              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
              <div>{{item.name}}</div>
            </div>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                v-if="item.children === null || item.children.length !== 0"
                style="font-family: artFont; color: white; font-size: 20px"
            >
              <div :class="len_6[index]">
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown-menu slot="dropdown" style="background-color: #0B4C86">
                <el-dropdown-item
                    v-for="child in item.children"
                    :command="child">
                  {{child.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="menu" v-if="menu.length === 7">
          <div class="menu_item" v-for="(item, index) in menu">
            <div
                v-if="item.children === null || item.children.length === 0"
                :class="len_7[index]"
                @click="toPage(item)"
            >
              <img v-if="item.imgUrl !== null" :src=item.imgUrl>
              <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
              <div>{{item.name}}</div>
            </div>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                v-if="item.children === null || item.children.length !== 0"
                style="font-family: artFont; color: white; font-size: 20px"
            >
              <div :class="len_7[index]">
                <img v-if="item.imgUrl !== null" :src=item.imgUrl>
                <img v-if="item.imgUrl === null" src="../../assets/material/1.svg">
                <div>{{item.name}}</div>
              </div>
              <el-dropdown-menu slot="dropdown" style="background-color: #0B4C86">
                <el-dropdown-item
                    v-for="child in item.children"
                    :command="child">
                  {{child.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  data() {
    return {
      menu: [],
      len_2: [
          "len_2_1",
          "len_2_2",
      ],
      len_3: [
          "len_3_1",
          "len_3_2",
          "len_3_3",
      ],
      len_4: [
          "len_4_1",
          "len_4_2",
          "len_4_3",
          "len_4_4",
      ],
      len_5: [
          "len_5_1",
          "len_5_2",
          "len_5_3",
          "len_5_4",
          "len_5_5",
      ],
      len_6: [
          "len_6_1",
          "len_6_2",
          "len_6_3",
          "len_6_4",
          "len_6_5",
          "len_6_6",
      ],
      len_7: [
          "len_7_1",
          "len_7_2",
          "len_7_3",
          "len_7_4",
          "len_7_5",
          "len_7_6",
          "len_7_7",
      ]
    }
  },
  methods: {
    toPage(item) {
      this.$router.push({
        path: item.url,
      });
    },
    handleCommand(command) {
      console.log(command)
      this.$router.push({
        path: command.url,
      });
    }
  },
  created() {
    this.menu = JSON.parse(localStorage.getItem("permission"));
  }
}
</script>

<style scoped lang="scss">
  img {
    width: 50px;
    height: 50px;
  }
  .bottom {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    //text-align: center;
    .content {
      width: 80%;
      height: 80px;
      margin: 0 auto;
      .bgc {
        margin: 0 auto;
        //background-size: cover;
        background-repeat: no-repeat;
        width: 80%;
        height: 80px;
        background-image: url("../../assets/material/bottom.png");
        background-size:100% 80px;

        .menu {
          margin: 0 auto;
          width: 80%;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          font-family: artFont;
          color: white;
          font-size: 20px;
          text-align: center;
          img {
            width: 50px;
          }
          .menu_item {
            cursor: pointer;
          }
        }
      }

    }
  }
  .len_2_1 {
    margin-top: -30px;
  }
  .len_2_2 {
    margin-top: -30px;
  }

  .len_3_1 {
    margin-top: -23px;
  }
  .len_3_2 {
    margin-top: -40px;
  }
  .len_3_3 {
    margin-top: -23px;
  }

  .len_4_1 {
    margin-top: -23px;
  }
  .len_4_2 {
    margin-top: -43px;
  }
  .len_4_3 {
    margin-top: -43px;
  }
  .len_4_4 {
    margin-top: -23px;
  }

  .len_5_1 {
    margin-top: -15px;
  }
  .len_5_2 {
    margin-top: -33px;
  }
  .len_5_3 {
    margin-top: -45px;
  }
  .len_5_4 {
    margin-top: -33px;
  }
  .len_5_5 {
    margin-top: -15px;
  }

  .len_6_1 {
    margin-top: -13px;
  }
  .len_6_2 {
    margin-top: -33px;
  }
  .len_6_3 {
    margin-top: -45px;
  }
  .len_6_4 {
    margin-top: -45px;
  }
  .len_6_5 {
    margin-top: -33px;
  }
  .len_6_6 {
    margin-top: -13px;
  }

  .len_7_1 {
    margin-top: -10px;
  }
  .len_7_2 {
    margin-top: -25px;
  }
  .len_7_3 {
    margin-top: -35px;
  }
  .len_7_4 {
    margin-top: -45px;
  }
  .len_7_5 {
    margin-top: -35px;
  }
  .len_7_6 {
    margin-top: -25px;
  }
  .len_7_7 {
    margin-top: -10px;
  }

  .el-dropdown-menu {
    border: none;
    background-color: #737171 !important;
  }

  .el-dropdown-menu__item{
    border: none;
    background-color: #737171 !important;
    color: white;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover{
    background-color: #a7acad !important;
    color:white;
  }

</style>
<style>
.el-popper[x-placement^=top] .popper__arrow::after {
  border-top-color: #737171 !important;
}
</style>