import { getIdRoles } from '@api/common/common.js';
import { Get, Post, Delete, FileLoad, download, Put } from '../http/request.js'
import { Message, Loading } from 'element-ui';
import router from '../router/index.js'
import store from '../store/index.js';
import socket from '../socketio/socketio.js'

//获取题目类型
export function getType(){
  return Get("/api/question/getType").then(res => {
   // console.log(res.data());
    return res.data;

  })
}

//获取题目列表
export function  getQuestion(){
  return Get("/api/question/getQuestion").then(res=>{
    console.log(res.data);
    return res.data;
  })
}

//根据id获取题目的详细信息
export  function getQuestionInfo(Id){
  return Get("/api/question/getQuestionInfo/"+Id).then(res=>{
   // console.log(res.code);
    console.log(res.data);
    return res.data;
  })
}

//添加附件数组
export function addAppdendix(appdendix){
  return Post("/api/question/addAppdendix",appdendix).then(res=>{
    console.log(res);
    return res.data;

  })
}
//删除附件信息
export function delAppdendix(dixId){
  return Get("/api/question/delAppdendix/"+dixId).then(res=>{
    console.log(res);
    return res.data;

  })
}
//添加一道试题
export function addQuestion(questionDTO,) {
  return Post("/api/question/addQuestion",{questionDTO:questionDTO}).then(res=>{
    //console.log(res);
    return res.data
  })
}
// //修改附件信息
// export function upAppdendix(){
//
// }
//删除试题
export function  deleteQuestion(Id){
  return Get("/api/question/deleteQuestion/"+Id).then(res=>{
    return res.data
  })
}

//修改题目
export function updateQuestion(newQuestion){
  return Post("/api/question/updateQuestion",{question:newQuestion}).then(res=>{
    return res.data
  })
}
