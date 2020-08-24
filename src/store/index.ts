import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import Auth from "./modules/auth";
import Timeclock from "./modules/timeclock";
import Tasks from "./modules/tasks";
import Locations from "./modules/locations";
import Contacts from "./modules/contacts";
import Materials from "./modules/materials";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
    taskSys: Tasks,
    locations: Locations,
    contacts: Contacts,
    materials: Materials,
  },
  state: {
    jobs: [],
    tools: [],
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindJobs: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("jobs", db.collection("jobs"));
    }),
    bindTools: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("tools", db.collection("tools"));
    }),
  },
  getters: {},
});
