import { createStore } from "vuex";
import ModuleUser from "./user";
import ModulePK from "./pk";
import ModuleRecord from "./record";

// 相当于前后端的中间人
export default createStore({
  state: {},
  getters: {},

  // 同步操作，修改操作都在这里
  mutations: {},
  // 异步操作，调用mutations的函数
  actions: {},
  modules: {
    user: ModuleUser,
    pk: ModulePK,
    record: ModuleRecord,
  },
});
