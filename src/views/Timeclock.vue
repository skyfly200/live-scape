<template lang="pug">
.timeclock
  v-card
    v-card-title Time Clock
    v-card-text
      h1.my-4 {{ elapsed }}
      v-btn(@click="logTime") {{ running ? 'Clock Out' : 'Clock In' }}
</template>

<script>
import { formatDuration, intervalToDuration } from "date-fns";

export default {
  data: () => ({
    running: false,
    entries: [],
  }),
  computed: {
    elapsed: function() {
      let count = this.entries.length;
      if (count === 0) return "00:00:00";
      return formatDuration(
        intervalToDuration({
          start: this.entries[count - 1].time,
          end: new Date(),
        })
      );
    },
  },
  methods: {
    logTime() {
      this.running = !this.running;
      let log = {
        state: this.running,
        time: new Date(),
      };
      this.entries.push(log);
    },
  },
};
</script>

<style lang="sass" scoped>
.flex
  display: flex
  width: 100%
.center
  align-items: center
  text-align: center
</style>
