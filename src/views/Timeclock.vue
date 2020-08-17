<template lang="pug">
.timeclock
  v-card
    v-card-title Time Clock
    v-card-text.flex.center
      h1.ma-4 {{ elapsed }}
      template(v-if="start")
        v-btn(@click="edit = true" icon).mr-6
          v-icon mdi-pencil
        v-spacer
        v-btn(@click="stopClock" fab color="red")
          v-icon(large) mdi-stop
      template(v-else)
        v-spacer
        v-btn(@click="startClock" fab color="green")
          v-icon(large) mdi-play
  v-card.mt-3
    v-card-title Entries
    v-card-text
      v-simple-table
        template(v-slot:default)
          thead
            tr
              th.text-left Start
              th.text-left Stop
              th.text-left Duration
              th.text-right Controls
          tbody
            tr(v-if="start" key="new")
              td {{ start }}
              td {{ new Date() }}
              td {{ elapsed }}
              td
                v-btn(@click="stopClock" icon)
                  v-icon(color="red") mdi-stop
            tr(v-for="e,i in entries" :key="i")
              td {{ e.start }}
              td {{ e.end }}
              td {{ e.duration }}
              td
                v-btn(icon)
                  v-icon mdi-pencil
</template>

<script>
import { format, formatDuration, intervalToDuration } from "date-fns";

export default {
  data: () => ({
    edit: false,
    start: null,
    timer: null,
    elapsed: "",
    entries: [],
  }),
  methods: {
    startClock() {
      this.start = new Date();
      this.timer = window.setInterval(this.tick, 500);
    },
    stopClock() {
      let entry = {
        start: this.start,
        end: new Date(),
      };
      entry.duration = formatDuration(intervalToDuration(entry));
      if (entry.duration !== "") this.entries.unshift(entry);
      window.clearInterval(this.timer);
      this.start = null;
      this.timer = null;
      this.elapsed = "";
    },
    tick() {
      this.elapsed = formatDuration(
        intervalToDuration({
          start: this.start,
          end: new Date(),
        })
      );
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
