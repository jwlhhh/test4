import { getIdRoles } from '@api/common/common.js';
import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import { Message, Loading } from 'element-ui';
import router from '../../router/index.js'
import store from '../../store/index.js';
import socket from '../../socketio/socketio.js'
//登录
export function login(data) {
    let loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    // Post('/api/user/login/', {username, password}).then(res => {
    Post('/api/user/login/', data).then(res => {
        if (res.code === 200) {
            loading.close();
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            localStorage.setItem("roleName", res.data.roleName);
            localStorage.setItem("permission", JSON.stringify(res.data.permission));

            localStorage.setItem("token", res.data.token);

            router.push('/basicInfo');

            // store.commit('userInfo', [data.userid, res.data.name, res.data.role, res.data.function, res.data.portrait])
            // getIdRoles(data.UserID).then(res => {
            //     store.commit("userRoles", res)
            //     socket.emit("login", data.UserID)
            //     loading.close()
            //     router.push('/recommend')
            // })
            Message({
                showClose: true,
                message: '登录成功！',
                type: 'success'
            });
        } else {
            loading.close()
            Message({
                showClose: true,
                message: res.message,
                type: 'error'
            });
        }
    }).catch(err => {
        Message.error(err.message)
        loading.close()
    })
}

//获取用户信息
export function getUserDetailInfo() {
    return Get("/api/user/userInfo").then(res => {
        return res.data;
    })
}

//注册
export function register(username, password, name, telephone) {
    // let person = {
    //     UserID: data.username,
    //     Name: data.Name,
    //     LoginPassword: data.password,
    //     // Research: data.Research
    // }
    return Post('/api/user/create', {username: username, password: password, name: name, telephone: telephone}).then(res => {
        console.log(res);
        if (res.code == 200) {
            return "注册成功"
        } else {
            return res.message
        }
    }).catch(err => {
        Message.error(err.message)
    })
}

//修改用户信息
export function modifyInfo(user) {
    return Post('/api/user/modify', user).then(res => {
        console.log(res);
        return res
    })
}




//修改密码
export function modifyPassword(passwordDTO) {
    // console.log(data)
    return Post('/api/user/modifyPassword', passwordDTO).then(res => {
        return res;
    }).catch(err => {
        Message.error("网络错误！")
    });
}

