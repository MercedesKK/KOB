import { createRouter, createWebHistory } from 'vue-router';
import PKIndexView from '../views/pk/PKIndexView';
import RecordIndexView from '../views/record/RecordIndexView';
import NotFound from '../views/error/NotFound';
import UserBotIndexView from '../views/user/bot/UserBotIndexView';
import RankListIndexView from '../views/ranklist/RankListIndexView';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pk/',
  },
  {
    path: '/pk/',
    name: "pk_index",
    component: PKIndexView,
  },
  {
    path: '/record/',
    name: "record_index",
    component: RecordIndexView,
  },
  {
    path: '/ranklist/',
    name: "ranklist_index",
    component: RankListIndexView,
  },
  {
    path: '/user/bot/',
    name: "user_bot_index",
    component: UserBotIndexView,
  },
  {
    path: '/404/',
    name: "404_index",
    component: NotFound,
  },
  {
    path:'/:catchAll(.*)',
    redirect:'/404/',
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
