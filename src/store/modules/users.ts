import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

//import { User } from '@/models/user'

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: Array<any> = [];

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("users", db.collection("users").orderBy("name"));
    }) as Function)(this.context);
  }
}
