<template>
  <div class="page">
    <div style="margin-top:30px;margin-left: 30px">
      <el-button   @click="addQuestion">录入试题</el-button>
      <el-button   @click="getQuestion">获取试题</el-button>
<!--      <el-button   @click="getQuTy">common</el-button>-->
      <TablePage
        style="margin-top:30px"
        :tableData="allQuestion"
        :headers="headers"
        :btns="btns"
      ></TablePage>

    </div>


<!--    录入试题-->
    <el-dialog
      title="添加试题"
      :visible.sync="addflag"
      :modal-append-to-body="false" width="440px"
      >
      <div class="modifyClass">
        <el-form
          :model="question"
          :show-message="false"
          label-position="left"
          ref="form"
          label-width="120px"
          size="small"
        >
          <el-form-item label="题型选择:" class="info_item">
            <el-select v-model="question.typeId" style="width: 236px">
              <el-option v-for="item in QuestionType"  :label="item.typeName" :value="item.typeId"></el-option>
<!--              <el-option label="男" value="男"></el-option>-->
<!--              <el-option label="女" value="女"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="题目:" class="info_item">
            <el-input v-model="question.questionContent" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目难易等级:" class="info_item">
            <el-input v-model="question.questionDegree" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目所属知识点:" class="info_item">
            <el-input v-model="question.questionPoints" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目分值:" class="info_item">
            <el-input v-model="question.questionScore" style="width: 236px"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="addButton" type="primary" @click="continueAddQuestion">继 续</el-button>
        <el-button @click="modifyPersonalInfoVisible = false">取 消</el-button>
      </span>
    </el-dialog>
<!--    添加选项-->
    <el-dialog
      title="题目详情"
      :visible.sync="infoFlag"
      :modal-append-to-body="false" width="440px"
    >
      <div class="modifyClass">
        <el-descriptions title="" :column=1>
          <el-descriptions-item label="题型">{{typeName}}</el-descriptions-item>
          <el-descriptions-item label="题目内容">{{searchQu.questionContent}}</el-descriptions-item>
          <el-descriptions-item label="题目知识点">{{searchQu.questionPoints}}</el-descriptions-item>
          <el-descriptions-item label="题目难度等级">{{searchQu.questionDegree}}          </el-descriptions-item>

        </el-descriptions>
      </div>
      <span slot="footer" class="dialog-footer">
<!--        <el-button class="addButton" type="primary" @click="">继 续</el-button>-->
<!--        <el-button @click="infoFlag = false">取 消</el-button>-->
      </span>
    </el-dialog>
<!--    修改试题-->
    <el-dialog
      title="修改试题"
      :visible.sync="updateFlag"
      :modal-append-to-body="false" width="440px"
    >
      <div class="modifyClass">
        <el-form
          :model="updateQu"
          :show-message="false"
          label-position="left"
          ref="form"
          label-width="120px"
          size="small"
        >
          <el-form-item label="题型选择:" class="info_item">
            <el-select v-model="updateQu.typeId" style="width: 236px">
              <el-option v-for="item in QuestionType"  :label="item.typeName" :value="item.typeId"></el-option>
              <!--              <el-option label="男" value="男"></el-option>-->
              <!--              <el-option label="女" value="女"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="题目:" class="info_item">
            <el-input v-model="updateQu.questionContent" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目难易等级:" class="info_item">
            <el-input v-model="updateQu.questionDegree" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目所属知识点:" class="info_item">
            <el-input v-model="updateQu.questionPoints" style="width: 236px"></el-input>
          </el-form-item>
          <el-form-item label="题目分值:" class="info_item">
            <el-input v-model="updateQu.questionScore" style="width: 236px"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="addButton" type="primary" @click="confirmUpdate">继 续</el-button>
        <el-button @click="updateFlag = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import {
  addAppdendix,
  addQuestion,
  delAppdendix,
  deleteQuestion,
  getQuestion,
  getQuestionInfo,
  getType, updateQuestion
} from "@api/test";
import TablePage from "@components/tablePage/TablePage";
import { getApproveList } from "@api/admin/admin";

