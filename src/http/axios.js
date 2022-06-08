import axios from 'axios'
import { Message, Loading } from 'element-ui';

let Myloading = null
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.retry = 0;
  config.retryDelay = 5000;
  if (localStorage.getItem('token')) {
    config.headers["token"] = localStorage.getItem("token");
  }
  // Myloading = Loading.service({
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)'
  // });
  return config;
}, function (error) {
  // 对请求错误做些什么
  Message.error("网络错误")
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // Myloading.close();
  return response.data;
}, function (err) {
  return Promise.reject(err.response.data)
});

export default axios