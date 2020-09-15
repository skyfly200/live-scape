import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

//import { Location } from '@/models/location'

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: any = []

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('users', db.collection('users'))
    }) as Function)(this.context)
  }
}
