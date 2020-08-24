import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import Auth from "./modules/auth";
import Timeclock from "./modules/timeclock";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
  },
  state: {
    jobs: [],
    tasks: [],
    tools: [],
    locations: [],
    contacts: [],
    materials: [],
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindJobs: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("jobs", db.collection("jobs"));
    }),
    bindTasks: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("tasks", db.collection("tasks"));
    }),
    bindTools: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("tools", db.collection("tools"));
    }),
    bindLocations: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("locations", db.collection("locations"));
    }),
    bindContacts: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("contacts", db.collection("contacts"));
    }),
    bindMaterials: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("materials", db.collection("materials"));
    }),
  },
  getters: {},
});
