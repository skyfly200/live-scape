<template lang="pug">
  v-app#app
    v-navigation-drawer(app two-line v-model="drawer")
      v-list-item(link)
        v-dialog(v-model="loginDialog" width="500")
          template(v-slot:activator="{ on, attrs }")
            v-list-item-avatar
              img(src="https://randomuser.me/api/portraits/men/81.jpg")
            v-list-item-content(v-bind="attrs" v-on="on")
              v-list-item-title(text) Login or Register
          Login
      v-divider
      v-list-item(link to="/" text)
        v-list-item-icon
          v-icon mdi-home
        v-list-item-content
          v-list-item-title Home
    v-app-bar(app)#nav
      v-app-bar-nav-icon(@click="drawer = true")
      v-toolbar-title LiveScape
      v-spacer
      v-text-field(solo-inverted
        flat
        hide-details
        v-model="query"
        label="Search"
        prepend-inner-icon="mdi-magnify")
      .largeMenu
        v-spacer
        v-btn(to="/" text) Home
        v-btn(@click.stop="loginDialog = true" text) Login
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
    drawer: false,
    query: "",
  }),
});
</script>
