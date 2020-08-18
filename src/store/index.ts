import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth";
import Timeclock from "./modules/timeclock";
import Tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
    tasks: Tasks,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
