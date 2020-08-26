<template lang="pug">
.action-bar.flex
  template(v-if="running")
    v-spacer
    template(v-if="edit === active.id")
      v-menu(
        ref="menuActive",
        v-model="menu",
        :close-on-content-click="false",
        :nudge-right="40",
        :return-value.sync="time",
        transition="scale-transition",
        offset-y,
        max-width="290px",
        min-width="290px"
      )
        template(v-slot:activator="{ on, attrs }")
          v-text-field(
            v-model="time",
            label="Edit Start Time",
            prepend-icon="mdi-clock",
            readonly,
            v-bind="attrs",
            v-on="on"
          )
          v-btn(icon, @click="cancelEdit")
            v-icon mdi-close
        v-time-picker(
          v-if="menu",
          dark,
          v-model="time",
          full-width,
          @click:minute="updateEntry(active, time)"
        )
    template(v-else)
      h1.ma-4 {{ elapsed }}
      v-btn.mr-6.mt-3(@click="editEntry(active)", icon)
        v-icon mdi-pencil
    v-spacer
  template(v-else)
    v-spacer
    h3 You are off the clock
    v-spacer
  v-fab-transition
    template(v-if="role === 'manager'")
      v-btn(
        fab,
        @click="$emit('newTask')",
        absolute,
        bottom,
        right,
        dark,
        color="blue"
      )
        v-icon(large) mdi-plus
    template(v-else)
      v-btn(
        v-if="!running",
        @click="startClock(); selectTask()",
        fab,
        absolute,
        bottom,
        right,
        dark,
        color="red"
      )
        v-icon(large) mdi-timer
      v-btn(
        v-else,
        @click="stopClock(active)",
        fab,
        absolute,
        bottom,
        right,
        dark,
        color="red"
      )
        v-icon(large) mdi-stop
  v-alert(v-if="!!error", type="error") {{ error }}
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, isBefore, isAfter, intervalToDuration } from "date-fns";

export default {
  name: "ActionBar",
  data: () => ({
    role: "manager",
    edit: "",
    time: "",
    menu: false,
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
    editEntry(entry) {
      this.error = "";
      this.edit = entry.id;
      this.time = entry.start.toDate();
      if (entry.end !== undefined) this.endTime = entry.end.toDate();
    },
    updateEntry(entry, time) {
      this.error = "";
      let old = entry.start.toDate();
      let newDateString =
        format(old, "P ") + time + ":" + format(old, "ss OOOO");
      let newValue = new Date(newDateString);
      let end = entry.end === undefined ? new Date() : entry.end.toDate();
      if (isBefore(newValue, end)) {
        this.$store.dispatch("timeclock/updateEntry", {
          id: this.edit,
          update: {
            start: newValue,
            duration: intervalToDuration({ start: newValue, end: end }),
          },
        });
      } else this.error = "Start must come before end";
      this.edit = "";
      this.time = "";
    },
    cancelEdit() {
      this.error = "";
      this.edit = "";
      this.time = "";
    },
    selectTask() {
      console.log("Select Task");
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
