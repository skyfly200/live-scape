import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import { Material } from "@/models/material";

@Module
export default class Materials extends VuexModule {
  materials: Array<Material> = [
    new Material({
      name: "Fertilizer",
      image: "",
      size: "medium",
      description: "",
    }),
    new Material({
      name: "Stone",
      image: "",
      size: "large",
      description: "",
    }),
    new Material({
      name: "Suculants",
      image: "",
      size: "medium",
      description: "",
    }),
  ];

  @Action({ rawError: true })
  bindMaterials() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("materials", db.collection("materials"));
    });
  }
}
