import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

import { Location } from '@/models/location'

@Module({ namespaced: true })
export default class Locations extends VuexModule {
  locations: Array<Location> = []

  @Action({ rawError: true })
  bind() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('locations', db.collection('locations'))
    })
  }
}
