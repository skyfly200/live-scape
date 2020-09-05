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
export default class Clients extends VuexModule {
  clients: any = []

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('clients', db.collection('clients'))
    }) as Function)(this.context)
  }
}
