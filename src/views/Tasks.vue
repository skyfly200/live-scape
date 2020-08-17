<template lang="pug">
.tasks
  v-container.tasks(fluid).d-flex
    v-card.ma-2.pa-2(v-for="task in tasks")
      v-card-title {{ task.title }}
      v-card-subtitle {{ task.description }}
      v-divider
      v-card-text
        v-btn(:to="'/jobs/' + task.id" text small) Job Info
        v-expansion-panels(flat)
          v-expansion-panel
            v-expansion-panel-header Tools
            v-expansion-panel-content
              v-list(avatar, dense)
                v-list-item(v-for="t in task.tools", two-line)
                  v-list-item-avatar(v-if="tools[t].image")
                    v-img(:src="tools[t].image")
                  v-list-item-content
                    v-list-item-title {{ tools[t].name }}
                    v-list-item-subtitle {{ tools[t].description }}
      v-divider
      v-card-actions
        v-spacer
        template(v-if="task.status === 'new'")
          v-btn(@click="task.status = 'active'" color="green") Start
        template(v-if="task.status !== 'done'")
          v-btn(@click="task.status = 'done'" color="red") Done
        template(v-else)
          v-icon(color="green") mdi-check
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
        customerName: "Dan Brown",
        address: "1203 Spruce St. Boulder, CO",
        notes: "Close the gate",
      },
      {
        customerName: "Jerry Mathews",
        address: "1234 Bluff St. Boulder, CO",
        notes: "Don't run the blower",
      },
    ],
    tools: [
      {
        name: "Weeding Tool",
        image:
          "https://www.gardenersedge.com/images/500/4752.jpg?v=100000227430-2",
        size: "small",
        description: "For pulling up weeds at the root",
      },
      {
        name: "Hand Pruners",
        image:
          "https://p0.pikist.com/photos/117/802/background-isolated-garden-scissors-pruner-shears-secateurs-object-equipment.jpg",
        size: "small",
        description: "For pruning and deadheading",
      },
      {
        name: "Bucket",
        image:
          "https://images.homedepot-static.com/productImages/db7d4968-169c-4360-aece-5fd544701f00/svn/orange-the-home-depot-paint-buckets-lids-05glhd2-c3_1000.jpg",
        size: "medium",
        description: "for collecting debris",
      },
    ],
  }),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
</style>
