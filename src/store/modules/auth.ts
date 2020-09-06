import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

import { firestoreAction } from 'vuexfire'
import { db } from '@/firebase/db'

import router from '../../router'
import firebase from 'firebase'
import { User } from '@/models/user'
import { Auth as FirebaseAuth } from '@/firebase/auth'

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  status: string | null = null
  raw: object | null = null
  user: User | null = null
  error: string | null = null

  @Mutation
  setStatus(status: string | null) {
    this.status = status
  }

  @Mutation
  setAuth(payload: any) {
    this.status = payload.status
    this.raw = payload.user
    this.user = payload.user
      ? new User({
          uid: payload.user.uid,
          name: payload.user.displayName,
          email: payload.user.email,
          phone: payload.user.phoneNumber,
          photoURL: payload.user.photoURL,
          providers: payload.user.providerData,
          active: payload.user.emailVerified,
        })
      : null
    this.error = payload.error
  }

  @Action({ rawError: true })
  async signOutAction() {
    let t = this
    t.context.commit('setAuth', {
      status: 'success',
      token: null,
      user: null,
      error: null,
    })
    await firebase
      .auth()
      .signOut()
      .then((response) => {
        if (router.currentRoute.name !== 'auth') router.push('auth')
      })
      .catch((error) => {
        t.context.commit('setAuth', {
          status: 'failure',
          token: null,
          user: null,
          error: error,
        })
      })
  }

  @Action({ rawError: true })
  syncAuth() {
    let t = this
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user: any) {
        if (user) {
          t.context.commit('setAuth', {
            status: 'success',
            user: user,
            error: null,
          })
          resolve(true)
        } else {
          t.context.commit('setAuth', {
            status: 'success',
            raw: null,
            error: null,
          })
          resolve(false)
        }
      })
    })
  }

  @Action({ rawError: true })
  signInAction(payload: { email: string; password: string }) {
    this.context.commit('setStatus', 'loading')
    let t = this
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          t.context.commit('setAuth', {
            status: 'success',
            user: response.user,
            token: null,
            error: null,
          })
          resolve()
        })
        .catch((error) => {
          t.context.commit('setAuth', {
            status: 'failure',
            user: null,
            token: null,
            error: error,
          })
          reject(error)
        })
    })
  }

  get isLoggedIn() {
    return this.user !== null
  }
  get getUser() {
    return this.user
  }
  get getUID() {
    return this.user ? this.user.uid : null
  }
  get getStatus() {
    return this.status
  }
  get getJoined() {
    let raw: any = this.raw
    return raw ? raw.metadata.creationTime : null
  }
  get getLastLogin() {
    let raw: any = this.raw
    return raw ? raw.metadata.lastSignInTime : null
  }
  get getError() {
    return this.error
  }
}
