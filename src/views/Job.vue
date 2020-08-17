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
export default {
  name: "Job",
  methods: {
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
    },
  },
  computed: {
    job: function() {
      return this.jobs[this.$route.params.id];
    },
  },
  data: () => ({
    tasks: [
      {
        id: 0,
        status: "new",
        job: 0,
        title: "Weed and Deadhead",
        description: "Weed and deadhead the back and side yards",
        notes: "",
        tools: [0, 1, 2],
      },
      {
        id: 1,
        status: "new",
        job: 1,
        title: "Plant Suculants",
        description: "Plant the suculants in the garden",
        notes: "",
        tools: [0, 1, 2],
      },
    ],
    jobs: [
      {
        id: 0,
        customerName: "Dan Brown",
        address: "1203 Spruce St. Boulder, CO",
        notes: "Close the gate",
      },
      {
        id: 1,
        customerName: "Jerry Mathews",
        address: "1234 Bluff St. Boulder, CO",
        notes: "Don't run the blower",
      },
      {
        id: 2,
        customerName: "Faye Fly",
        address: "2644 Mapleton Ave. Boulder, CO",
        notes: "Don't run the blower",
      },
    ],
  }),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
.job
    width: 100%
</style>
