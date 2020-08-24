import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/db";

import { Location } from "@/models/location";

@Module
export default class Locations extends VuexModule {
  locations: Array<Location> = [
    new Location({
      id: 0,
      contact: 0,
      title: "Dan's",
      address: "1203 Spruce St. Boulder, CO",
      notes: ["Don't run the blower"],
    }),
    new Location({
      id: 1,
      contact: 1,
      title: "Libby's",
      address: "2644 Mapleton Ave. Boulder, CO",
      notes: ["Libby is awesome"],
    }),
    new Location({
      id: 2,
      contact: 1,
      title: "Jerry's",
      address: "554 Bluff St. Boulder, CO",
      notes: ["Close the gate"],
    }),
    new Location({
      id: 3,
      contact: 1,
      title: "Wester Disposal",
      address: "Western Disposal Boulder, CO",
      notes: ["This place is a dump"],
    }),
    new Location({
      id: 4,
      contact: 1,
      title: "Home Depot",
      address: "Home Depot Boulder, CO",
      notes: ["A big box store"],
    }),
  ];

  @Action({ rawError: true })
  bindLocations() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("locations", db.collection("locations"));
    });
  }
}
