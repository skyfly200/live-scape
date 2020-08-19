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
          v-progress-circular.gauge(:value="percentTasks" size="120" color="blue")
            span {{ completeTasks }} / {{ tasks.length }}
          h5 Tasks Done
      v-divider
  v-card.pa-2(dark)
    v-card-title
      h2 Current Tasks
    v-card-text
      v-list
        v-list-item(v-for="task in tasks" dense three-line :to="'/job/' + task.job" :key="task.id")
          v-list-item-content
            v-list-item-title {{ task.title }} for {{ locations[task.job].name }}
            v-list-item-subtitle {{ locations[task.job].description }}
            v-list-item-subtitle {{ locations[task.job].address }}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapState("taskSys", ["locations", "contacts", "tasks"]),
    completeTasks: function() {
      return this.tasks.filter((t) => t.status === "done").length;
    },
    percentTasks: function() {
      return (this.completeTasks / this.tasks.length) * 100;
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
