import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import Auth from "./modules/auth";
import Timeclock from "./modules/timeclock";
import Tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
    taskSys: Tasks,
  },
  state: {
    jobs: [
      {
        id: 0,
        location: 0,
        start: "",
        end: "",
        assigned: [],
        tasks: [0, 1],
      },
    ],
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindTodos: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("jobs", db.collection("jobs"));
    }),
  },
  getters: {},
});
