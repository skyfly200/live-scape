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
export default {
  name: "Tasks",
  methods: {
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
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
    ],
  }),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
</style>
