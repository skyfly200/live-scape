import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from 'vuex-module-decorators'

// import { firestoreAction } from 'vuexfire'
// import { db } from '@/firebase/db'
// import { Auth as FirebaseAuth } from '@/firebase/auth'

import router from '../../router'
import firebase from 'firebase'
import { User } from '@/models/user'
var firebaseui = require('firebaseui')

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  status: string | null = null
  raw: object | null = null
  ui: any = null
  user: User | null = null
  error: string | null = null

  @Mutation
  setStatus(status: string | null) {
    this.status = status
  }

  @Mutation
  setUI(instance: any) {
    this.ui = instance
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
  async init(config: any) {
    let ui
    // check for existing firebaseui auth instance
    if (firebaseui.auth.AuthUI.getInstance()) {
      // retrive the existing instance
      ui = firebaseui.auth.AuthUI.getInstance()
    } else {
      // Initialize the FirebaseUI Widget using Firebase.
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    // The start method will wait until the DOM is loaded.
    const inst = ui.start('#firebaseui-auth-container', config)
    // store the ui instance
    this.context.commit('setUI', inst)
  }

  @Action({ rawError: true })
  async signOut() {
    let t = this
    console.log(this.ui)
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
        if (router.currentRoute.name !== 'home') router.push('/')
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
