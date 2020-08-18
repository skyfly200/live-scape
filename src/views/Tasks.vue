<template lang="pug">
  v-container.tasks.d-flex(fluid)
    v-card.task.ma-2(v-for="task in tasks" dark v-bind:class="{ active: (task.status === 'active'), paused: (task.status === 'paused'), done: (task.status === 'done') }")
      v-card-title {{ task.title }}
      v-card-subtitle {{ task.description }}
      v-divider
      v-card-text
        v-btn.ma-2(:to="'/jobs/' + task.id" text small) View Job Info
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
        template(v-if="task.status === 'new'")
          v-btn(@click="task.status = 'active'" icon)
            v-icon(color="green") mdi-play
        template(v-else-if="task.status !== 'done'")
          v-btn(@click="task.status = 'new'" icon)
            v-icon(color="red") mdi-cancel
          v-spacer
          v-btn(v-if="task.status === 'paused'" @click="task.status = 'active'" icon)
            v-icon(color="yellow") mdi-play
          v-btn(v-else @click="task.status = 'paused'" icon)
            v-icon(color="yellow") mdi-pause
          v-btn(:disabled="task.status === 'paused'" @click="task.status = 'done'" icon)
            v-icon(color="green") mdi-check
        template(v-else)
          v-btn(@click="task.status = 'active'" icon)
            v-icon mdi-undo
          v-spacer
          v-icon(color="green") mdi-check
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Tasks",
  computed: {
    ...mapState(["locations", "contacts", "tasks", "jobs"]),
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
.task
  border: 0.5px solid white
.active
  border: 2px solid blue
.paused
  border: 2px solid yellow
.done
  border: 2px solid green
</style>
