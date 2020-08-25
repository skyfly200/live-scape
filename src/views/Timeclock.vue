<template lang="pug">
v-container.timeclock(fluid)
  v-card(dark)
    v-card-title Time Clock
    v-card-text.flex.center
      template(v-if="running")
        h1.ma-4 {{ elapsed }}
        v-btn.mr-6(@click="edit = true", icon)
          v-icon mdi-pencil
        v-spacer
        v-btn(@click="stopClock(active)", fab, color="red")
          v-icon(large) mdi-stop
      template(v-else)
        v-spacer
        v-btn(@click="startClock", fab, color="red")
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
            tr(v-for="e in entries", :key="e.id")
              td {{ e.start.toDate() }}
              template(v-if="e.end === undefined")
                td {{ now }}
                td {{ elapsed }}
                td
                  v-btn(@click="stopClock(e)", icon)
                    v-icon(color="red") mdi-stop
              template(v-else)
                td {{ e.end.toDate() }}
                td {{ formatDuration(e.duration) }}
                td
                  v-btn(icon)
                    v-icon mdi-pencil
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, intervalToDuration } from "date-fns";

export default {
  data: () => ({
    edit: false,
    timer: null,
    now: "",
    elapsed: "",
  }),
  mounted: function () {
    this.timer = setInterval(() => {
      this.now = new Date();
      if (this.active !== undefined)
        this.elapsed = this.formatDuration(
          intervalToDuration({
            start: new Date(this.active.start.toDate()),
            end: this.now,
          })
        );
    }, 250);
  },
  unmounted: function () {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState("timeclock", ["entries"]),
    ...mapGetters("timeclock", ["totalAll"]),
    running() {
      return this.entries.filter((e) => e.end === undefined).length > 0;
    },
    active() {
      return this.entries.filter((e) => e.end === undefined)[0];
    },
  },
  methods: {
    ...mapActions("timeclock", ["startClock", "stopClock"]),
    formatDuration(duration) {
      return [duration.hours, duration.minutes, duration.seconds]
        .map((p) => p.toString().padStart(2, "0"))
        .join(":");
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
