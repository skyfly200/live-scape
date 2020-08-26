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
      chip,
      multiple,
      v-model="job.assigned",
      :items="contractors"
    )
    .start-time
      v-date-picker
      v-time-picker
    .end-time
      v-date-picker
      v-time-picker
    .tasks
      h2 Tasks
      v-list
        v-list-item(v-for="task in tasks", :key="task")
          v-list-item-content {{ task }}
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
      this.job = this.blankJob;
    },
    save() {},
  },
  mounted() {
    this.clear();
  },
  props: ["mode"],
  data: () => ({
    job: {},
    blankJob: {
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
    contractors: ["Gunner", "Marrie"],
  }),
};
</script>
