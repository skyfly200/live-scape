<template lang="pug">
v-card.job-form.pa-6
  v-card-title Add a Job
  v-card-text
    v-text-field(label="Title", v-model="task.title")
    v-text-field(label="Decription", v-model="task.description")
    v-autocomplete(
      label="Location",
      clearable,
      v-model="task.location",
      :items="locations.locations",
      :filter="locationFilter",
      item-text="title",
      item-value="id"
    )
      template(v-slot:item="data")
        v-list-item-content
          v-list-item-title {{ data.item.title }}
          v-list-item-title {{ data.item.address }}
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
      this.task = this.blankTask;
    },
    save() {},
  },
  mounted() {
    this.clear();
  },
  props: ["mode"],
  data: () => ({
    task: {},
    blankTask: {
      status: "new",
      title: "",
      description: "",
      location: "",
      job: "",
      asigned: [],
      notes: "",
      tools: [],
      materials: [],
      logs: [],
    },
  }),
};
</script>
