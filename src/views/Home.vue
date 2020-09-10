<template lang="pug">
v-container.home(fluid)
  v-card(dark)
    v-card-title Welcome to LiveScape
    v-card-text
      ul
        li Co-ordinate Sub Contractors
        li Schedule Jobs
        li Log Hours Worked
        li Record Tasks Completed
    v-card-actions
      v-spacer
      v-btn(
        v-if="!isLoggedIn",
        @click="$emit('signIn')",
        large,
        color="primary"
      ) Sign In
      v-spacer
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
};
</script>
