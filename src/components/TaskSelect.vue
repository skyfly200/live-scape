<template lang="pug">
v-card.task-select.pa-6
  v-card-title Select Your Task
  v-card-text
    v-list
      v-list-item(
        link,
        v-for="task in tasks",
        :key="task.id",
        @click="selectTask(task)"
      )
        v-list-item-title {{ task.title }}
        v-list-item-title {{ task.description }}
        v-list-item-icon
          v-icon {{ toIcon(task.status) }}
  v-card-actions
    v-tooltip(bottom)
      template(v-slot:activator="{ on, attrs }")
        v-btn(icon, @click="all = !all", v-bind="attrs", v-on="on")
          v-icon mdi-eye-plus
      span Show All
    v-spacer
    v-btn(@click="$emit('done')", color="red") Cancel
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskSelect",
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
    tasks() {
      return this.taskSys.tasks.filter((t) => this.isSelectable(t.status));
    },
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
    toRef(collection, id) {
      return db.collection(collection).doc(id);
    },
    toIcon(status) {
      const mapping = {
        new: "mdi-new-box",
        active: "mdi-bell-ring",
        paused: "mdi-pause-octogon",
        done: "mdi-check",
      };
      return mapping[status];
    },
    isSelectable(status) {
      const mapping = {
        new: true,
        active: true,
        paused: true,
        done: false,
      };
      return mapping[status];
    },
    selectTask(task) {
      console.log(task);
      this.$emit("done");
    },
  },
  props: ["mode"],
  data: () => ({
    all: false,
  }),
};
</script>
