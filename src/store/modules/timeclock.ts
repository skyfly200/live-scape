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

  @Action({ rawError: true })
  async startClock() {
    await db.collection("entries").add(
      new TimeclockEntries({
        id: uuidv4(),
        user: Auth.currentUser.uid,
        start: new Date(),
      })
    );
  }

  @Action({ rawError: true })
  async stopClock(entry: TimeclockEntries) {
    let interval = {
      start: entry.start,
      end: new Date(),
    };
    let entryUpdate = new TimeclockEntries({
      uid: entry.uid,
      ...interval,
      duration: intervalToDuration(interval),
    });
    if (entryUpdate.duration !== "")
      await db
        .collection("entries")
        .doc(entry.uid)
        .set(entryUpdate);
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
    let complete = this.entries.filter((e: any) => !!e.duration);
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
