<template lang="pug">
v-card.task-form.pa-6
  v-card-title Select a Task
  v-card-text
    v-list
      v-list-item(link, @click="$emit('done')")
        v-list-item-title A Task
        v-list-item-title Task description
  v-card-actions
    v-btn(@click="save", icon, color="blue")
      v-icon mdi-content-save
    v-spacer
    v-btn(@click="clear", color="red", outlined) Clear
    v-btn(@click="cancel", color="red") Cancel
    v-btn(@click="add", color="green", :disabled="!valid") Add
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
