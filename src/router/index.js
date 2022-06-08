import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"
import {Message} from "element-ui";


import personal from "./personal/personal";
import VideoPlay from "./video/video";


Vue.use(VueRouter);

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const routes = [
  {
    path: "/",
    meta: { activeRoute: "/", navName: "index" },
    redirect: "/jiekouTest"
  },
  //  与服务器数据测试页面
  {
    path: "/dataTest",
    name: "dataTest",
    meta: { activeRoute: "/dataTest", navName: "dataTest" },
    component: () => import('../views/dataTest/dataTest')
  },
  {
    path: "/jiekouTest",
    name:"jiekouTest",
    meta:{activeRoute: "jiekouTest",navName: "jiekouTest"},
    component:()=>import('../views/jiekoutest/test')

  },

  {
    path: "/login",
    name: "Login",
    meta: { activeRoute: "/login", navName: "login" },
    component: () => import('../views/Login.vue')
  },
  {
    path: "/abc",
    name: "abc",
    meta: { activeRoute: "/abc", navName: "abc" },
    component: () => import('../views/a/abc')
  },
  {
    path: "/index",
    redirect: "/recommend",
    name: "Layout",
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/recommend',
        name: '更多推荐',
        meta: { activeRoute: "/recommend", navName: "更多推荐" },
        component: () => import('../views/more/More.vue')
      },
      {
        path: "/getAll/0",
        name: "getAll",
        meta: { activeRoute: "/getAll/0", navName: "getAll" },
        component: () => import('../views/admin/personManage/personList')
      },
      {
        path: "/getAll/1",
        name: "apply",
        meta: { activeRoute: "/getAll/1", navName: "apply" },
        component: () => import('../views/admin/personManage/applyList')
      },

      personal,
      VideoPlay

    ]
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

// let freePages = ['/login']
// router.beforeEach((to, from, next) => {
//   if (to.path != '/login') {
//   // if (freePages.indexOf(to.path) == -1) {
//     if (localStorage.getItem("token")) {
//       next()
//     } else {
//       Message.error('您尚未登录！');
//       next('/login')
//     }
//   } else {
//     next()
//   }
//
// })


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
