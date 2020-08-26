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
    .start 
      p Start
      DateTime 
    .end
      p End
      DateTime
  v-card-actions
    v-spacer
    v-btn(@click="clear", color="red", outlined) Clear
    v-btn(@click="cancel", color="red") Cancel
    v-btn(@click="add", color="green") Add
</template>

<script>
import { mapState } from "vuex";
import { add } from "date-fns";

import DateTime from "@/components/DateTime.vue";

export default {
  name: "JobForm",
  components: {
    DateTime,
  },
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
