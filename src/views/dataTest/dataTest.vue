<template>
  <div>
    tttt
    <el-button @click="send">test</el-button>
  </div>
</template>

<script>
import {testPost} from "../../api/dataTest/test";

export default {
  name: "dataTest",
  methods: {
    send() {
      let obj = {};
      obj.username = "abc";
      obj.password = 123;
      let obj1 = {};
      obj1.username = JSON.stringify(obj);
      obj1.password = 123;
      testPost(obj1);
    }
  }
}
</script>

<style scoped>

</style>