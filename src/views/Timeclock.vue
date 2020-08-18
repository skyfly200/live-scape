<template lang="pug">
v-container.timeclock(fluid)
  v-card(dark)
    v-card-title Time Clock
    v-card-text.flex.center
      template(v-if="running")
        h1.ma-4 {{ elapsed }}
        v-btn(@click="edit = true" icon).mr-6
          v-icon mdi-pencil
        v-spacer
        v-btn(@click="stopClock" fab color="red")
          v-icon(large) mdi-stop
      template(v-else)
        v-spacer
        v-btn(@click="startClock" fab color="red")
          v-icon(large) mdi-timer
  v-card.mt-3(dark)
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
            tr(v-for="e in sorted" :key="e.id")
              td {{ e.start }}
              template(v-if="e.end === undefined")
                td {{ now }}
                td {{ elapsed }}
                td
                  v-btn(@click="stopClock" icon)
                    v-icon(color="red") mdi-stop
              template(v-else)
                td {{ e.end }}
                td {{ formatDuration(e.duration) }}
                td
                  v-btn(icon)
                    v-icon mdi-pencil
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, formatDuration, intervalToDuration } from "date-fns";

export default {
  data: () => ({
    edit: false,
    timer: null,
    now: "",
    elapsed: "",
  }),
  mounted: function() {
    this.timer = setInterval(() => {
      this.now = new Date();
      if (this.active !== null)
        this.elapsed = formatDuration(
          intervalToDuration({
            start: this.entries[this.active].start,
            end: this.now,
          })
        );
    }, 250);
  },
  unmounted: function() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState("timeclock", ["entries", "running", "active"]),
    ...mapGetters("timeclock", ["totalAll"]),
    sorted() {
      return Object.values(this.entries).sort((a, b) => b.start - a.start);
    },
  },
  methods: {
    ...mapActions("timeclock", ["startClock", "stopClock"]),
    formatDuration: formatDuration,
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
