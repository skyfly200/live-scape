<template lang="pug">
v-container(fluid)
  v-row
    v-col.contacts
      v-card(dark, width="100%")
        v-card-title Contacts
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
          :items="contacts.contacts",
          :items-per-page="5",
          dark,
          :search="search"
        )
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Contacts",
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
  data: () => ({
    headers: [
      {
        text: "First Name",
        align: "start",
        value: "lastName",
      },
      { text: "Last Name", value: "lastName" },
      { text: "Nickname", value: "nickname" },
      { text: "Email", value: "email" },
      { text: "Home Phone", sortable: false, value: "homePhone" },
      { text: "Cell Phone", sortable: false, value: "cellPhone" },
    ],
    search: "",
    streetViewURL:
      "https://maps.googleapis.com/maps/api/streetview?size=300x200&fov=80&pitch=0&key=AIzaSyDPbvEAlVbD1oME8UH9b2pbTQJympA5lM8&location=",
  }),
};
</script>

<style lang="sass" scoped>
.contacts
  display: flex
  flex-wrap: wrap
  justify-content: space-around
</style>
