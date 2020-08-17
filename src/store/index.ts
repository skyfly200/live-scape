import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
  },
  state: {
    tasks: [
      {
        id: 0,
        location: 0,
        title: "Weed and Deadhead",
        note: "Weed and deadhead the back and side yards",
        tools: [0, 1, 2],
        images: [],
      },
      {
        id: 1,
        location: 1,
        title: "Weed and Deadhead",
        note: "Weed and deadhead the back and side yards",
        tools: [0, 1, 2],
        images: [],
      },
    ],
    locations: [
      {
        customerName: "Libby Fly",
        address: "2644 Mapleton Ave. Boulder, CO",
        notes: "Close the gate",
      },
      {
        customerName: "Jerry Mathews",
        address: "1234 Bluff St. Boulder, CO",
        notes: "Don't run the blower",
      },
    ],
    tools: [
      {
        name: "Weeding Tool",
        image: "",
        size: "small",
        description: "",
      },
      {
        name: "Hand Pruners",
        image: "",
        size: "small",
        description: "",
      },
      {
        name: "Bucket",
        image: "",
        size: "medium",
        description: "",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
