import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import Auth from "./modules/auth";
import Timeclock from "./modules/timeclock";
import Jobs from "./modules/jobs";
import Tasks from "./modules/tasks";
import Locations from "./modules/locations";
import Contacts from "./modules/contacts";
import Tools from "./modules/tools";
import Materials from "./modules/materials";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
    taskSys: Tasks,
    jobs: Jobs,
    locations: Locations,
    contacts: Contacts,
    tools: Tools,
    materials: Materials,
  },
  state: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  getters: {},
});
