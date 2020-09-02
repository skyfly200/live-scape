<template lang="pug">
v-container.timeclock(fluid)
  v-card.mt-3(dark)
    v-card-title Entries
    v-card-text
      v-alert(
        v-if="!!error",
        type="error",
        v-model="alert",
        dismissible,
        close-icon="mdi-close",
        dense
      ) {{ error }}
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
              template(v-if="edit === e.id")
                td
                  v-menu(
                    ref="menuStart",
                    v-model="menuStart",
                    :close-on-content-click="false",
                    :nudge-right="40",
                    :return-value.sync="startTime",
                    transition="scale-transition",
                    offset-y,
                    max-width="290px",
                    min-width="290px"
                  )
                    template(v-slot:activator="{ on, attrs }")
                      v-text-field(
                        v-model="startTime",
                        label="Edit Start Time",
                        prepend-icon="mdi-clock",
                        readonly,
                        v-bind="attrs",
                        v-on="on"
                      )
                    v-time-picker(
                      v-if="menuStart",
                      dark,
                      v-model="startTime",
                      full-width,
                      @click:minute="updateEntry('start', e, startTime)"
                    )
                td
                  .now(v-if="e.end === undefined") {{ now }}
                  v-menu(
                    v-else,
                    ref="menuEnd",
                    v-model="menuEnd",
                    :close-on-content-click="false",
                    :nudge-right="40",
                    :return-value.sync="endTime",
                    transition="scale-transition",
                    offset-y,
                    max-width="290px",
                    min-width="290px"
                  )
                    template(v-slot:activator="{ on, attrs }")
                      v-text-field(
                        v-model="endTime",
                        label="Edit End Time",
                        prepend-icon="mdi-clock",
                        readonly,
                        v-bind="attrs",
                        v-on="on"
                      )
                    v-time-picker(
                      v-if="menuEnd",
                      dark,
                      v-model="endTime",
                      full-width,
                      @click:minute="updateEntry('end', e, endTime)"
                    )
                td {{ formatDuration(e.duration) }}
                td
                  v-btn(icon, @click="cancelEdit")
                    v-icon mdi-close
              template(v-else-if="e.end === undefined")
                td {{ friendlyTime(e.start.toDate()) }}
                td {{ friendlyTime(now) }}
                td {{ elapsed }}
                td
                  v-btn(@click="stopClock(e)", icon)
                    v-icon(color="red") mdi-stop
              template(v-else)
                td {{ friendlyTime(e.start.toDate()) }}
                td {{ friendlyTime(e.end.toDate()) }}
                td {{ formatDuration(e.duration) }}
                td
                  v-btn(@click="editEntry(e)", icon)
                    v-icon mdi-pencil
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, isBefore, isAfter, intervalToDuration } from "date-fns";

export default {
  data: () => ({
    edit: "",
    startTime: "",
    endTime: "",
    menuStart: false,
    menuEnd: false,
    alert: false,
    error: "",
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
    friendlyTime(time) {
      return format(time, "PPPPpp");
    },
    editEntry(entry) {
      this.edit = entry.id;
      this.startTime = entry.start.toDate();
      if (entry.end !== undefined) this.endTime = entry.end.toDate();
    },
    setError(msg) {
      this.error = msg;
      this.alert = true;
    },
    updateEntry(prop, entry, time) {
      if (prop === "start") {
        let old = entry.start.toDate();
        let newDateString =
          format(old, "P ") + time + ":" + format(old, "ss OOOO");
        let newValue = new Date(newDateString);
        let end = entry.end === undefined ? new Date() : entry.end.toDate();
        if (isBefore(newValue, new Date())) {
          if (isBefore(newValue, end)) {
            this.$store.dispatch("timeclock/updateEntry", {
              id: this.edit,
              update: {
                start: newValue,
                duration: intervalToDuration({ start: newValue, end: end }),
              },
            });
          } else this.setError("Start must come before end");
        } else this.setError("Start must be in the past");
      } else {
        let old = entry.end.toDate();
        let newDateString =
          format(old, "P ") + time + ":" + format(old, "ss OOOO");
        let newValue = new Date(newDateString);
        if (isAfter(newValue, entry.start.toDate())) {
          if (isBefore(newValue, new Date())) {
            this.$store.dispatch("timeclock/updateEntry", {
              id: this.edit,
              update: {
                end: newValue,
                duration: intervalToDuration({
                  start: entry.start.toDate(),
                  end: newValue,
                }),
              },
            });
          } else this.setError("End must be in the past");
        } else this.setError("End must come after start");
      }
      this.edit = "";
      this.startTime = "";
      this.endTime = "";
    },
    cancelEdit() {
      this.error = "";
      this.alert = false;
      this.edit = "";
      this.startTime = "";
      this.endTime = "";
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
