import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import { Job } from "@/models/job";

@Module
export default class Jobs extends VuexModule {
  jobs: Array<Job> = [
    new Job({
      uid: 0,
      location: 0,
      start: "",
      end: "",
      assigned: [],
      tasks: [0, 1],
    }),
  ];

  @Action({ rawError: true })
  bindJobs() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("jobs", db.collection("jobs"));
    });
  }
}
