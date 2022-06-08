<template>
  <div class="backHome">
    <img src="../../assets/img/home.png"/>
  </div>
</template>

<script>
export default {
  name: "backHome"
}
</script>

<style scoped lang="scss">
  .backHome {
    //position: fixed;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    //background-color: #6EA4E1;
    background-color: rgba(110, 164,225,.5);
    border: 1px solid #d1d0d0;
    display: flex;
    justify-content: center;
    align-items: center;


    img {
      width: 40px;
      height: 40px;
      //margin: 0 auto;
    }
  }
</style>