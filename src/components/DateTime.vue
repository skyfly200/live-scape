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
        full-width
      )
        v-spacer
        v-btn(text, color="primary", @click="dateMenu = false") Cancel
        v-btn(text, color="primary", @click="$refs.dateMenu.save(date)") OK
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
