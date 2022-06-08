<template>
  <div class="funcMod">
    <img :src="imgUrl"/>
    <span class="title">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "funcMod",
  props: {
    imgUrl: {
      type: String,
      default: () => {
        return "";
      },
    },
    name: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      imgUrl1: ""
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  .funcMod {
    width: 260px;
    height: 90px;
    border: 3px solid #D2E2F2;
    border-radius: 1.4em;
    text-align: center;
    display: flex;
    align-items: center;
    img {
      width: 63px;
      height: 63px;
      margin-left: 10px;
    }
    .title {
      font-size: 20px;
      margin-left: 13px;
    }
  }

</style>