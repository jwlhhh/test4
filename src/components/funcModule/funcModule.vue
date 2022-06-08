<template>
  <div class="module">
    <img :src="imgUrl">
    <div class="text">{{name}}</div>
<!--    <span>申请训练</span>-->
  </div>
</template>

<script>
export default {
  name: "funcModule",
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
    children: {
      type: Array,
      default: () => {
        return [];
      },
    }
  }
}
</script>

<style scoped lang="scss">
 .module {
   height: 200px;
   width: 280px;
   background-color: #fff;
   border: 1px solid #999999;
   border-radius: 1.4em;

   text-align: center;

   img {
     width: 80px;
     height: 80px;
     margin-top: 40px;
   }
   .text {
     margin-bottom: 10px;
     font-size: 20px;
   }
 }


 @media (max-width: 800px) {
   .module {
     width: 40%;
     height: 80px;
     position: relative;
     border-radius: 0.9em;

     img {
       width: 60px;
       height: 60px;
       position: absolute;
       top: 13%;
       left: 10px;
       margin: auto;
     }
     .text {
       position: absolute;
       top: 35%;
       left: 75px;
       font-size: 20px;
     }
   }
 }
</style>