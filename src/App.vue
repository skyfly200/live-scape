<template lang="pug">
v-app#app
  v-dialog(v-model="dialog", width="500")
    Login(v-if="dialog.type === 'login'", @success="clearDialog")
    TaskForm(v-else-if="dialog.type === 'task'", @done="clearDialog")
  v-navigation-drawer(app, dark, right, two-line, v-model="drawer")
    v-list-item(link)
      template(v-if="isLoggedIn")
        v-list-item-avatar(color="purple")
          v-img(
            v-if="!!raw.additionalUserInfo.profile.picture",
            :src="raw.additionalUserInfo.profile.picture",
            :alt="user.displayName"
          )
          span(v-else) {{ user.displayName.charAt(0).toUpperCase() }}
        v-list-item-content
          v-list-item-title(text) Welcome {{ user.displayName }}
      template(v-else)
      v-list-item-content(@click="setDialog('login')")
        v-list-item-title(text) Login or Register
    v-divider
    v-list-item
      v-list-item-icon
        v-icon mdi-account-star
      v-list-item-content
        v-select(
          :items="roles",
          v-model.lazy="role",
          label="User Role",
          dense,
          outlined,
          hide-details,
          hide-selected
        )
    v-divider
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
    v-list-item(link, to="/schedule", text)
      v-list-item-icon
        v-icon mdi-calendar
      v-list-item-content
        v-list-item-title Schedule
    v-list-item(link, to="/clock", text)
      v-list-item-icon
        v-icon mdi-clock
      v-list-item-content
        v-list-item-title Timeclock
  v-app-bar#nav(app, extended, dark, color="green")
    v-avatar
      v-img.logo(
        src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Leaf_black.svg"
      )
    v-toolbar-title.app-title LiveScape
    v-spacer
    v-text-field(
      solo-inverted,
      flat,
      hide-details,
      v-model="query",
      label="Search",
      prepend-inner-icon="mdi-magnify"
    )
    v-spacer
    .largeMenu
      template(v-if="isLoggedIn")
        v-avatar(color="purple")
          v-img(
            v-if="!!raw.additionalUserInfo.profile.picture",
            :src="raw.additionalUserInfo.profile.picture",
            :alt="user.displayName"
          )
          span(v-else) {{ user.displayName.charAt(0).toUpperCase() }}
      template(v-else)
        v-btn(@click.stop="loginDialog = true", text) Login
    v-app-bar-nav-icon(@click="drawer = !drawer")
    template(v-slot:extension)
      ActionBar(@newTask="setDialog('task')")
  v-main(dark)
    router-view
  v-bottom-navigation(app, shift, grow, dark, color="light-green")
    v-btn(to="/dash")
      span Dash
      v-icon mdi-gauge
    v-btn(to="/jobs")
      span Jobs
      v-icon mdi-notebook
    v-btn(to="/tasks")
      span Tasks
      v-icon mdi-clipboard-check
    v-btn(to="/schedule")
      span Schedule
      v-icon mdi-calendar
    v-btn(to="/clock")
      span Clock
      v-icon mdi-clock
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import TaskForm from "@/components/TaskForm.vue";
import ActionBar from "@/components/ActionBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Login,
    ActionBar,
    TaskForm,
  },
  computed: {
    ...mapState("auth", ["status", "raw", "user"]),
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  created() {
    this.$store.dispatch("bindJobs");
    this.$store.dispatch("taskSys/bindTasks");
    this.$store.dispatch("bindLocations");
    this.$store.dispatch("bindContacts");
    this.$store.dispatch("bindTools");
    this.$store.dispatch("bindMaterials");
    this.$store.dispatch("timeclock/bind");
  },
  methods: {
    clearDialog() {
      this.dialog = {
        state: false,
        type: "",
      };
    },
    setDialog(type: string) {
      this.dialog = {
        state: true,
        type: type,
      };
      this.drawer = false;
    },
  },
  data: () => ({
    role: "manager",
    roles: ["admin", "manager", "contractor"],
    dialog: {
      state: false,
      type: "",
    },
    drawer: false,
    query: "",
  }),
});
</script>

<style lang="sass">
#app
  background-color: #121212
.logo
  transform: rotate(330deg) scale(0.8)
  filter: invert(1)
.app-title
  font-size: 1.4rem !important
  padding-left: 0.25rem
.v-input--selection-controls
  margin-top: 0 !important
</style>
