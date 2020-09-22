<template lang="pug">
v-card.task-select.pa-6
  v-card-title Select Your Task(s)
  v-card-text
    v-data-table.elevation-1(
      v-model="selected",
      :headers="headers",
      :items="tasks",
      item-key="id",
      show-select,
      disable-pagination,
      hide-default-footer,
      flat
    )
  v-card-actions
    v-tooltip(bottom)
      template(v-slot:activator="{ on, attrs }")
        v-btn(icon, @click="all = !all", v-bind="attrs", v-on="on")
          v-icon mdi-eye-plus
      span Show All
    v-spacer
    v-btn(@click="startTasks", color="green") Done
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "TaskSelect",
  computed: {
    ...mapState([
      "auth",
      ["status", "raw", "user"],
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
    ...mapGetters("auth", ["isLoggedIn"]),
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
    startTasks() {
      this.selected.map(t => this.selectTask(t));
      this.$emit("done");
    },
    selectTask(task) {
      this.$store.dispatch("taskSys/update", {
        id: task.id,
        update: {
          status: "active",
        },
      });
      // TODO: use server timestamp here
      this.$store.dispatch("taskSys/log", {
        id: task.id,
        log: {
          timestamp: new Date(),
          status: "active",
          user: this.user === undefined ? null : this.user,
        },
      });
    },
  },
  props: ["mode"],
  data: () => ({
    all: false,
    selected: [],
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
