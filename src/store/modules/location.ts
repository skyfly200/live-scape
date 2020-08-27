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
export default class Location extends VuexModule {
  locations: any = []

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('locations', db.collection('locations'))
    }) as Function)(this.context)
  }
}
