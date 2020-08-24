import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { Location } from "@/models/location";

@Module
export default class Locations extends VuexModule {
  locations: any = [
    {
      id: 0,
      contact: 0,
      title: "Dan's",
      address: "1203 Spruce St. Boulder, CO",
      notes: ["Don't run the blower"],
    },
    {
      id: 1,
      contact: 1,
      title: "Libby's",
      address: "2644 Mapleton Ave. Boulder, CO",
      notes: ["Libby is awesome"],
    },
    {
      id: 2,
      contact: 1,
      title: "Jerry's",
      address: "554 Bluff St. Boulder, CO",
      notes: ["Close the gate"],
    },
    {
      id: 3,
      contact: 1,
      title: "Wester Disposal",
      address: "Western Disposal Boulder, CO",
      notes: ["This place is a dump"],
    },
    {
      id: 4,
      contact: 1,
      title: "Home Depot",
      address: "Home Depot Boulder, CO",
      notes: ["A big box store"],
    },
  ];
}
