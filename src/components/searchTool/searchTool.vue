<template>
  <div>
    <div class="header">
      <span class="mainLabel">{{ title }}</span>
    </div>
    <div class="searchTool">
      <div class="left">
        <div class="rule">
          <drop-select :Options="rules" v-model="currentRule" class="selectBox"></drop-select>
        </div>
        <div class="value">
          <el-autocomplete
            class="inline-input"
            v-if="currentRule.type == 'input'"
            style="height: '30px'"
            size="small"
            v-model="currentValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
          ></el-autocomplete>
          <el-select
            v-if="currentRule.type == 'selection'"
            style="height: '30px'; width: 200px"
            size="small"
            clearable
            v-model="currentValue"
            class="select-value"
          >
            <el-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="otherBtn">
        <slot></slot>
      </div>
    </div>

    <div v-show="false">
      <div>{{ result }}</div>
    </div>
  </div>
</template>

<script>
import DropSelect from "../common/DropSelect";
import { searchTool } from "../../utils/common.js";
export default {
  name: "searchTool",
  props: {
    title: {
      type: String,
      default: () => {
        return "查询";
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    DropSelect
  },
  computed: {
    selectOptions() {
      let arr = [];
      let temp = JSON.parse(JSON.stringify(this.tableData));
      temp.forEach((item) => {
        if (
          item[this.currentRule.value] &&
          arr.indexOf(item[this.currentRule.value]) == -1
        ) {
          arr.push(item[this.currentRule.value] + "");
        }
      });
      return arr;
    },
    result() {
      let arr = [];
      let temp = JSON.parse(JSON.stringify(this.tableData));
      arr = temp.filter((item) => {
        if (!this.currentValue) return true;
        if (!item[this.currentRule.value]) {
          return false;
        }
        if (
          !this.currentRule.value ||
          (item[this.currentRule.value] + "").includes(this.currentValue)
        ) {
          return true;
        } else {
          return false;
        }
      });
      this.$emit("input", arr);
      return arr;
    },
  },
  watch: {
    currentRule: function (value) {
      this.currentValue = "";
    },
  },
  data() {
    return {
      currentValue: "",
      currentRule: this.rules[0],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var allData = this.tableData;
      var results = queryString
        ? allData.filter(this.createFilter(queryString))
        : allData;
      // 调用 callback 返回建议列表的数据
      results = results.map((item) => {
        return item[this.currentRule.value];
      });
      results = Array.from(new Set(results));
      results = results.map((item) => {
        return { value: item };
      });
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        let str1 = item[this.currentRule.value] + "";
        let str2 = queryString + "";
        if (str1.indexOf(str2) != -1) return true;
        else return false;
        return (
          item[this.currentRule.value]
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
      ];
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.header {
  margin: 10px 0;
}
.mainLabel {
  font-family: artFont;
}
.searchTool {
  width: 100%;
  //height: 35px;
  display: flex;
  flex-wrap: wrap;
  // background-color: red;
  align-items: center;
  justify-content: space-between;
  .left{
    display: flex;
  }
  .rule {
    flex-shrink: 0;
    width: 200px;
  }
  .selectBox {
    width: 100%;
  }
  .value {
    width: 200px;
    height: 30px;
    margin-left: 20px;
    //.select-value {
    //  width: 100%;
    //}
  }
  .otherBtn {
    height: 26px;
    margin-bottom: 10px;
    //margin-left: 20px;
    margin-right: 40px;
  }

  .el-dropdown .el-dropdown-link {
    background-color: transparent;
  }


  @media (max-width: 800px) {
    .rule {
      width: 120px;
    }
    .value {
      //width: 160px;
      margin-left: 10px;
      .el-select>.el-input {
        width: 160px !important;
      }
    }
    .inline-input {
      width: 80px;
    }
    .left {
      //display: block;
    }
    .otherBtn {
      margin-top: 10px;
      //display: block;
    }
    //.rule {
    //  width: 120px;
    //}
    //.selectBox {
    //  width: 100%;
    //}

  }
}
</style>
