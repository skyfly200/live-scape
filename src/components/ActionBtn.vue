<template lang="pug">
.action-btn
  template(v-if="role === 'manager'")
    v-speed-dial(v-model="actions", fixed, direction="left", bottom, right)
      template(v-slot:activator)
        v-btn(
          fab,
          v-model="actions",
          absolute,
          bottom,
          right,
          dark,
          color="blue"
        )
          v-icon(large) mdi-plus
      v-btn(
        fab,
        @click="$emit('newTask')",
        absolute,
        bottom,
        right,
        dark,
        color="green"
      )
        v-icon(large) mdi-clipboard-plus
      v-btn(
        fab,
        @click="$emit('newJob')",
        absolute,
        bottom,
        right,
        dark,
        color="purple"
      )
        v-icon(large) mdi-calendar-plus
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
