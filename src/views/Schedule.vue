<template lang="pug">
  v-container.schedule(fluid)
    v-row
      v-col.controls
        v-btn(fab small absolute left color="primary" @click="$refs.calendar.prev()")
          v-icon(dark) mdi-chevron-left
        v-btn(fab small absolute right color="primary" @click="$refs.calendar.next()")
          v-icon(dark) mdi-chevron-right
        v-select(v-model="type" :items="typeOptions" label="Type" hide-details outlined dense)
    v-row
      v-col
        v-sheet.calendar
          v-calendar(dark ref="calendar" short-intervals short-months short-weekdays color="primary"
            v-model="value"
            :type="type"
            :now="now"
            :events="events"
            :show-interval-label="showIntervalLabel"
            :event-color="getEventColor"
            @change="getEvents")
</template>

<script>
export default {
  name: "Schedule",
  data: () => ({
    value: "",
    now: null,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    type: "week",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
    ],
    interval: { first: 16, minutes: 30, count: 20, height: 48 },
  }),
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this);
    },
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1,
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1,
        }
      );
    },
  },
  methods: {
    viewDay({ date }) {
      this.start = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    showIntervalLabel(interval) {
      return interval.minute === 0;
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          timed: true,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style lang="sass" scoped>
.controls
  position: relative
.calendar
  height: 65vh
</style>
