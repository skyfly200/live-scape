import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import { Task } from "@/models/task";

@Module({ namespaced: true })
export default class Tasks extends VuexModule {
  tasks: Array<Task> = [
    new Task({
      id: 0,
      status: "new",
      job: 0,
      location: 0,
      title: "Weed and Deadhead",
      description: "Weed and deadhead the back and side yards",
      notes: "",
      tools: [0, 1, 2],
      materials: [],
    }),
    new Task({
      id: 1,
      status: "new",
      job: 0,
      location: 0,
      title: "Plant Suculants",
      description: "Plant the suculants in the garden",
      notes: "",
      tools: [0, 1, 2],
      materials: [2],
    }),
  ];

  @Action({ rawError: true })
  bindTasks() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("tasks", db.collection("tasks"));
    });
  }
}
