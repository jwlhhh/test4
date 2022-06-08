import { Get, Post } from '../../http/request.js'
import {Message} from "element-ui";

//获取注册账号申请列表
export function getApproveList() {
    return Get("/api/personManage/getAll/0").then(res => {
        return res.data;
    })
}

//获取用户列表
export function getUserList() {
    return Get("/api/personManage/getAll/1").then(res => {
        return res.data;
    })
}

//同意/拒绝用户账号申请  isApprove 1同意-1拒绝
export function approveApply(user_id, isApprove) {
    return Post("/api/personManage/approve", {user_id: user_id, isApprove: isApprove}).then(res => {
        console.log(res);
        return res.code;
    })
}

//获取角色信息
export function getRoleInfo() {
    return Get("/api/personManage/roleInfo").then(res => {
        return res.data;
    })
}

//添加新用户
export function addNewUserAccount(role_id, username, password) {
    return Post("/api/personManage/addUser", {role_id: role_id, username: username, password: password}).then(res => {
        console.log(res);
        return res;
    })
}

//修改用户角色
///personManage/roleUpdateUser
//role_id,user_id
export function modifyUserRole(role_id, user_id) {
    return Post("/api/personManage/roleUpdateUser", {role_id: role_id, user_id: user_id}).then(res => {
        // console.log(res);
        return res;
    })
}

//获取组织机构信息/organization/getFirst
export function getOrganizationInfo() {
    return Get("/api/organization/getFirst").then(res => {
        return res.data;
    })
}

//批量添加用户/personManage/batchAdd
export function batchAdd(list) {
    return Post("/api/personManage/batchAdd", list).then(res => {
        // console.log(res);
        return res;
    }).catch(err => {
        Message.error(err.message)
    })
}