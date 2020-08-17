<template lang="pug">
  .home
    v-card(dark)
      v-card-title Error 404 - Page not found
      v-card-actions
        v-btn(to="/") Back to Home
</template>

<script>
export default {
  name: "Home",
};
</script>
