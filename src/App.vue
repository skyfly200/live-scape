<template lang="pug">
v-app#app
  v-navigation-drawer(app, right, two-line, v-model="drawer")
    v-list-item(link)
      v-dialog(v-model="loginDialog", width="500")
        template(v-slot:activator="{ on, attrs }")
          v-list-item-avatar
            img(src="https://randomuser.me/api/portraits/men/81.jpg")
          v-list-item-content(v-bind="attrs", v-on="on")
            v-list-item-title(text) Login or Register
        Login
    v-divider
    v-list-item(link, to="/", text)
      v-list-item-icon
        v-icon mdi-home
      v-list-item-content
        v-list-item-title Home
    v-list-item(link, to="/dash", text)
      v-list-item-icon
        v-icon mdi-desk
      v-list-item-content
        v-list-item-title Dashboard
    v-list-item(link, to="/jobs", text)
      v-list-item-icon
        v-icon mdi-notebook
      v-list-item-content
        v-list-item-title Jobs
    v-list-item(link, to="/tasks", text)
      v-list-item-icon
        v-icon mdi-clipboard-check
      v-list-item-content
        v-list-item-title Tasks
    v-list-item(link, to="/clock", text)
      v-list-item-icon
        v-icon mdi-clock
      v-list-item-content
        v-list-item-title Timeclock
  v-app-bar#nav(app)
    v-toolbar-title LiveScape
    v-spacer
    v-text-field(
      solo-inverted,
      flat,
      hide-details,
      v-model="query",
      label="Search",
      prepend-inner-icon="mdi-magnify"
    )
    .largeMenu
      v-spacer
      template(v-if="!loggedIn")
        v-btn(@click.stop="loginDialog = true", text) Login
    v-app-bar-nav-icon(@click="drawer = !drawer")
  v-main
    v-container(fluid)
      router-view
  v-bottom-navigation(app)
    v-btn(to="dash")
      span Dash
      v-icon mdi-desk
    v-btn(to="jobs")
      span Jobs
      v-icon mdi-notebook
    v-btn(to="tasks")
      span Tasks
      v-icon mdi-clipboard-check
    v-btn(to="clock")
      span Clock
      v-icon mdi-clock
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
    loggedIn: true,
    loginDialog: false,
    drawer: false,
    query: "",
  }),
});
</script>
