<template lang="pug">
.action-btn
  template(v-if="role === 'manager'")
    v-speed-dial(
      v-model="actions",
      absolute,
      open-on-hover,
      direction="top",
      height="100%",
      bottom,
      right
    )
      template(v-slot:activator)
        v-btn(fab, v-model="actions", dark, color="blue")
          v-icon mdi-plus
      v-btn(fab, @click="$emit('newTask')", small, dark, color="green")
        v-icon mdi-clipboard-plus
      v-btn(fab, @click="$emit('newJob')", small, dark, color="purple")
        v-icon mdi-calendar-plus
      v-btn(
        v-if="!running",
        @click="startClock(); selectTask()",
        fab,
        small,
        dark,
        color="red"
      )
        v-icon mdi-timer
      v-btn(v-else, @click="stopClock(active)", fab, small, dark, color="red")
        v-icon mdi-stop
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
      v-icon mdi-timer
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
      v-icon mdi-stop
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { format, isBefore, isAfter, intervalToDuration } from "date-fns";

export default {
  name: "ActionBtn",
  data: () => ({
    role: "manager",
    actions: false,
  }),
  computed: {
    ...mapState("timeclock", ["entries"]),
    running() {
      return this.entries.filter((e) => e.end === undefined).length > 0;
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
