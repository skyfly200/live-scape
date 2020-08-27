<template lang="pug">
v-container.schedule(fluid)
  v-row
    v-col
      v-select(
        v-model="type",
        :items="typeOptions",
        label="Type",
        dark,
        hide-details,
        outlined,
        dense
      )
    v-col
      v-btn(outlined, dark, @click="addJob") Add A Job
  v-row
    v-col.controls
      v-btn(
        fab,
        small,
        absolute,
        left,
        color="primary",
        @click="$refs.calendar.prev()"
      )
        v-icon(dark) mdi-chevron-left
      v-btn(
        fab,
        small,
        absolute,
        right,
        color="primary",
        @click="$refs.calendar.next()"
      )
        v-icon(dark) mdi-chevron-right
  v-row
    v-col
      v-sheet.calendar
        v-calendar(
          dark,
          ref="calendar",
          short-intervals,
          short-months,
          short-weekdays,
          color="primary",
          v-model="value",
          :type="type",
          :now="now",
          :events="events",
          :first-interval="intervals.first",
          :interval-minutes="intervals.minutes",
          :interval-count="intervals.count",
          :interval-height="intervals.height",
          :show-interval-label="showIntervalLabel",
          :event-color="getEventColor"
        )
</template>

<script>
import { mapState } from "vuex";
import { add } from "date-fns";

export default {
  name: "Schedule",
  computed: {
    ...mapState([
      "taskSys",
      ["tasks"],
      "location",
      ["locations"],
      "contacts",
      ["contacts"],
      "tools",
      ["tools"],
      "materials",
      ["materials"],
      "jobs",
      ["jobs"],
    ]),
  },
  mounted() {
    this.events = this.jobs.jobs.map((j) => ({
      name: j.location.title,
      description: "Tasks: " + j.tasks.length,
      start: j.start.toDate(),
      end: j.end.toDate(),
      timed: true,
      color: "purple",
    }));
  },
  data() {
    return {
      value: "",
      now: null,
      type: "week",
      events: [],
      typeOptions: [
        { text: "Day", value: "day" },
        { text: "4 Day", value: "4day" },
        { text: "Week", value: "week" },
        { text: "Month", value: "month" },
      ],
      intervals: { first: 5, minutes: 60, count: 15, height: 48 },
    };
  },
  methods: {
    addJob() {
      this.$emit("newJob");
    },
    viewDay({ date }) {
      this.value = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    showIntervalLabel(interval) {
      return interval.minute === 0 && interval.hour % 2 === 0;
    },
  },
};
</script>

<style lang="sass" scoped>
.controls
  position: relative
.calendar
  height: 60vh
</style>
