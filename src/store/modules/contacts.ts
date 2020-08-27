import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

import { Contact } from '@/models/contact'

@Module({ namespaced: true })
export default class Contacts extends VuexModule {
  contacts: Array<Contact> = []

  @Action({ rawError: true })
  bind() {
    return (firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('contacts', db.collection('contacts'))
    }) as Function)(this.context)
  }
}
