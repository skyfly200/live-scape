<template lang="pug">
v-container.dashboard
  v-card.pa-2(dark)
    v-card-title Dashboard
    v-container
      v-row
        v-col
          h4 Hours Worked This Week
          p 13
        v-col
          h4 Tasks Completed
          p 22
      v-divider
      h2 Current Tasks
      v-list
        v-list-item(v-for="task in tasks" dense three-line :to="'/tasks/' + task.id" :key="task.id")
          v-list-item-content
            v-list-item-title {{ task.title }} for {{ jobs[task.job].name }}
            v-list-item-subtitle {{ task.description }}
            v-list-item-subtitle {{ jobs[task.job].address }}
</template>

<script>
export default {
  name: "Tasks",
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
        name: "Dan Brown",
        address: "1203 Spruce St. Boulder, CO",
        notes: "Close the gate",
      },
      {
        name: "Jerry Mathews",
        address: "1234 Bluff St. Boulder, CO",
        notes: "Don't run the blower",
      },
    ],
  }),
};
</script>

<style lang="sass" scoped></style>
