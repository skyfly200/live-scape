import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 0,
        title: "Weed and Deadhead",
        note: "Weed and deadhead the back and side yards",
        tools: [0, 1, 2],
        images: [],
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
