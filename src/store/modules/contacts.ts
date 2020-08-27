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
  contacts: Array<Contact> = [
    new Contact({
      id: 0,
      title: 'Mr',
      firstName: 'Dan',
      lastName: 'Brown',
      nickname: 'Dan',
      homePhone: '720-555-1234',
      cellPhone: '720-555-6543',
      email: 'dan.brown@example.com',
    }),
    new Contact({
      id: 1,
      title: 'Mr',
      firstName: 'Jerremy',
      lastName: 'Mathews',
      nickname: 'Jerry',
      homePhone: '720-555-3854',
      cellPhone: '720-555-9743',
      email: 'JMathews@example.com',
    }),
  ]

  @Action({ rawError: true })
  bind() {
    firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('contact', db.collection('contacts'))
    })
  }
}
