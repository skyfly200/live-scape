<template lang="pug">
  v-card.login
    v-card-title Login or Register below
    v-card-text
      #firebaseui-auth-container
      #loader(v-if="loading")
        v-progress-circular(indeterminate)
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import { Auth } from "@/firebase/auth";
var firebaseui = require("firebaseui");

export default {
  name: "Login",
  data: function() {
    return {
      loading: true,
      uiConfig: {
        callbacks: {
          signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
          uiShown: this.uiShown,
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "dash",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        //tosUrl: "https://www.privacypolicyonline.com/live.php?token=jhi7M6yy2nbhExzhhJczTtBUDCEBSvRn",
        // Privacy policy url.
        //privacyPolicyUrl: "https://www.privacypolicyonline.com/live.php?token=gpEVPUliE5C9QhXw4amsSM0wpTB1cAKC",
      },
    };
  },
  methods: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      console.log(authResult);
      return false;
    },
    uiShown: function() {
      // The widget is rendered. Hide the loader.
      this.loading = false;
    },
  },
  mounted() {
    let mode = this.$route.query.mode;
    let redirectURL = this.$route.query.redirectURL;
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(Auth);
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", this.uiConfig);
  },
};
</script>
