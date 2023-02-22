import $ from "jquery";

export default {
  state: {
    id: "",
    username: "",
    photo: "",
    token: "",
    is_login: false,
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.is_login = user.is_login;
    },

    updateToken(state, token) {
      state.token = token;
    },

    logout(state) {
      state.id = "";
      state.username = "";
      state.photo = "";
      state.is_login = false;
      state.token = "";
    },
  },
  actions: {
    // 传入data的目的是传入前端输入的账号密码，以及前端成功时候的函数在这里调用
    login(context, data) {
      $.ajax({
        url: "http://localhost:3000/user/account/token/",
        type: "POST",
        data: {
          username: data.username,
          password: data.password,
        },
        success(resp) {
          if (resp.error_message === "success") {
            context.commit("updateToken", resp.token);
            data.success(resp);
          } else {
            data.error(resp);
          }
        },
        error(resp) {
          data.error(resp);
        },
      });
    },

    getInfo(context, data) {
      $.ajax({
        url: "http://localhost:3000/user/account/info/",
        type: "GET",
        headers: {
          Authorization: "Bearer " + context.state.token, // 这里没有.user.，因为就在user的内部使用，直接context和state就行
        },
        success(resp) {
          if (resp.error_message === "success") {
            context.commit("updateUser", {
              ...resp,
              is_login: true,
            });
            data.success(resp); // 前端跳转页面，所以传过来这个success在那边定义
          } else {
            data.error(resp);
          }
        },
        error(resp) {
          data.error(resp);
        },
      });
    },

    logout(context) {
      context.commit("logout");
    },
  },
  modules: {},
};
