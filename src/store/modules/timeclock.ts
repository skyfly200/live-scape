import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import { firestoreAction } from "vuexfire";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/firebase/db";
import { Auth } from "@/firebase/auth";

import { TimeclockEntries } from "@/models/timeclockEntries";

@Module({ namespaced: true })
export default class Timeclock extends VuexModule {
  entries: any = [];
  running: boolean = false;
  active: string | null = null;

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
    this.context.commit(
      "setEntry",
      new TimeclockEntries({
        id: id,
        start: new Date(),
      })
    );
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
    let entry = new TimeclockEntries({
      id: id,
      user: "",
      ...interval,
      duration: intervalToDuration(interval),
    });
    if (entry.duration !== "") this.context.commit("setEntry", entry);
    this.context.commit("setRunning", false);
    this.context.commit("clearActive");
  }

  @Action({ rawError: true })
  bindEntries() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "entries",
        db
          .collection("entries")
          .where("user", "==", Auth.currentUser.uid)
          .orderBy("start")
      );
    });
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
