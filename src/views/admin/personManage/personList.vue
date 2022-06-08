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
            <el-button style="margin-right: 10px; background-color: #0B4C86; width: 120px; font-family: artFont; font-size: 20px; height: 44px;" type="primary" @click="batchAddUser">批量添加</el-button>
            <el-button style="background-color: #0B4C86; width: 120px; font-family: artFont; font-size: 20px; height: 44px;" type="primary" @click="addUser">添加用户</el-button>
          </search-tool>
        </div>
        <div class="mt20">
          <TablePage
              :tableData="showTable"
              :headers="headers"
              :btns="btns"
          ></TablePage>
        </div>

        <el-dialog top="25vh" title="添加用户" :visible.sync="addDialogVisible" :modal-append-to-body="false" width="500px">
          <div class="addBox">
            <el-form
                :model="newUser"
                :show-message="false"
                :rules="rules"
                ref="form"
                label-width="120px"
                size="small"
            >
              <el-form-item prop="username" label="用户名:">
                <el-input v-model="newUser.username" style="width: 70%"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码:">
                <el-input v-model="newUser.password" style="width: 70%"></el-input>
              </el-form-item>
              <el-form-item prop="role_id" label="用户角色:">
                <el-select  v-model="newUser.role_id" placeholder="请选择">
                  <el-option
                      v-for="item in roleInfo"
                      :key="item.role_id"
                      :label="item.role_name"
                      :value="item.role_id">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button class="addButton" type="primary" @click="addNewUser">确 定</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="查看用户信息"
            top="25vh"
            :visible.sync="checkDialogVisible"
            :modal-append-to-body="false"
            width="500px"
        >
          <div class="addBox" style="color: white">
            <el-form
                :show-message="false"
                label-width="100px"
                size="small"
                label-position="left"
            >
              <el-form-item prop="username" label="账号:">
                {{nowUserName || "无"}}
              </el-form-item>
              <el-form-item prop="password" label="用户名:">
                {{nowName || "无"}}
              </el-form-item>
              <el-form-item prop="password" label="联系电话:">
                {{nowTelephone || "无"}}
              </el-form-item>
              <el-form-item prop="role_id" label="用户角色:">
                <span style="margin-right: 10px">{{nowUserRole || "无"}}</span>
                <el-link :underline="false" type="primary" @click="chooseUserRole">修改角色</el-link>
              </el-form-item>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button class="addButton" size="small" type="primary" @click="checkDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog top="25vh" title="提示" :visible.sync="chooseDialogVisible" :modal-append-to-body="false" width="300px" style="margin-top: 100px">
          <div style="color: white; font-size: 16px">请选择用户角色</div>
          <div style="margin-top: 10px">
            <el-select v-model="userRole" placeholder="请选择">
              <el-option
                  v-for="item in roleInfo"
                  :key="item.role_id"
                  :label="item.role_name"
                  :value="item.role_id">
              </el-option>
            </el-select>
          </div>

          <span slot="footer" class="dialog-footer">
              <el-button class="addButton" size="small" type="primary" @click="adminModifyUserRole">确 定</el-button>
            </span>

        </el-dialog>

        <el-dialog class="batch-add" top="15vh" title="批量添加用户" :visible.sync="batchAddUserVisible" :modal-append-to-body="false" width="500px" style="margin-top: 100px">
          <span style="color: black; font-size: 16px">请选择组织：</span>
          <el-cascader
              v-model="organizationValue"
              :options="organizationInfo"
              :props="{ value: 'organizationId',label: 'organizationName'}"
              clearable
              @change="handleChange">
          </el-cascader>
          <br/>
          <div style="margin-top: 10px">
            <span style="color: black; font-size: 16px">请上传文件：</span>
            <el-upload
                style="margin-top: 20px; display: inline"
                ref="upload"
                class="upload-demo"
                action="#"
                accept="xlsx,xls"
                multiple
                :auto-upload="false"
                :withCredentials="false"
                :on-change="loadFile"
                :show-file-list="false"
                :file-list="fileList"
            >
              <el-button slot="trigger" plain>选择文件</el-button>
              <br>
              <div slot="tip" class="el-upload__tip">【注意】只能上传xls/xlsx文件</div>
            </el-upload>
          </div>
          <div v-if="excelData.length !== 0" class="batch-user-info">
            <div v-for="(item, index) in excelData">
              <span>用户{{index + 1}}：</span>
              <span>{{ item.name }}</span>
              <span style="margin-left: 10px">{{item.telephone}}</span>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
              <el-button class="addButton" size="small" type="primary" @click="confirmBatchAddUser">确定添加</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import TablePage from "../../../components/tablePage/TablePage";
import searchTool from "../../../components/searchTool/searchTool";
import {getUserList, getRoleInfo, addNewUserAccount, modifyUserRole, getOrganizationInfo, batchAdd}
  from "../../../api/admin/admin";


