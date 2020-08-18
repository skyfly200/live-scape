<template lang="pug">
v-container.jobs.d-flex(fluid)
    v-card.ma-2.job(dark)
        v-card-title {{ job.customerName }}
        v-card-subtitle {{ job.address }}
        v-card-text
            h3 Notes
            p {{ job.notes }}
        v-card-actions
            v-btn(:href="'https://www.google.com/maps/dir/?api=1&destination='+ encodeURI(job.address)" target="_blank" color="primary") Navigate
    v-card.ma-2.job(dark)
        v-card-title Tasks
        v-card-text
            v-list
                v-list-item(v-for="task in getTasks(job.id)" dense three-line :to="'/tasks/' + task.id" :key="task.id")
                    v-list-item-content
                        v-list-item-title {{ task.title }} for {{ jobs[task.job].name }}
                        v-list-item-subtitle {{ task.description }}
                        v-list-item-subtitle {{ jobs[task.job].address }}
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Job",
  methods: {
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
    },
  },
  computed: {
    ...mapState(["locations", "contacts", "tasks", "jobs"]),
    job: function() {
      return this.jobs[this.$route.params.id];
    },
  },
  data: () => ({}),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
.job
    width: 100%
</style>
