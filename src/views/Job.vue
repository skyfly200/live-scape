<template lang="pug">
v-container.job(fluid)
  v-row(no-gutters)
    v-col
      v-card.ma-2(dark)
          v-card-title {{ contacts[job.contact].lastName }}, {{ contacts[job.contact].firstName }}
          v-card-subtitle {{ contacts[job.contact].nickname }}
          v-divider
          v-card-text.location
            div
              h3 {{ locations[job.location].title }}
              p {{ locations[job.location].address }}
            div
              v-btn(:href="'https://www.google.com/maps/dir/?api=1&destination='+ encodeURI(job.address)" target="_blank" color="primary") Navigate To
    v-col
      v-card.ma-2(dark)
          v-card-title Notes
          v-card-text
              v-list 
                  v-list-item(v-for="note,i in locations[job.location].notes" dense three-line :key="i")
                      v-list-item-content
                          v-list-item-subtitle {{ note }}
  v-row(no-gutters)
    v-col(cols=12)
      v-card.ma-2(dark)
        v-card-title Tasks
        v-card-text
          v-list
            v-list-item(v-for="task in getTasks(job.id)" dense three-line :key="task.id")
              v-list-item-content
                v-list-item-title {{ task.title }} for {{ jobs[task.job].name }}
                v-list-item-subtitle {{ task.description }}
                v-list-item-subtitle {{ jobs[task.job].address }}
              v-list-item-icon
                template(v-if="task.status === 'new'")
                  v-icon(color="green" @click="") mdi-play
                template(v-else-if="task.status !== 'done'")
                  v-icon(color="yellow" @click="") mdi-pause
                  v-icon(color="red" @click="") mdi-cancel
                template(v-else)
                  v-icon(@click="") mdi-undo
                  v-icon(color="green") mdi-check
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
    ...mapState("taskSys", [
      "locations",
      "contacts",
      "tasks",
      "jobs",
      "tools",
      "materials",
    ]),
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
.location
  display: flex
  width: 100%
  justify-content: space-between
</style>
