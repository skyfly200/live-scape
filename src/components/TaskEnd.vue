<template lang="pug">
v-card.task-end.pa-6
  v-card-title Select Completed Tasks
  v-data-table.elevation-1(
    v-model="completed",
    :headers="headers",
    :items="tasks",
    item-key="id",
    show-select,
    disable-pagination,
    hide-default-footer,
    flat
  )
  v-card-actions
    v-spacer
    v-btn(@click="wrapUpTasks", color="green") Done
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskEnd",
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
      return this.taskSys.tasks.filter((t) => t.status === "active");
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
    wrapUpTasks() {
      for (let task of this.tasks) {
        const done = this.completed.includes(task);
        const status = done ? "done" : "paused";
        this.$store.dispatch("taskSys/update", {
          id: task.id,
          update: {
            status: status,
          },
        });
        // TODO: use server timestamp here
        this.$store.dispatch("taskSys/log", {
          id: task.id,
          log: {
            timestamp: new Date(),
            status: status,
            user: this.user === undefined ? null : this.user,
          },
        });
      }
      this.$emit("done");
    },
  },
  props: ["mode"],
  data: () => ({
    all: false,
    completed: [],
    headers: [
      {
        text: "Title",
        align: "start",
        value: "title",
      },
      {
        text: "Status",
        value: "status",
      },
    ],
  }),
};
</script>
