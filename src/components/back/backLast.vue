<template>
  <div class="backLast">
    <img src="../../assets/img/back.png">
  </div>
</template>

<script>
export default {
  name: "backLast"
}
</script>

<style scoped lang="scss">
.backLast {
  //position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(110, 164, 225, .5);
  border: 1px solid #d1d0d0;
  display: flex;
  justify-content: center;
  align-items: center;


  img {
    width: 40px;
    height: 40px;
  }
}
</style>