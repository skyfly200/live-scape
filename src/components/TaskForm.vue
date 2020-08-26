<template lang="pug">
v-card.task-form
  v-card-title Add a Task
  v-card-text
    v-input(label="Title", v-model="task.title")
    v-text-field(label="decription", v-model="task.description")
    v-autocomplete(
      label="tools",
      chips,
      v-model="task.tools",
      :items="tools",
      item-text="name",
      item-value="id"
    ) 
  v-card-actions
    v-btn(@click="clear") Clear
    v-spacer
    v-btn(@click="add") Add
    v-btn(@click="cancel") Cancel
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskForm",
  methods: {
    add() {
      this.$emit("done");
    },
    cancel() {
      this.$emit("done");
    },
    clear() {},
  },
  data: () => ({
    task: {
      id: 3,
      status: "new",
      job: 0,
      title: "Weed and Deadhead",
      description: "Weed and deadhead the back and side yards",
      notes: "",
      tools: [0, 1, 2],
    },
    tools: [
      {
        id: 0,
        name: "Weeding Tool",
        image:
          "https://www.gardenersedge.com/images/500/4752.jpg?v=100000227430-2",
        size: "small",
        description: "For pulling up weeds at the root",
      },
      {
        id: 1,
        name: "Hand Pruners",
        image:
          "https://p0.pikist.com/photos/117/802/background-isolated-garden-scissors-pruner-shears-secateurs-object-equipment.jpg",
        size: "small",
        description: "For pruning and deadheading",
      },
      {
        id: 3,
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
