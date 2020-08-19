<template lang="pug">
v-container(fluid)
  v-row
    v-col.jobs
      .job.ma-4(v-for="location in locations")
        v-badge(color="red" size="1rem" :value="getTasks(location.id).length > 0" :content="getTasks(location.id).length")
          v-card(dark width="300" height="300" :to="'/jobs/' + location.id")
            v-img(:src="streetViewURL + encodeURI(location.address)")
            v-card-title {{ location.title }}
            v-card-subtitle {{ location.address }}
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Jobs",
  computed: {
    ...mapState("taskSys", [
      "locations",
      "contacts",
      "tasks",
      "tools",
      "materials",
    ]),
  },
  methods: {
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
    },
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
