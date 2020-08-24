import {
  Module,
  VuexModule,
  Mutation,
  MutationAction,
  Action,
} from "vuex-module-decorators";

import router from "../../router";
import firebase from "firebase";
import { User } from "@/models/user";

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  status: string | null = null;
  raw: object | null = null;
  user: User | null = null;
  error: string | null = null;

  @Mutation
  setStatus(status: string | null) {
    this.status = status;
  }

  @Mutation
  setAuth(payload: any) {
    this.status = payload.status;
    // let isNew = payload.raw.additionalUserInfo.isNewUser;
    this.raw = payload.raw;
    let user = {
      ...payload.raw.user,
      profile: payload.raw.additionalUserInfo.profile,
    };
    this.user = user
      ? new User({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photoURL: user.photoURL,
          providers: user.providerData,
          active: user.emailVerified,
        })
      : null;
    this.error = payload.error;
  }

  @Action({ rawError: true })
  async signOutAction() {
    let t = this;
    t.context.commit("setAuth", {
      status: "success",
      token: null,
      user: null,
      error: null,
    });
    await firebase
      .auth()
      .signOut()
      .then((response) => {
        if (router.currentRoute.name !== "auth") router.push("auth");
      })
      .catch((error) => {
        t.context.commit("setAuth", {
          status: "failure",
          token: null,
          user: null,
          error: error,
        });
      });
  }

  @Action({ rawError: true })
  syncAuth() {
    let t = this;
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user: any) {
        if (user) {
          t.context.commit("setAuth", {
            status: "success",
            token: null,
            user: user,
            error: null,
          });
          resolve(true);
        } else {
          t.context.commit("setAuth", {
            status: "success",
            token: null,
            user: null,
            error: null,
          });
          resolve(false);
        }
      });
    });
  }

  @Action({ rawError: true })
  signInAction(payload: { email: string; password: string }) {
    this.context.commit("setStatus", "loading");
    let t = this;
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          t.context.commit("setAuth", {
            status: "success",
            user: response.user,
            token: null,
            error: null,
          });
          resolve();
        })
        .catch((error) => {
          t.context.commit("setAuth", {
            status: "failure",
            user: null,
            token: null,
            error: error,
          });
          reject(error);
        });
    });
  }

  get isLoggedIn() {
    return !!this.raw;
  }
  get getUser() {
    return this.user;
  }
  get getUID() {
    return this.user ? this.user.uid : null;
  }
  get getStatus() {
    return this.status;
  }
  get getJoined() {
    let raw: any = this.raw;
    return raw ? raw.metadata.creationTime : null;
  }
  get getLastLogin() {
    let raw: any = this.raw;
    return raw ? raw.metadata.lastSignInTime : null;
  }
  get getError() {
    return this.error;
  }
}
