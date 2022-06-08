<template>
  <div class="page">
    <div class="header">
      <the-header></the-header>
    </div>
    <div id="main" class="main">
      <div class="content">
        <div id="mainContent" class="mainContent">
          <router-view v-loading="loading" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <the-bottom></the-bottom>
    </div>

<!-- -->
  </div>
</template>

<script>
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";
import Bottom from "../../components/layout/Bottom";
export default {
  name: "TheLayout",
  data() {
    return {
      isHide: false,
      noticHide: true,
      path: [],
      width: 0,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loadingState;
    },
  },
  watch: {
    $route() {
    },
  },
  methods: {
  },
  components: {
    "the-header": Header,
    "the-sidebar": Aside,
    "the-bottom": Bottom
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        // console.log(window.innerWidth);
        this.width = window.innerWidth;
        //监听浏览器窗口大小改变
        //浏览器变化执行动作
      });
    });
    this.width = window.innerWidth;
  },
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow: hidden;
  transition: padding 0.5s;
  .header {
    width: 100%;
    height: 120px;
  }
  .main {
    width: 100%;
    margin: 0 auto;
    height: calc(100% - 240px);
    display: flex;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    ::-webkit-scrollbar {
      width: 0 !important;height: 0;
    }
    .side {
      height: 100%;
      flex-shrink: 0;
      transition: 0.5s;
    }
    .content {
      width: 100%;
      //height: 100%;
      .mainContent {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        margin: auto;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
  }
}
</style>
