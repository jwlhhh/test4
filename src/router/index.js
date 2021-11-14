import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from 'element-ui';


Vue.use(VueRouter);

const routes = [
  {
    //默认路径：登录
    path: "/",
    meta: { activeRoute: "/", navName: "index" },
    redirect: "/login"
 //   redirect: "/test"
  },
  {
    path: "/login",
    name: "Login",
    meta: { activeRoute: "/login", navName: "login" },
    component: () => import('../views/Login.vue')
  },
  {
    path: "/test",
    name: "test",
   // meta: { activeRoute: "/login", navName: "login" },
    component: () => import('../views/test')
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
        path: '/Control',
        name: '控制状态',
        meta: { activeRoute: "/Control", navName: "控制状态" },
        component: () => import('../views/more/Zhuangtai.vue')
      },

    ]
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes
});


// let freePages = ['/login', '/video']
// router.beforeEach((to, from, next) => {
//   // if (to.path != '/login') {
//   if (freePages.indexOf(to.path) == -1) {
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
