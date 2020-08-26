<template lang="pug">
.datetime.d-flex
  .date
    v-menu(
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
        dark,
        v-model="date",
        full-width,
        @click:date="dateMenu = false"
      )
  .time
    v-menu(
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
        @click:minute="timeMenu = false"
      )
</template>

<script>
import { add } from "date-fns";

export default {
  name: "DateTime",
  methods: {},
  data: () => ({
    date: "",
    time: "",
    dateMenu: false,
    timeMenu: false,
  }),
};
</script>
