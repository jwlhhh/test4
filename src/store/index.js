import Vue from "vue";
import Vuex from "vuex";


import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: []
})

export default new Vuex.Store({
  state: {
    // token: '',
    loadingState: false,
    pageState: true,//功能栏是否收缩，true表示没有收缩
    user: {
      userInfo: {
        userId: '',
        name: '',
        role: "",
        func: [],
        portrait: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      roles: [],
      personalInfo:
      {

        settings: ''
      },
    },
    recommend: {
      collapseDate: [],
      imgList: []
    },

  },

  getters: {
    recommend: (state) => {
      return state.recommend
    },
    userFunction: (state) => {
      return state.user.userInfo.func
    },

    userInfo: (state) => {
      return state.user.userInfo
    },

  },
  mutations: {
    // set_token(state, token) {
    //   state.token = token
    //   sessionStorage.token = token
    // },
    // del_token(state) {
    //   state.token = ''
    //   sessionStorage.removeItem('token')
    // },
    startLoading(state) {
      state.loadingState = true
    },
    endLoading(state) {
      state.loadingState = false
    },
    pageState(state) {
      state.pageState = !state.pageState
    },
    userInfo(state, data) {
      state.user.userInfo.userId = data[0];
      state.user.userInfo.name = data[1];
      state.user.userInfo.role = data[2];
      state.user.userInfo.func = data[3];
      state.user.userInfo.portrait = data[4];
    },
    userRoles(state, data) {
      state.user.roles = data;
    },
    recommend(state, data) {
      state.recommend.imgList = data[0];
      state.recommend.collapseDate = data[1];
    },


  },
  actions: {
  },
  modules: {

  },
  plugins: [dataState]
});
