<template lang="pug">
v-container(fluid)
  v-row
    v-col.locations
      v-expansion-panels(dark)
        v-expansion-panel.location.ma-4(
          v-for="location in location.locations",
          :key="location.id"
        )
          v-expansion-panel-header {{ location.title }} - {{ location.address }}
          v-expansion-panel-content
            .d-flex
              v-img.street-view.shrink(
                :src="streetViewURL + encodeURI(location.address)",
                height="200",
                contain
              )
              .notes.grow.pa-4
                h2 Notes:
                p(v-for="note in location.notes") {{ note }}
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Locations",
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
.jobs
  display: flex
  flex-wrap: wrap
  justify-content: space-around
.page-title
  color: #FFF
  text-align: center
</style>
