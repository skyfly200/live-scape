import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { Material } from "@/models/material";

@Module({ namespaced: true })
export default class Materials extends VuexModule {
  materials: any = [
    {
      name: "Fertilizer",
      image: "",
      size: "medium",
      description: "",
    },
    {
      name: "Stone",
      image: "",
      size: "large",
      description: "",
    },
    {
      name: "Suculants",
      image: "",
      size: "medium",
      description: "",
    },
  ];
}
