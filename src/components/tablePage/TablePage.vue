<template>
  <div class="tablepage">
    <div class="eltable">
      <el-table
          class="exporttable"
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        border
        @sort-change="sortmethod"
        :row-class-name="tableRowClassName"
        :cell-style="{ 'text-align': 'center', borderColor:'#C0C0C0'}"
        :header-cell-style="{
          background: 'transparent',
          color: 'white',
          'text-align': 'center',
          'font-size': '16px',
          borderColor:'#C0C0C0'
        }"
      >
        <el-table-column
          v-for="item in headers"
          :prop="item.value"
          :key="item.id"
          :label="item.label"
          :width="item.width ? item.width : ''"
          :sortable="item.sortable ? 'custom' : false"
        >
          <template slot-scope="scope">
            <span style="color: white">{{ scope.row[item.value] || "无" }}</span>
          </template>
        </el-table-column>

        <el-table-column width="300px" label="操作">
          <template slot-scope="scope">
            <template v-for="btn in btns">
              <el-button
                v-if="btnControl(btn, scope.row)"
                :key="btn.id"
                :type="btn.type || 'primary'"
                size="mini"
                @click="btn.func(scope.row, scope.index)"
                >{{ btn.label }}</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8,10, 20, 30, 40]"
          :page-size="pageSize"
          background
          layout="sizes, prev, pager, next"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <div style="clear: both; height: 0"></div>
    </div>
  </div>
</template>

<script>
import { searchTool } from "../../utils/common.js";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    widthOptions: {
      type: Object,
      default: () => {
        return {};
      },
    },
    btns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableRowClassName: {
      type: Function,
      default: () => {
        let func = function (data) {
          // console.log("xxxxxxxxxx", data);
          // if (row.Gender == "男") {
          //   return "highlight";
          // } else {
          //   return "";
          // }
          return "";
        };
        return func;
      },
    },
    btnControl: {
      type: Function,
      default: () => {
        let func = function (btn, row) {
          // if (row.Gender == "男") {
          //   return "highlight";
          // } else {
          //   return "";
          // }
          return true;
        };
        return func;
      },
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    sortmethod(e) {
      if (e.order == "ascending") {
        this.tableData.sort((a, b) => {
          if (isNaN(parseInt(a[e.prop]))) {
            if (a[e.prop] < b[e.prop]) return -1;
            else return 1;
          } else {
            if (parseInt(a[e.prop]) < parseInt(b[e.prop])) return -1;
            else return 1;
          }
        });
      } else {
        this.tableData.sort((a, b) => {
          if (isNaN(parseInt(a[e.prop]))) {
            if (a[e.prop] < b[e.prop]) return 1;
            else return -1;
          } else {
            if (parseInt(a[e.prop]) < parseInt(b[e.prop])) return 1;
            else return -1;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  float: right;
  margin: 10px 5% 10px 0px;
  //font-family: artFont;

  .exporttable {
    border: solid 1px #c0c0c0;
  }

  }
</style>

<style lang="scss">
.el-table tr:hover > td {
  background-color: rgba(169, 181, 194, 0.76) !important;
}
.el-table__row {
  td:not(.is-hidden):last-child {
    right: -1px;
  }
}



.el-table {
  /deep/ .el-table__row {
    td:not(.is-hidden){
      bottom: -1px;
    }
  }
}


.tablepage {
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
}
.el-table th > .cell {
  padding-left: 3px;
  padding-right: 3px;
}
.block {
  margin-left: -10px;
}

//表格标题行透明
.el-table th, .el-table tr,.el-table td{
  background-color: transparent;
}

//表格题背景透明
.el-table, .el-table__expanded-cell {
  background-color: transparent;
}

</style>
