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
export default class Timeclock extends VuexModule {
  entries: any = {};
  running: boolean = false;
  active: string | null = null;

  @Mutation
  setEntry(payload: any) {
    this.entries[payload.id] = payload;
  }

  @Mutation
  setRunning(running: boolean) {
    this.running = running;
  }

  @Mutation
  setActive(id: string) {
    this.active = id;
  }

  @Mutation
  clearActive() {
    this.active = null;
  }

  @Action({ rawError: true })
  startClock() {
    let id = uuidv4();
    this.context.commit("setEntry", {
      id: id,
      start: new Date(),
    });
    this.context.commit("setRunning", true);
    this.context.commit("setActive", id);
  }

  @Action({ rawError: true })
  stopClock() {
    let id: string = this.active !== null ? this.active : "";
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
      user: "",
      ...interval,
      duration: intervalToDuration(interval),
    };
    if (entry.duration !== "") this.context.commit("setEntry", entry);
    this.context.commit("setRunning", false);
    this.context.commit("clearActive");
  }

  get totalAll() {
    let complete = Object.values(this.entries).filter((e: any) => !!e.duration);
    return complete.reduce(
      (sum: number, e: any) =>
        sum +
        e.duration.seconds +
        e.duration.minutes * 60 +
        e.duration.hours * 360,
      0
    );
  }
}
