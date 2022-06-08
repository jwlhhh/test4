<template>
  <aside class="sidebar">
    <el-menu
        class="sidebar-menu"
        :router="true"
        background-color="transparent"
        text-color="white"
        :default-active="this.activeItem"

    >
      <template v-for="menu in user.accessMenu">
        <el-menu-item
            v-if="menu.children == null || menu.children.length == 0"
            :key="menu.name"
            :index="menu.url"
        >
          <span slot="title" class="mainTitle">{{ menu.name }}</span>
        </el-menu-item>
        <el-submenu v-else :key="menu.permission_id" :index="menu.url">
          <template slot="title">
            <span slot="title" class="mainTitle">{{ menu.name }}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item
                v-if="item.children == null || item.children.length == 0"
                :key="item.name"
                :index="item.url"
            >
              <span class="subTitle">{{ item.name }}</span>
            </el-menu-item>
            <the-submenu
                :key="item.permission_id"
                :subMenu="item"
                v-else
            ></the-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import SubAside from "./SubAside.vue";

export default {
  name: "Aside",
  components: {
    "the-submenu": SubAside,
  },
  data() {
    return {
      activeItem: "",
      openNav: true,
      user: {
        accessMenu: [],
      },
      indexList: [],
    }
  },


  watch: {
    $route(to, from) {
      console.log(this.$route.meta);
      this.activeItem = this.$route.meta.activeRoute;
    },
  },
  methods: {},
  mounted() {
    let indexList = [];

    function indexScan(functionList, indexList) {
      functionList.forEach((element) => {
        if (element.children === null || element.children.length == 0) {
          indexList.push(element.url);
        } else {
          indexScan(element.children, indexList);
        }
      });
    }

    this.user.accessMenu = JSON.parse(localStorage.getItem("permission"));
    console.log(this.user.accessMenu)
    indexScan(this.user.accessMenu, indexList);
    this.indexList = indexList;
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  // position: absolute;
  float: left;
  width: 260px;
  height: 100%;
  overflow: auto;
  //text-align: center;
  //background-color: #87CEFA;
  //#48D1CC
  //#87CEFA, #48D1CC
  //background-image: linear-gradient(to bottom, #728ace, #91d2fb);
  background-color: #0175B8;
  .sidebar-menu {
    border: none;
    height: 100%;

    .mainTitle {
      font-size: 24px;
      margin-left: 20px;
    }

    .subTitle {
      font-size: 20px;
      margin-left: 20px;
    }

    i {
      font-size: 24px;
      color: white;
      margin-right: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-menu-item.is-active {
  color: #ffd79d;
}

.el-submenu__title i {
  color: white;
}
</style>