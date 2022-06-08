<template>
  <div class="page">
    <div class="content">
      <div class="global-container mt20">
        <div class="mt20">
          <search-tool
              :tableData="tableData"
              :rules="formInline"
              v-model="showTable"
              title="查询"
          >
          </search-tool>
        </div>
        <div class="mt20">
          <TablePage
              :tableData="showTable"
              :headers="headers"
              :btns="btns"
          ></TablePage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TablePage from "../../../components/tablePage/TablePage";
import searchTool from "../../../components/searchTool/searchTool";
import {getApproveList, approveApply} from "../../../api/admin/admin";

export default {
  name: "applyList",
  components: {
    TablePage,
    searchTool
  },
  data() {
    return {
      tableData: [],
      showTable: [],
      formInline: [
        {
          label: "姓名",
          value: "userName",
          type: "input",
        },
        {
          label: "角色",
          value: "userRole",
          type: "selection",
        }
      ],
      headers: [
        { label: "申请编号", value: "userId" },
        { label: "用户名", value: "username" },
        { label: "真实姓名", value: "name"},
        { label: "联系电话", value: "telephone"},
      ],
      btns: [
        {
          label: "同意",
          func: this.approveApply,
        },
        {
          label: "拒绝",
          func: this.rejectApply,
        },
      ],
    }
  },
  created() {
    this.getList()

  },
  methods: {
    getList() {
      getApproveList().then(res => {
        this.tableData = res;
        console.log(res)
      })
    },
    approveApply(row) {
      console.log(row.user_id);
      approveApply(row.user_id, 1).then(res => {
        console.log(res.code)
        if(res === 200) {
          this.getList()
          this.$message.success("操作成功！");
        } else {
          this.$message.error("网络不稳定，请稍后重试！");
        }
      });

    },
    rejectApply(row) {
      approveApply(row.user_id, -1).then(res => {
        console.log(res.code)
        if(res === 200) {
          this.getList()
          this.$message.success("操作成功！");
        } else {
          this.$message.error("网络不稳定，请稍后重试！");
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
}
.content {
  width: 90%;
  height: 100%;
  margin-left: 30px;
  margin-top: -20px;
  //position: relative;
}
.eltable {
  width: 90%;
  //margin: 10px 5%;
}

.filter {
  margin: 20px 0px 0px 5%;
}
.searchRule {
}
</style>