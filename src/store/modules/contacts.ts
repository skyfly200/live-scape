import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { Contact } from "@/models/contact";

@Module
export default class Contacts extends VuexModule {
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
}
