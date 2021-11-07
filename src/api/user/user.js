import { getIdRoles } from '@api/common/common.js';
import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import { Message, Loading } from 'element-ui';
import router from '../../router/index.js'
import store from '../../store/index.js';
import socket from '../../socketio/socketio.js'
//登录
export function login(data) {
    // let loading = Loading.service({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // });
    // Post('/api/user/login', data).then(res => {
    //     console.log(res);
    //     if ((res.code == 200)) {
    //         console.log(res.data.id);
    //         loading.close();
    //         localStorage.setItem("UserID", res.data.username);
    //         localStorage.setItem("name", JSON.stringify(res.data.name));
    //         localStorage.setItem("id", res.data.id);

            router.push('/recommend');
            // localStorage.setItem("token", res.data.token);
            // localStorage.setItem("function", JSON.stringify(res.data.function));
            // store.commit('userInfo', [data.userid, res.data.name, res.data.role, res.data.function, res.data.portrait])
            // getIdRoles(data.UserID).then(res => {
            //     store.commit("userRoles", res)
            //     socket.emit("login", data.UserID)
            //     loading.close()
            //     router.push('/recommend')
            // })
            // loading.close();
            // Message({
            //     showClose: true,
            //     message: '登录成功！',
            //     type: 'success'
            // });
        // } else {
        //     loading.close()
        //     Message({
        //         showClose: true,
        //         message: '用户名或密码错误！',
        //         type: 'error'
        //     });
        // }

    // })
}

//注册
export function register(data) {
    // let person = {
    //     UserID: data.username,
    //     Name: data.Name,
    //     LoginPassword: data.password,
    //     // Research: data.Research
    // }
    return Post('/api/user/create', data).then(res => {
        if (res.data && res.data.code == 200) {
            return true
        } else {
            return false
        }
    })
}



//修改密码
export function modifyPassword(data) {
    // console.log(data)
    return Put('/api/personalinfo/password', data).then(res => {
        if (res.status == 200) {
            if (res.data.status == 200) {
                Message.success(res.data.msg)
            } else {
                Message.error(res.data.msg)
            }
        } else {
            Message.error("修改失败！")
        }
    }).catch(err => {
        Message.error("网络错误！")
    });
}