export default {
  name: "test",
  components: { TablePage },
  data(){
    return{
      addflag:false,
      updateFlag:false,
      opFlag:false,
      typeName:'',
      infoFlag:false,
      allQuestion:[],
      searchQu:[],
      updateQu:[],
      newQuInfo:[],
      headers: [
        { label: "题号", value: "questionId" },
        { label: "题型", value: "typeName" },
        { label: "题目", value: "questionContent"},
        { label: "题目所属知识点", value: "questionPoints"},
        { label: "题目难度", value: "questionDegree"},
      ],
      btns: [
        {
          label: "删除",
          func: this.deleteQuestion,
        },
        {
          label: "详情",
          func: this.questioninfo,
        },
        {
          label:"修改",
          func:this.updateQuestion,
        }

      ],
      //userInfo: [],
      QuestionType:[ ],  //题型
      question: {
        createUser: 0,
        questionContent: "",
        questionDegree: '',
        questionPoints: "",
        questionScore: '',
        typeId: '',

      },
      op:[
        {op_name:"A",op_content:"",appendix:[]},
        {op_name:"B",op_content:"",appendix:[]},
        {op_name:"C",op_content:"",appendix:[]}
      ]
    }
  },

  methods:{
    addQuestion(){
      this.addflag=true;
    },
    getQuestion(){
      console.log("获取");
      //this.allQuestion=getQuestion();
      getQuestion().then(res => {
        this.allQuestion = res;
        console.log(res)
      })
      console.log("题目列表",this.allQuestion);

    },
    questioninfo(row){
      this.searchQu=[]

      console.log(row.questionId);
      // //查询id为13的题目
      getQuestionInfo(row.questionId).then(res=>{
        this.searchQu=res.questionAdd.questionDTO.question;
        this.typeName=res.typeName
        console.log(this.searchQu);
      })
      this.infoFlag=true;
    },
    updateQuestion(row){
      //console.log("确认修改");
      this.updateFlag=true
      console.log(row.questionId);
      getQuestionInfo(row.questionId).then(res=>{
        this.updateQu=res.questionAdd.questionDTO.question;
        console.log("获取题");
        console.log(this.updateQu);
      })

    },
    confirmUpdate(){
      console.log("确认修改");
      let _obj = JSON.stringify(this.updateQu),
        objClone = JSON.parse(_obj);
      this.newQuInfo = objClone;
      console.log(this.newQuInfo);
      updateQuestion(this.newQuInfo).then(res=>{
        console.log(res);
      })
      this.updateFlag=false;
    },
    getQuTy(){
      let dix=[
        {
          appdendixContent: "string",
          //appdendixId: 0,
          remark: "string",
          // tableId: 0,
          tableType: 0,
          type: "string"
        }
      ]
     // addAppdendix(dix)
      delAppdendix(0)

    },
    //删除试题
    deleteQuestion(row){
      console.log(row.questionId);
      deleteQuestion(row.questionId).then(res=>{
        console.log(res);
      })
    },
    continueAddQuestion(){

      // if(this.question.type_id==1 || this.question.type_id==2){
      //   this.opFlag=true
      // }

      //  objClone = JSON.parse(_obj);
      //添加一个试题
     //console.log(this.question);
      let QuestionDTO={
        question:this.question,
        appdendixes:[]
      }
      let answerDTO={}
      let choiceOptionDTOS=[]
      let _obj = JSON.stringify(QuestionDTO)
      let objClone = JSON.parse(_obj);
      let _obj1=JSON.stringify(answerDTO)
     // let _obj2=JSON.stringify(choiceOptionDTOS)
      QuestionDTO=objClone
      objClone = JSON.parse(_obj);
      answerDTO=objClone
      console.log("Qu",QuestionDTO);

      addQuestion(QuestionDTO,).then(res=>{
        console.log(res);
      })
      this.addflag=false
      getQuestion().then(res => {
        this.allQuestion = res;
        console.log(res)
      })

    },


  },
  mounted(){
    //获取题型
    getType().then(res=>{
      this.QuestionType=res
      console.log(this.QuestionType);
    })
    getQuestion().then(res => {
      this.allQuestion = res;
      console.log(res)
    })
      // getQuestionInfo(12).then(res=>{
      //   this.searchQu=res.questionAdd.questionDTO.question;
      //   console.log("获取题");
      //   console.log(this.searchQu);
      // })
  }
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100% !important;
  margin: 0 auto;
  top: 0;
  left: 0;
  color: white;
  overflow: auto;
.content1 {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
.left {
  width: 28%;
  overflow: auto;
.physical {
  width: 90%;
  margin: 0 auto;
.info-header {
  font-size: 20px;
  height: 30px;
}
.info_item {
  margin-bottom: 0px;
}
.info_percentage {
  margin-top: 10px;
}
}
}
.middle {
//position: absolute;
  width: 35%;
  height: calc(100vh - 240px);
  display: flex;
  align-items: center;
img {
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
}
.right {
  width: 28%;
  overflow: auto;
.physical {
  width: 90%;
  margin: 0 auto;
.chart {
  width: 100%;
.chart_info {
  margin: 0 auto;
  width: 95%;
  height: 300px;
}
}
}
}
}

::v-deep .el-card {
  border: none;
  color: white;
  font-family: artFont;
  background-color: transparent;
}

::v-deep .el-card__header {
  border-bottom: 1px solid #737171 !important;
  height: 50px !important;
  padding: 18px 5px !important;
}
::v-deep .el-card__body {
  padding: 10px !important;
}

::v-deep .physical .el-form--label-left .el-form-item__label {
  color: white !important;
  font-size: 18px !important;
}
::v-deep .el-form-item__content {
  font-size: 18px !important;
}
::v-deep .el-progress-bar__inner{
  background-color: unset;
  background-image: linear-gradient(to right, rgba(33,197,255,0), rgba(33,197,255,0.8)) !important;
}

::v-deep .el-progress-bar__outer {
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #737171 !important;
}

::v-deep .el-progress__text {
  color: white;
}
}
</style>

