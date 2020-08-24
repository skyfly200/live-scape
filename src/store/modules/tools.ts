import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { Tool } from "@/models/tool";

@Module({ namespaced: true })
export default class Tools extends VuexModule {
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
}
