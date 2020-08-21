<template lang="pug">
  v-container.schedule(fluid)
    v-row
      v-col
        v-select(v-model="type" :items="typeOptions" label="Type" dark hide-details outlined dense)
      v-col
        v-btn(outlined dark) Add A Job
    v-row
      v-col.controls
        v-btn(fab small absolute left color="primary" @click="$refs.calendar.prev()")
          v-icon(dark) mdi-chevron-left
        v-btn(fab small absolute right color="primary" @click="$refs.calendar.next()")
          v-icon(dark) mdi-chevron-right
    v-row
      v-col
        v-sheet.calendar
          v-calendar(dark ref="calendar" short-intervals short-months short-weekdays color="primary"
            v-model="value"
            :type="type"
            :now="now"
            :events="events"
            :show-interval-label="showIntervalLabel"
            :event-color="getEventColor")
</template>

<script>
export default {
  name: "Schedule",
  data: () => ({
    value: "",
    now: null,
    events: [
      {
        name: "Test 123",
        start: new Date(),
        timed: true,
        color: "purple",
      },
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
  methods: {
    viewDay({ date }) {
      this.value = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    showIntervalLabel(interval) {
      return interval.minute === 0;
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
