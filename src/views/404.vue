<template lang="pug">
v-container.home(fluid, center)
  v-card(dark, min-width="300", max-width="500", style="margin: 30vh auto")
    v-card-title Error 404
    v-card-text The page {{ $route.path }} dosn't exist
    v-card-actions
      v-btn(v-if="isLoggedIn", to="/dash") Dashboard
      v-btn(v-else, to="/") Home
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
