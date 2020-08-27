<template lang="pug">
v-card.job-form.pa-6
  v-card-title Add a Job
  v-card-text
    v-autocomplete(
      label="Location",
      clearable,
      v-model="job.location",
      :items="location.locations",
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
    .start 
      p Start
      DateTime(
        :value="job.start",
        @change:date="update('start', 'date', $event)",
        @change:time="update('start', 'time', $event)"
      )
    .end
      p End
      DateTime(
        :value="job.end",
        @change:date="update('end', 'date', $event)",
        @change:time="update('end', 'time', $event)"
      )
  v-card-actions
    v-spacer
    v-btn(@click="reset", color="red", outlined) Reset
    v-btn(@click="cancel", color="red") Cancel
    v-btn(@click="add", color="green") Add
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { add, format, formatISO, intervalToDuration } from "date-fns";

import DateTime from "@/components/DateTime.vue";

export default {
  name: "JobForm",
  components: {
    DateTime,
  },
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
      let newJob = {
        location: this.job.location,
        start: this.compileDate(this.job.start),
        end: this.compileDate(this.job.end),
        assigned: this.job.assigned,
        tasks: this.job.tasks,
      };
      this.$store.dispatch("jobs/add", newJob);
      this.$emit("done");
    },
    compileDate(parts) {
      const dateString = parts.date + " " + parts.time;
      return new Date(dateString);
    },
    update(key, param, value) {
      this.job[key][param] = value;
      const interval = {
        start: this.compileDate(this.job.start),
        end: this.compileDate(this.job.end),
      };
      const duration = intervalToDuration(interval);
      this.job.duration = duration;
    },
    cancel() {
      this.$emit("done");
    },
    reset() {
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
        date: formatISO(new Date(), { representation: "date" }),
        time: format(new Date(), "kk:mm"),
      },
      end: {
        date: formatISO(new Date(), { representation: "date" }),
        time: format(
          add(new Date(), {
            hours: 2,
            minutes: 30,
          }),
          "kk:mm"
        ),
      },
      duration: {
        hours: 2,
        minutes: 30,
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
    defaultDuration: {
      hours: 2,
      minutes: 30,
    },
    blankJob: {},
    contractors: ["Gunner", "Marrie"],
  }),
};
</script>
