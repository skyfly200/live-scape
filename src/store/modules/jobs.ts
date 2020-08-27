import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'
import { v4 as uuidv4 } from 'uuid'

import { Job } from '@/models/job'

@Module({ namespaced: true })
export default class Jobs extends VuexModule {
  jobs: Array<Job> = []

  @Action({ rawError: true })
  add(job: any) {
    return db.collection('jobs').add({
      id: uuidv4(),
      location: db.collection('locations').doc(job.location),
      start: job.start,
      end: job.end,
      assigned: job.assigned,
      tasks: job.tasks.map((t: string) => db.collection('tasks').doc(t)),
    })
  }

  @Action({ rawError: true })
  update(payload: any) {
    return db.collection('jobs').doc(payload.id).update(payload.update)
  }

  @Action({ rawError: true })
  delete(id: any) {
    return db.collection('jobs').doc(id).delete()
  }

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('jobs', db.collection('jobs').orderBy('start'))
    }) as Function)(this.context)
  }
}
