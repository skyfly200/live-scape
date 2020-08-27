<template lang="pug">
v-container.dashboard(fluid)
  v-card.pa-2(dark)
    v-card-title
      h1 Dashboard
    v-container.data-boxes
      v-divider
      v-row
        v-col.data-box
          h2.data-field 13 Hours 22 Minutes
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
  v-card.pa-2(dark)
    v-card-title
      h2 Current Tasks
    v-card-text
      v-list
        v-list-item(
          v-for="task in taskSys.tasks",
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
import { mapState } from "vuex";
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
    completeTasks: function () {
      return this.taskSys.tasks.filter((t) => t.status === "done").length;
    },
    percentTasks: function () {
      return (this.completeTasks / this.taskSys.tasks.length) * 100;
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
