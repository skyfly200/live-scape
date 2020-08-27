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
  addJob(job: any) {
    return db.collection('jobs').add({
      id: uuidv4(),
      location: job.location,
      start: job.start,
      end: job.end,
      assigned: job.assigned,
      tasks: job.tasks,
    })
  }

  @Action({ rawError: true })
  updateJob(payload: any) {
    return db.collection('jobs').doc(payload.id).update(payload.update)
  }

  @Action({ rawError: true })
  deleteJob(id: any) {
    return db.collection('jobs').doc(id).delete()
  }

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('jobs', db.collection('jobs'))
    }) as Function)(this.context)
  }
}
