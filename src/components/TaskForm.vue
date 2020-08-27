<template lang="pug">
v-card.task-form.pa-6
  v-card-title Add a Task
  v-card-text
    v-form
      v-text-field(label="Title", v-model="task.title", required)
      v-text-field(label="Decription", v-model="task.description")
      v-autocomplete(
        label="Location",
        clearable,
        required,
        v-model="task.location",
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
    v-btn(@click="add", color="green", :disabled="!valid") Add
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskForm",
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
      let newTask = {
        job: null,
        location: this.task.location,
        title: this.task.title,
        description: this.task.description,
        notes: this.task.notes,
        tools: this.task.tools,
        materials: this.task.materials,
      };
      this.$store.dispatch("taskSys/add", newTask);
      this.$emit("done");
    },
    toRef(collection, id) {
      return db.collection(collection).doc(id);
    },
    cancel() {
      this.$emit("done");
    },
    clear() {
      this.task = JSON.parse(JSON.stringify(this.blankTask));
    },
    save() {},
  },
  mounted() {
    this.blankTask = JSON.parse(JSON.stringify(this.task));
  },
  props: ["mode"],
  data: () => ({
    valid: true,
    task: {
      status: "new",
      job: "",
      location: "",
      title: "",
      description: "",
      asigned: [],
      notes: "",
      tools: [],
      materials: [],
      logs: [],
    },
    blankTask: {},
  }),
};
</script>
