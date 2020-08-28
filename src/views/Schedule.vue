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
          :event-color="getEventColor",
          @click:event="showEvent"
        )
        v-menu(
          v-model="selectedOpen",
          :close-on-content-click="false",
          :activator="selectedElement",
          offset-x
        )
          v-card(color="grey lighten-4", min-width="350px", flat)
            v-toolbar(:color="selectedEvent.color", dark)
              v-btn(icon)
                v-icon mdi-pencil
              v-toolbar-title(v-html="selectedEvent.name")
              v-spacer
              v-btn(icon)
                v-icon mdi-dots-vertical
            v-card-text
              p(v-html="selectedEvent.details")
              p {{ selectedEvent.job ? selectedEvent.job.location.address : '' }}
              h5 Assigned: {{ selectedEvent.job ? selectedEvent.job.location.assigned : '' }}
            v-card-actions
              v-btn(text, color="secondary", @click="selectedOpen = false") Cancel
              v-spacer
              v-btn(
                text,
                v-if="selectedEvent.job",
                color="secondary",
                :to="'/jobs/' + selectedEvent.job.id"
              ) View Job
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
    this.events = this.jobs.jobs.map((j, i) => ({
      job: j,
      name: i + " - " + j.location.title,
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
      intervals: { first: 0, minutes: 60, count: 15, height: 48 },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },
  methods: {
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
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
