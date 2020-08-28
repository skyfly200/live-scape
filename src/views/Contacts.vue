<template lang="pug">
v-container(fluid)
  v-row
    v-col.contacts
      v-expansion-panels(dark)
        v-expansion-panel.contact.ma-4(
          v-for="contact in contacts.contacts",
          :key="contact.id"
        )
          v-expansion-panel-header {{ contact.lastName }}, {{ contact.firstName }}
          v-expansion-panel-content
            .d-flex
              h1 {{ contact.nickname }}
              p {{ contact.cellPhone }}
              v-btn.ma-2(color="primary", :href="'tel:' + contact.cellPhone")
                v-icon mdi-phone
                span Call
              p {{ contact.email }}
              v-btn.ma-2(color="primary", :href="'mailto:' + contact.email")
                v-icon mdi-email
                span Email
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
