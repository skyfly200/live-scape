<template lang="pug">
v-container.dashboard(fluid)
  v-card.pa-2(dark)
    v-card-title
      h1 Dashboard
    v-container.data-boxes
      v-divider
      v-row
        v-col.data-box
          h2.data-field {{ timeWorked }}
          h5 Worked This Week
        v-divider(vertical)
        v-col.data-box
          h1.data-field 3
          h5 Work Days Left
        v-divider(vertical)
        v-col.data-box
          v-progress-circular.gauge(
            :value="percentTasks",
            size="120",
            color="blue"
          )
            span {{ completeTasks }} / {{ taskSys.tasks.length }}
          h5 Tasks Done
      v-divider
  v-card.pa-2.my-3(dark)
    v-card-title
      h2 Active Tasks
    v-card-text
      v-list
        v-list-item(
          v-for="task in activeTasks",
          dense,
          three-line,
          to="/tasks",
          :key="task.id"
        )
          v-list-item-content
            v-list-item-title {{ task.title }}
            v-list-item-subtitle {{ task.description }}
            v-list-item-subtitle {{ task.notes }}
  v-card.pa-2.my-3(dark)
    v-card-title
      h2 Paused Tasks
    v-card-text
      v-list
        v-list-item(
          v-for="task in pausedTasks",
          dense,
          three-line,
          to="/tasks",
          :key="task.id"
        )
          v-list-item-content
            v-list-item-title {{ task.title }}
            v-list-item-subtitle {{ task.description }}
            v-list-item-subtitle {{ task.notes }}
  v-card.pa-2.my-3(dark)
    v-card-title
      h2 Completed Tasks
    v-card-text
      v-list
        v-list-item(
          v-for="task in doneTasks",
          dense,
          three-line,
          to="/tasks",
          :key="task.id"
        )
          v-list-item-content
            v-list-item-title {{ task.title }}
            v-list-item-subtitle {{ task.description }}
            v-list-item-subtitle {{ task.notes }}
  v-card.pa-2(dark)
    v-card-title
      h2 New Tasks
    v-card-text
      v-list
        v-list-item(
          v-for="task in newTasks",
          dense,
          three-line,
          to="/tasks",
          :key="task.id"
        )
          v-list-item-content
            v-list-item-title {{ task.title }}
            v-list-item-subtitle {{ task.description }}
            v-list-item-subtitle {{ task.notes }}
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { format, formatDistance } from "date-fns";

export default {
  name: "Dashboard",
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
    ...mapGetters("timeclock", ["totalAll"]),
    completeTasks: function () {
      return this.taskSys.tasks.filter((t) => t.status === "done").length;
    },
    percentTasks: function () {
      return (this.completeTasks / this.taskSys.tasks.length) * 100;
    },
    newTasks() {
      return this.taskSys.tasks.filter((t) => t.status === "new");
    },
    activeTasks() {
      return this.taskSys.tasks.filter((t) => t.status === "active");
    },
    pausedTasks() {
      return this.taskSys.tasks.filter((t) => t.status === "paused");
    },
    doneTasks() {
      return this.taskSys.tasks.filter((t) => t.status === "done");
    },
    timeWorked() {
      return formatDistance(0, this.totalAll * 1000, {
        includeSeconds: true,
      });
    },
  },
  data: () => ({}),
};
</script>

<style lang="sass" scoped>
.data-box
  width: 100%
  padding: 1rem
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  .data-field
    margin: 2rem
    height: 100%
  .gauge
    margin: auto
</style>
