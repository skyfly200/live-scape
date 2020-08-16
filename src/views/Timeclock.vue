<template lang="pug">
.timeclock
  v-card
    v-card-title Time Clock
    v-card-text
      v-btn(@click="logTime") {{ running ? 'Clock Out' : 'Clock In' }}
</template>

<script>
export default {
  data: () => ({
    running: false,
    entrtries: [],
  }),
  methods: {
    logTime() {
      let log = {
        state: this.running,
        time: Date(),
      };
      this.running = !this.running;
      this.entrtries.push(log);
    },
  },
};
</script>
