<template lang="pug">
v-card.job-form.pa-6
  v-card-title Add a Job
  v-card-text
    v-autocomplete(
      label="Location",
      clearable,
      v-model="job.location",
      :items="locations.locations",
      :filter="locationFilter",
      item-text="title",
      item-value="id"
    )
      template(v-slot:item="data")
        v-list-item-content
          v-list-item-title {{ data.item.title }}
          v-list-item-title {{ data.item.address }}
    v-autocomplete(
      label="Assigned",
      clearable,
      chips,
      multiple,
      v-model="job.assigned",
      :items="contractors"
    )
    .datetime
      .start.d-flex
        .start-date
          v-menu(
            v-model="menus.start.date",
            :close-on-content-click="false",
            :nudge-right="40",
            :return-value.sync="job.start.date",
            transition="scale-transition",
            offset-y,
            max-width="290px",
            min-width="290px"
          )
            template(v-slot:activator="{ on, attrs }")
              v-text-field(
                v-model="job.start.date",
                label="Start Date",
                prepend-icon="mdi-calendar",
                readonly,
                v-bind="attrs",
                v-on="on"
              )
            v-date-picker(
              v-if="menus.start.date",
              dark,
              v-model="job.start.date",
              full-width,
              @click:date="menus.start.date = false"
            )
        .start-time
          v-menu(
            v-model="menus.start.time",
            :close-on-content-click="false",
            :nudge-right="40",
            :return-value.sync="job.start.time",
            transition="scale-transition",
            offset-y,
            max-width="290px",
            min-width="290px"
          )
            template(v-slot:activator="{ on, attrs }")
              v-text-field(
                v-model="job.start.time",
                label="Start Time",
                prepend-icon="mdi-clock",
                readonly,
                v-bind="attrs",
                v-on="on"
              )
            v-time-picker(
              v-if="menus.start.time",
              dark,
              v-model="job.start.time",
              full-width,
              @click:minute="menus.start.time = false"
            )
      .end.d-flex
        .end-date
          v-menu(
            v-model="menus.end.date",
            :close-on-content-click="false",
            :nudge-right="40",
            :return-value.sync="job.end.date",
            transition="scale-transition",
            offset-y,
            max-width="290px",
            min-width="290px"
          )
            template(v-slot:activator="{ on, attrs }")
              v-text-field(
                v-model="job.end.date",
                label="End Date",
                prepend-icon="mdi-calendar",
                readonly,
                v-bind="attrs",
                v-on="on"
              )
            v-date-picker(
              v-if="menus.end.date",
              dark,
              v-model="job.end.date",
              full-width,
              @click:date="menus.end.date = false"
            )
        .end-time
          v-menu(
            v-model="menus.end.time",
            :close-on-content-click="false",
            :nudge-right="40",
            :return-value.sync="job.end.time",
            transition="scale-transition",
            offset-y,
            max-width="290px",
            min-width="290px"
          )
            template(v-slot:activator="{ on, attrs }")
              v-text-field(
                v-model="job.end.time",
                label="End Time",
                prepend-icon="mdi-clock",
                readonly,
                v-bind="attrs",
                v-on="on"
              )
            v-time-picker(
              v-if="menus.end.time",
              dark,
              v-model="job.end.time",
              full-width,
              @click:minute="menus.end.time = false"
            )
  v-card-actions
    v-spacer
    v-btn(@click="clear", color="red", outlined) Clear
    v-btn(@click="cancel", color="red") Cancel
    v-btn(@click="add", color="green") Add
</template>

<script>
import { mapState } from "vuex";
import { add } from "date-fns";

export default {
  name: "JobForm",
  computed: {
    ...mapState([
      "tasks",
      "locations",
      ["locations"],
      "contacts",
      "tools",
      "materials",
      "jobs",
    ]),
  },
  methods: {
    locationFilter(item, queryText, itemText) {
      const textOne = item.title.toLowerCase();
      const textTwo = item.address.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    add() {
      this.$emit("done");
    },
    cancel() {
      this.$emit("done");
    },
    clear() {
      this.job = JSON.parse(JSON.stringify(this.blankJob));
    },
    save() {},
  },
  mounted() {
    this.blankJob = JSON.parse(JSON.stringify(this.job));
  },
  props: ["mode"],
  data: () => ({
    job: {
      location: "",
      start: {
        date: "",
        time: "",
      },
      end: {
        date: "",
        time: "",
      },
      assigned: [],
      tasks: [],
    },
    menus: {
      start: {
        date: false,
        time: false,
      },
      end: {
        date: false,
        time: false,
      },
    },
    blankJob: {},
    contractors: ["Gunner", "Marrie"],
  }),
};
</script>
