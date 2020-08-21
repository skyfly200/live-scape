<template lang="pug">
  v-card.login
    v-card-title Login or Register below
    v-card-text
      #firebaseui-auth-container
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import { Auth } from "@/firebase/auth";
var firebaseui = require("firebaseui");

export default {
  name: "login",
  mounted: () => {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(Auth);
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById("loader").style.display = "none";
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: "dashboard",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
