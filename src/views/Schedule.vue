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
      "tasks",
      "locations",
      "contacts",
      "tools",
      "materials",
      "jobs",
    ]),
  },
  data: () => ({
    value: "",
    now: null,
    events: [
      {
        name: "Test 123",
        description: "Testing Job Scheduling",
        start: new Date("8/24/2020 8:00 AM"),
        end: new Date("8/24/2020 12:00 PM"),
        timed: true,
        color: "purple",
      },
      {
        name: "Test 456",
        start: new Date("8/24/2020 12:00 PM"),
        end: new Date("8/24/2020 4:00 PM"),
        timed: true,
        color: "green",
      },
    ],
    type: "week",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
    ],
    intervals: { first: 5, minutes: 60, count: 15, height: 48 },
  }),
  methods: {
    addJob() {
      this.events.push({
        name: "New Job",
        description: "Testing Job Adding",
        start: new Date(),
        end: add(new Date(), { hours: 2 }),
        timed: true,
        color: "purple",
      });
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
