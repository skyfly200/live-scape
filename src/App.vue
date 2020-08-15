<template lang="pug">
  v-app#app
    v-navigation-drawer(app)
    v-app-bar(app)#nav
      v-app-bar-nav-icon
      v-toolbar-title LiveScape
      v-spacer
      v-btn(to="/" text) Home
      v-btn(to="/login" text) Login
      v-btn(icon)
        v-icon mdi-help
    v-main
      v-container(fluid)
        router-view
        Login
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
    //
  }),
});
</script>
