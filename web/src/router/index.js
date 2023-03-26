import { createRouter, createWebHistory } from "vue-router";
import PKIndexView from "../views/pk/PKIndexView";
import RecordIndexView from "../views/record/RecordIndexView";
import RecordContentView from "../views/record/RecordContentView";
import RankListIndexView from "../views/ranklist/RankListIndexView";
import UserBotIndexView from "../views/user/bot/UserBotIndexView";
import NotFound from "../views/error/NotFound";
import UserAccountLoginView from "../views/user/account/UserAccountLoginView";
import UserAccountRegisterView from "../views/user/account/UserAccountRegisterView";
import ForumIndexView from "../views/forum/ForumIndexView";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    // redirect: "/pk/",
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/forum/",
    name: "forum_index",
    component: ForumIndexView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PKIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: RecordContentView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RankListIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false,
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requestAuth && !store.state.user.is_login) {
//     next({name: "user_account_login"});
//   } else {
//     next();
//   }
// })

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

  if (to.meta.requestAuth && !store.state.user.is_login) {
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
