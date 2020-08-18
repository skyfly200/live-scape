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
      title: "Dan's",
      address: "1203 Spruce St. Boulder, CO",
      contact: 0,
      notes: [],
    },
    {
      id: 1,
      title: "Jerry's",
      address: "5544 Bluff St. Boulder, CO",
      contact: 1,
      notes: [],
    },
    {
      id: 2,
      title: "Wester Disposal",
      address: "Western Disposal Boulder, CO",
      contact: null,
      notes: [],
    },
  ];
  contacts: any = [
    {
      id: 0,
      title: "Mr",
      firstName: "Dan",
      LastName: "Brown",
      nickname: "Dan",
      homePhone: "720-555-1234",
      cellPhone: "720-555-6543",
      email: "dan.brown@example.com",
    },
    {
      id: 1,
      title: "Mr",
      firstName: "Jerremy",
      LastName: "Mathews",
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
    },
    {
      id: 1,
      status: "new",
      job: 1,
      title: "Plant Suculants",
      description: "Plant the suculants in the garden",
      notes: "",
      tools: [0, 1, 2],
    },
  ];
  jobs: any = [
    {
      id: 0,
      contact: 0,
      notes: ["Close the gate"],
      location: 0,
    },
    {
      id: 1,
      contact: 1,
      notes: ["Don't run the blower"],
      location: 1,
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
    },
    {
      name: "Stone",
    },
  ];
}
