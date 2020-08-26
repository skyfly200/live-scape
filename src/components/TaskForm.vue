<template lang="pug">
v-card.task-form.pa-6
  v-card-title Add a Task
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
    v-autocomplete(
      label="Tools",
      chips,
      dense,
      multiple,
      clearable,
      v-model="task.tools",
      :items="tools.tools",
      item-text="name",
      item-value="id"
    )
    v-autocomplete(
      label="Materials",
      chips,
      dense,
      multiple,
      clearable,
      v-model="task.materials",
      :items="materials.materials",
      item-text="name",
      item-value="id"
    ) 
  v-card-actions
    v-btn(@click="save", icon, color="blue")
      v-icon mdi-content-save
    v-spacer
    v-btn(@click="clear", color="red", outlined) Clear
    v-btn(@click="cancel", color="red") Cancel
    v-btn(@click="add", color="green") Add
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskForm",
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
  props: ["mode"],
  data: () => ({
    task: {
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
