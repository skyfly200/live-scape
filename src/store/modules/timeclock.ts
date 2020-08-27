import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { format, formatDuration, intervalToDuration } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/firebase/db'
import { Auth } from '@/firebase/auth'

import { TimeclockEntries } from '@/models/timeclockEntries'

@Module({ namespaced: true })
export default class Timeclock extends VuexModule {
  entries: any = []

  @Action({ rawError: true })
  startClock() {
    return db.collection('entries').add({
      id: uuidv4(),
      user: Auth.currentUser.uid,
      start: new Date(),
    })
  }

  @Action({ rawError: true })
  stopClock(entry: TimeclockEntries) {
    let interval = {
      start: new Date(entry.start.toDate()),
      end: new Date(),
    }
    let entryUpdate = {
      id: entry.id,
      ...interval,
      duration: intervalToDuration(interval),
    }
    if (entryUpdate.duration !== '')
      return db.collection('entries').doc(entry.id).set(entryUpdate)
  }

  @Action({ rawError: true })
  updateEntry(payload: { id: string; update: any }) {
    return db.collection('entries').doc(payload.id).update(payload.update)
  }

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'entries',
        db.collection('entries').orderBy('start', 'desc').limit(25),
      )
    }) as Function)(this.context)
  }

  get totalAll() {
    let complete = this.entries.filter((e: any) => !!e.duration)
    return complete.reduce(
      (sum: number, e: any) =>
        sum +
        e.duration.seconds +
        e.duration.minutes * 60 +
        e.duration.hours * 360,
      0,
    )
  }
}
