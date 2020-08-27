import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

import { Tool } from '@/models/tool'

@Module({ namespaced: true })
export default class Tools extends VuexModule {
  tools: Array<Tool> = []

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('tools', db.collection('tools'))
    }) as Function)(this.context)
  }
}
