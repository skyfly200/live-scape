<template lang="pug">
  v-app#app
    v-navigation-drawer(app)
    v-app-bar(app)#nav
      v-app-bar-nav-icon
      v-toolbar-title LiveScape
      v-spacer
      v-btn(to="/" text) Home
      v-dialog(v-model="loginDialog" width="500")
          template(v-slot:activator="{ on, attrs }")
            v-btn(v-bind="attrs" v-on="on" text) Login
          Login
      v-btn(icon)
        v-icon mdi-help
    v-main
      v-container(fluid)
        router-view
    v-footer(app)
      p Copyright Polytope Solutions 2020
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/Login.vue";

export default Vue.extend({
  name: "App",

  components: {
    Login,
  },

  data: () => ({
    loginDialog: false,
  }),
});
</script>
