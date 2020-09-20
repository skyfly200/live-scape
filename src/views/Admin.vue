<template lang="pug">
v-container(fluid)
  v-row
    v-col.admin-portal
      v-card(dark, width="100%")
        v-card-title Users
          v-spacer
          v-text-field(
            v-model="search",
            append-icon="mdi-magnify",
            label="Search",
            single-line,
            hide-details
          )
        v-data-table.elevation-1(
          :headers="headers",
          :items="users.users",
          :items-per-page="5",
          dark,
          :search="search"
        )
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: {
    ...mapState(["users", ["users"]]),
  },
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
    ],
    search: "",
  }),
};
</script>

<style lang="sass" scoped>
.admin-portal
  display: flex
  flex-wrap: wrap
  justify-content: space-around
</style>
