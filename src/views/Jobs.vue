<template lang="pug">
v-container(fluid)
  v-row
    v-col.jobs
      .job.ma-4(v-for="job in jobs.jobs")
        v-badge(
          color="red",
          size="1rem",
          :value="job.tasks.length > 0",
          :content="job.tasks.length"
        )
          v-card(dark, width="300", height="280", :to="'/jobs/' + job.id")
            v-img(:src="streetViewURL + encodeURI(job.location.address)")
            v-card-title {{ job.location.title }}
            v-card-subtitle {{ format(job.start.toDate(), 'PPp') }}
</template>

<script>
import { mapState } from "vuex";
import { format } from "date-fns";

export default {
  name: "Jobs",
  methods: {
    format: format,
  },
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
