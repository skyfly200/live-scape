<template lang="pug">
v-card.task-form.pa-6
  v-card-title Select a Task
  v-card-text
    v-list
      v-list-item(link, @click="$emit('done')")
        v-list-item-title A Task
        v-list-item-title Task description
  v-card-actions
    v-spacer
    v-btn(@click="$emit('done')", color="red") Cancel
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskForm",
  computed: {
    ...mapState([
      "taskSys",
      ["tasks"],
      "location",
      ["locations"],
      "contacts",
      ["contacts"],
      "tools",
      ["tools"],
      "materials",
      ["materials"],
      "jobs",
      ["jobs"],
    ]),
  },
  methods: {
    locationFilter(item, queryText, itemText) {
      const textOne = item.title.toLowerCase();
      const textTwo = item.address.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    toRef(collection, id) {
      return db.collection(collection).doc(id);
    },
  },
  props: ["mode"],
  data: () => ({}),
};
</script>
