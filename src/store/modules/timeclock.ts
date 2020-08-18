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

@Module({ namespaced: true, name: "timeclock" })
export default class Timeclock extends VuexModule {
  entries: any = {};

  @Mutation
  setEntry(payload: any) {
    this.entries[payload.id] = payload;
  }

  @Action({ rawError: true })
  startClock() {
    this.context.commit("setEntry", {
      id: uuidv4(),
      start: new Date(),
    });
  }

  @Action({ rawError: true })
  stopClock(id: any) {
    if (
      this.entries === undefined ||
      this.entries[id] === undefined ||
      this.entries[id].start === undefined ||
      this.entries[id].end !== undefined
    )
      return;
    let interval = {
      start: this.entries[id].start,
      end: new Date(),
    };
    let entry = {
      id: id,
      ...interval,
      duration: intervalToDuration(interval),
    };
    if (entry.duration !== "") this.context.commit("setEntry", entry);
  }

  get totalAll() {
    let complete = this.entries.filter((e) => !!e.duration);
    return complete.reduce(
      (sum: number, e: any) => sum + e.duration.getTime(),
      false
    );
  }
}
