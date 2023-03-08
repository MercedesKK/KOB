import { createRouter, createWebHistory } from "vue-router";
import PKIndexView from "../views/pk/PKIndexView";
import RecordIndexView from "../views/record/RecordIndexView";
import RecordContentView from "../views/record/RecordContentView";
import NotFound from "../views/error/NotFound";
import UserBotIndexView from "../views/user/bot/UserBotIndexView";
import RankListIndexView from "../views/ranklist/RankListIndexView";
import UserAccountLoginView from "../views/user/account/UserAccountLoginView";
import UserAccountRegisterView from "../views/user/account/UserAccountRegisterView";
import store from "@/store"; // 判断当前是不是登录状态

// 当输入下列地址时就展现出对应的View组件
const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PKIndexView,
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: RecordContentView,
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RankListIndexView,
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requsetAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requsetAuth: false,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requsetAuth: true,
    },
  },
  {
    path: "/404/",
    name: "404_index",
    component: NotFound,
    meta: {
      requsetAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 每次路由跳转前执行
router.beforeEach((to, from, next) => {
  let flag = 1;
  const jwt_token = localStorage.getItem("jwt_token");
  if (jwt_token) {
    store.commit("updateToken", jwt_token);
    store.dispatch("getInfo", {
      success() {},
      error() {
        router.push({ name: "user_account_login" });
      },
    });
  } else {
    flag = 2;
  }

  if (to.meta.requsetAuth && !store.state.user.is_login) {
    if (flag === 1) {
      // next();
      setTimeout(() => {
        next();
      }, 100);
    } else {
      next({ name: "user_account_login" });
    }
  } else {
    next();
  }
});

export default router;
