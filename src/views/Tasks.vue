<template lang="pug">
v-container.tasks(fluid)
  v-card.ma-2(v-for="task in tasks", width="400")
    v-card-title {{ task.title }}
    v-card-subtitle {{ task.description }}
    v-card-text
      h4 Customer: {{ locations[task.location].customerName }}
      h4 Address: {{ locations[task.location].address }}
      p {{ task.notes }}
      h3 Tools
      v-list
        v-list-item(v-for="t in task.tools", two-line)
          v-list-item-avatar(v-if="tools[t].image")
            v-img(:src="tools[t].image")
          v-list-item-content
            v-list-item-title {{ tools[t].name }}
            v-list-item-subtitle {{ tools[t].description }}
      v-img(v-for="i in task.images", width="50", src="i")
    v-card-actions
      v-btn Start
</template>

<script>
export default {
  name: "Tasks",
  data: () => ({
    tasks: [
      {
        id: 0,
        location: 0,
        title: "Weed and Deadhead",
        description: "Weed and deadhead the back and side yards",
        notes: "",
        tools: [0, 1, 2],
        images: [],
      },
      {
        id: 1,
        location: 1,
        title: "Plant Suculants",
        description: "Plant the suculants in the garden",
        notes: "",
        tools: [0, 1, 2],
        images: [],
      },
    ],
    locations: [
      {
        customerName: "Libby Fly",
        address: "2644 Mapleton Ave. Boulder, CO",
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