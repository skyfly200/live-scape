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

import { Task } from '@/models/task'

@Module({ namespaced: true })
export default class Tasks extends VuexModule {
  tasks: Array<Task> = []

  @Action({ rawError: true })
  add(task: any) {
    return db.collection('tasks').add({
      id: uuidv4(),
      status: 'new',
      job: task.job,
      location: task.location,
      title: task.title,
      description: task.description,
      notes: task.notes,
      tools: task.tools,
      materials: task.materials,
    })
  }

  @Action({ rawError: true })
  update(payload: any) {
    return db.collection('tasks').doc(payload.id).update(payload.update)
  }

  @Action({ rawError: true })
  delete(id: any) {
    return db.collection('tasks').doc(id).delete()
  }

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('tasks', db.collection('tasks'))
    }) as Function)(this.context)
  }
}