export default {
  name: "personList",
  components: {
    TablePage,
    searchTool
  },
  data() {
    return {
      addDialogVisible: false,
      checkDialogVisible: false,
      chooseDialogVisible: false,
      batchAddUserVisible: false,
      tableData: [],
      showTable: [],
      nowUserName: '',
      nowName: '',
      nowTelephone: '',
      nowUserRole: '',
      formInline: [
        {
          label: "姓名",
          value: "name",
          type: "input",
        },
        {
          label: "联系电话",
          value: "telephone",
          type: "input",
        },
        {
          label: "角色",
          value: "role_name",
          type: "selection",
        }
      ],
      headers: [
        { label: "用户编号", value: "userId" },
        { label: "用户名", value: "username" },
        { label: "真实姓名", value: "name"},
        { label: "用户角色", value: "roleName"},
        { label: "联系电话", value: "telephone"},
      ],
      btns: [
        {
          label: "查看",
          func: this.memberDetails,
        },
      ],
      newUser: {
        username: "",
        password: "",
        role_id: ""
      },
      rules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
        role_id: [{ required: true, trigger: "blur" }],
      },
      roleInfo:[],
      userRole: '',  //修改的角色id
      modifyRoleUserId: '', //修改角色的用户id
      upload_file:'',
      excelData:[],
      fileList:[],
      file:"",
      organizationInfo: [],
      organizationValue: [],
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getUserList().then(res => {
        this.tableData = res;
      })
    },
    memberDetails(row) {
      console.log(row)
      this.nowName = row.name;
      this.nowUserName = row.username;
      this.nowTelephone = row.telephone;
      this.checkDialogVisible = true;
      this.modifyRoleUserId = row.user_id;
      this.nowUserRole = row.role_name;
      // this.$router.push({
      //   path: "/memberDetail",
      //   query: { id: row.id },
      // });
    },
    addUser() {
      this.newUser = {};
      this.addDialogVisible = true;
      getRoleInfo().then(res => {
        console.log(res);
        this.roleInfo = res;
      })
    },
    addNewUser() {
      console.log(this.newUser)
      let account = this.newUser;
      if(account.role_id == null || account.username == null || account.password == null) {
        this.$message.error("请补充完整信息!");
      } else {
        addNewUserAccount(account.role_id, account.username, account.password)
            .then(res => {
          if(res.code === 200) {
            this.addDialogVisible = false;
            this.$message.success("添加成功！");
            this.getList();
          } else {
            this.$message.error("添加失败！");
          }
        })
      }
    },
    chooseUserRole() {
      this.userRole = ''
      this.chooseDialogVisible = true;
      getRoleInfo().then(res => {
        console.log(res);
        this.roleInfo = res;
      })
    },
    batchAddUser() {
      getOrganizationInfo().then(res => {
        this.organizationInfo = res;
      })
      this.batchAddUserVisible = true;
      this.upload_file = '';
      this.excelData = [];
    },
    confirmBatchAddUser() {
      if(this.excelData.length === 0) {
        this.$message.error("导入数据为空，请重新导入！");
      } else {
        console.log(this.organizationValue.length)
        if(this.organizationValue.length === 0) {
          this.$message.error("请选择人员单位！");
        } else {
          let id = this.organizationValue[0];
          this.excelData[0].organizationId = id;
          batchAdd(this.excelData).then(res => {
            // console.log(res)
            if(res.code === 200) {
              this.getList()
              this.batchAddUserVisible = false;
              this.$message.success("导入成功！")
            } else {
              this.$message.error("导入失败，请稍后重试！")
            }
          })
          console.log(this.excelData)
        }
      }

    },
    handleChange(value) {
      this.organizationInfo[0] = value[value.length - 1]
      console.log(value[value.length - 1]);
      // console.log(value);
    },
    loadFile(file,fileList){
      this.fileList = [fileList[fileList.length - 1]]; //只能上传一个Excel，重复上传会覆盖之前的
      this.file = file.raw;
      let reader = new FileReader()
      let _this = this
      reader.readAsArrayBuffer(this.file)
      reader.onload = () => {
        try {
          let buffer = reader.result
          let bytes = new Uint8Array(buffer)
          let length = bytes.byteLength
          let binary = ''
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          let XLSX = require('xlsx')
          let wb = XLSX.read(binary, {
            type: 'binary'
          })
          let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          this.excelData = outdata
          if(this.excelData.length === 0) {
            this.$message.error("导入数据为空，请重新导入！");
          }
        } catch (e) {
          this.$message.error("文件类型不正确，请重新上传！");
        }
      }
    },
    adminModifyUserRole() {
      console.log(this.userRole)
      for (let i = 0; i < this.roleInfo.length; i++) {
        if(this.roleInfo[i].role_id === this.userRole) {
          let tmpRoleName = this.roleInfo[i].role_name;
          modifyUserRole(this.userRole, this.modifyRoleUserId).then(res => {
            if(res.code === 200) {
              this.getList();
              this.nowUserRole = tmpRoleName;
              this.$message.success("修改成功！");
            } else {
              this.$message.error(res.message);
            }
          })
        }
      }
      this.chooseDialogVisible = false;
      this.userRole = ''
    }
  }
}
</script>


<style scoped lang="scss">
.page {
  width: 90%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  overflow: auto;
}
.content {
  width: 90%;
  height: 100%;
  margin-left: 30px;
  margin-top: -20px;
  position: relative;
}
.eltable {
  width: 90%;
  margin: 10px;
}

.addButton {
  background-color: #0B4C86;
  font-family: artFont;
  font-size: 20px;
  width: 100px;
}

.filter {
  margin: 20px 0px 0px 5%;
}
.searchRule {
}

.batch-add {
  color: black;
}
.el-upload__tip {
  color: black;
}
.batch-user-info {
  margin-top: 10px;
  margin-left: 5px;
  color: black;
  font-size: 16px;
  line-height: 24px;
  height: 120px;
  overflow: auto;
}
</style>
<style>
  .el-button--primary {
    border: none;
    /*background-color: #0B4C86;*/
  }

  /*.el-dialog, .el-pager li {*/
  /*  background-color: rgba(0, 0, 0, 0.9);*/
  /*  border: 1px solid rgb(33, 197, 255);*/
  /*  border-radius: 20px;*/
  /*}*/

  .el-dialog__title {
    color: black;
  }

  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    color: black;
    font-size: 16px;
  }

  .el-select>.el-input {
    width: 236px;
  }
</style>
