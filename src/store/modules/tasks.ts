import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import router from "../../router";
import firebase from "firebase";
import { User } from "@/models/user";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { v4 as uuidv4 } from "uuid";

@Module({ namespaced: true })
export default class Tasks extends VuexModule {
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
  contacts: any = [
    {
      id: 0,
      title: "Mr",
      firstName: "Dan",
      lastName: "Brown",
      nickname: "Dan",
      homePhone: "720-555-1234",
      cellPhone: "720-555-6543",
      email: "dan.brown@example.com",
    },
    {
      id: 1,
      title: "Mr",
      firstName: "Jerremy",
      lastName: "Mathews",
      nickname: "Jerry",
      homePhone: "720-555-3854",
      cellPhone: "720-555-9743",
      email: "JMathews@example.com",
    },
  ];
  tasks: any = [
    {
      id: 0,
      status: "new",
      job: 0,
      title: "Weed and Deadhead",
      description: "Weed and deadhead the back and side yards",
      notes: "",
      tools: [0, 1, 2],
      materials: [],
    },
    {
      id: 1,
      status: "new",
      job: 0,
      title: "Plant Suculants",
      description: "Plant the suculants in the garden",
      notes: "",
      tools: [0, 1, 2],
      materials: [2],
    },
  ];
  tools: any = [
    {
      name: "Weeding Tool",
      image:
        "https://www.gardenersedge.com/images/500/4752.jpg?v=100000227430-2",
      size: "small",
      description: "For pulling up weeds at the root",
    },
    {
      name: "Hand Pruners",
      image:
        "https://p0.pikist.com/photos/117/802/background-isolated-garden-scissors-pruner-shears-secateurs-object-equipment.jpg",
      size: "small",
      description: "For pruning and deadheading",
    },
    {
      name: "Bucket",
      image:
        "https://images.homedepot-static.com/productImages/db7d4968-169c-4360-aece-5fd544701f00/svn/orange-the-home-depot-paint-buckets-lids-05glhd2-c3_1000.jpg",
      size: "medium",
      description: "for collecting debris",
    },
  ];
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
