<template lang="pug">
.action-btn
  template(v-if="role === 'manager'")
    v-speed-dial(
      v-model="actions",
      fixed,
      direction="top",
      height="100%",
      bottom,
      right
    )
      template(v-slot:activator)
        v-btn(fab, v-model="actions", dark, color="blue")
          v-icon mdi-plus
      v-tooltip(v-for="action in speedDial", left)
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            fab,
            @click="$emit(action.event)",
            small,
            dark,
            v-bind="attrs",
            v-on="on",
            :color="action.color"
          )
            v-icon {{ action.icon }}
        span {{ action.tooltip }}
      v-tooltip(left)
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            v-if="!running",
            @click.stop="startClock(); selectTask()",
            fab,
            small,
            dark,
            v-bind="attrs",
            v-on="on",
            color="red"
          )
            v-icon mdi-timer
          v-btn(
            v-else,
            @click.stop="stopClock(active)",
            fab,
            small,
            dark,
            v-bind="attrs",
            v-on="on",
            color="red"
          )
            v-icon mdi-stop
        span {{ running ? 'Stop Timeclock' : 'Start Timeclock' }}
  template(v-else)
    v-tooltip(left)
      template(v-slot:activator="{ on, attrs }")
        v-btn(
          v-if="!running",
          @click.stop="startClock(); selectTask()",
          fab,
          small,
          dark,
          v-bind="attrs",
          v-on="on",
          color="red"
        )
          v-icon mdi-timer
        v-btn(
          v-else,
          @click.stop="stopClock(active)",
          fab,
          small,
          dark,
          v-bind="attrs",
          v-on="on",
          color="red"
        )
          v-icon mdi-stop
      span {{ running ? 'Stop Timeclock' : 'Start Timeclock' }}
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, isBefore, isAfter, intervalToDuration } from "date-fns";

export default {
  name: "ActionBtn",
  data: () => ({
    role: "manager",
    actions: false,
    speedDial: [
      {
        event: "newTask",
        icon: "mdi-clipboard-plus",
        color: "green",
        tooltip: "New Task",
      },
      {
        event: "newJob",
        icon: "mdi-calendar-plus",
        color: "purple",
        tooltip: "New Job",
      },
    ],
  }),
  computed: {
    ...mapState("timeclock", ["entries"]),
    running() {
      return this.entries.filter((e) => e.end === undefined).length > 0;
    },
    active() {
      return this.entries.filter((e) => e.end === undefined)[0];
    },
  },
  methods: {
    ...mapActions("timeclock", ["startClock", "stopClock"]),
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
