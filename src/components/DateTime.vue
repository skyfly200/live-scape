<template lang="pug">
.datetime.d-flex
  .date
    v-menu(
      ref="dateMenu",
      v-model="dateMenu",
      :close-on-content-click="false",
      :nudge-right="40",
      :return-value.sync="date",
      transition="scale-transition",
      offset-y,
      max-width="290px",
      min-width="290px"
    )
      template(v-slot:activator="{ on, attrs }")
        v-text-field(
          v-model="date",
          label="Date",
          prepend-icon="mdi-calendar",
          readonly,
          v-bind="attrs",
          v-on="on"
        )
      v-date-picker(
        v-if="dateMenu",
        v-model="date",
        dark,
        scrollable,
        no-title,
        full-width,
        @click:date="setDate(date)"
      )
  .time
    v-menu(
      ref="timeMenu",
      v-model="timeMenu",
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
          label="Time",
          prepend-icon="mdi-clock",
          readonly,
          v-bind="attrs",
          v-on="on"
        )
      v-time-picker(
        v-if="timeMenu",
        dark,
        v-model="time",
        full-width,
        @click:minute="setTime(time)"
      )
</template>

<script>
import { formatISO } from "date-fns";

export default {
  name: "DateTime",
  methods: {
    setDate(date) {
      this.$refs.dateMenu.save(date);
      this.dateMenu = false;
      this.$emit("change:date", date);
    },
    setTime(time) {
      this.$refs.timeMenu.save(time);
      this.timeMenu = false;
      this.$emit("change:time", time);
    },
  },
  props: ["value"],
  data: function () {
    return {
      date: this.value.date,
      time: this.value.time,
      dateMenu: false,
      timeMenu: false,
    };
  },
};
</script>
