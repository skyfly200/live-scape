import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

import { Material } from '@/models/material'

@Module({ namespaced: true })
export default class Materials extends VuexModule {
  materials: Array<Material> = []

  @Action({ rawError: true })
  bind() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('materials', db.collection('materials'))
    })
  }
}
