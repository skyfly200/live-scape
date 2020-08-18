<template lang="pug">
v-container.jobs.d-flex(fluid)
  v-card.ma-4(v-for="job in jobs" dark)
    v-card-title {{ job.customerName }}
    v-card-subtitle {{ job.address }}
    v-card-text
      h3 {{ getTasks(job.id).length }} New Task(s)
      p {{ job.notes }}
    v-divider
    v-card-actions
      v-spacer
      v-btn(:to="'/jobs/' + job.id") Job Info
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Tasks",
  computed: {
    ...mapState("taskSys", ["locations", "contacts", "tasks", "jobs"]),
  },
  methods: {
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
    },
  },
  data: () => ({}),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
</style>
