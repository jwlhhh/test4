<template>
  <div class="page">

  </div>
</template>

<script type="text/javascript">
import funcMod from "../../components/funcModule/funcMod";
import {getUserInfo} from "@api/common/common.js"

export default {
  name: "More",
  components: {
    funcMod
  },
  data() {
    return {
      info: {},
      accessMenu: [],
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
    this.accessMenu = JSON.parse(localStorage.getItem("permission"));
  },
};
</script>
<style scoped lang="scss">
  .page {
    width: 100%;
    height: 100vh;
    margin-left: 30px;
    margin-bottom: 60px;
    overflow: hidden;
    .app-item-title {
      font-size: 18px;
      color: #025483;
      padding-left: 15px;
      position: relative;
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      margin-top: 30px;
    }
    .app-item-title:after {
      content: '';
      display: inline-block;
      width: 6px;
      height: 30px;
      background: #025483;
      border-radius: 3px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .func {
      display: flex;
    }
    .module {
      margin-top: 20px;
    }
  }
</style>

