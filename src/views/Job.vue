<template lang="pug">
v-container.job(fluid)
  v-row(no-gutters)
    v-col
      v-card.ma-2(dark)
        v-img(:src="streetViewURL + encodeURI(location.address)")
        v-card-title
        v-card-text.location
          div
            h3 {{ location.title }}
            a(:href="mapsURL + encodeURI(location.address)" target="_blank")
              p {{ location.address }}
          div
            v-btn(:href="navigationURL + encodeURI(location.address)" target="_blank" color="green" fab outlined)
              v-icon mdi-navigation
    v-col
      v-card.ma-2(dark)
        v-card-title {{ contacts[location.contact].lastName }}, {{ contacts[location.contact].firstName }}
        v-card-subtitle {{ contacts[location.contact].nickname }}
        v-card-text
          v-btn.ma-2(color="primary" :href="'tel:' + contacts[location.contact].cellPhone")
            v-icon mdi-phone
            span Call
          v-btn.ma-2(color="primary" :href="'mailto:' + contacts[location.contact].email")
            v-icon mdi-email
            span Email
          v-divider
          br
          h2 Notes
          v-list 
            v-list-item(v-for="note,i in location.notes" dense three-line :key="i")
              v-list-item-content
                v-list-item-subtitle {{ note }}
  v-row(no-gutters)
    v-col(cols=12)
      v-card.ma-2(dark)
        v-card-title Tasks
        v-card-text
          v-list
            v-list-item(v-for="task in getTasks(location.id)" dense three-line :key="task.id")
              v-list-item-content
                v-list-item-title {{ task.title }} for {{ location.name }}
                v-list-item-subtitle {{ task.description }}
                v-list-item-subtitle {{ location.address }}
              v-list-item-icon
                template(v-if="task.status === 'new'")
                  v-icon(color="green" @click="") mdi-play
                template(v-else-if="task.status !== 'done'")
                  v-icon(color="yellow" @click="") mdi-pause
                  v-icon(color="red" @click="") mdi-cancel
                template(v-else)
                  v-icon(@click="") mdi-undo
                  v-icon(color="green") mdi-check
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Job",
  methods: {
    getTasks: function(jobID) {
      return this.tasks.filter((task) => task.job === jobID);
    },
  },
  computed: {
    ...mapState([
      "tasks",
      "locations",
      "contacts",
      "tools",
      "materials",
      "jobs",
    ]),
    jobID: function() {
      return this.$route.params.id;
    },
    job: function() {
      return this.jobs.filter((job) => job.uid === this.jobID);
    },
    location: function() {
      return this.locations[this.$route.params.id];
    },
  },
  data: () => ({
    streetViewURL:
      "https://maps.googleapis.com/maps/api/streetview?size=300x200&fov=80&pitch=0&key=AIzaSyDPbvEAlVbD1oME8UH9b2pbTQJympA5lM8&location=",
    navigationURL: "https://www.google.com/maps/dir/?api=1&destination=",
    mapsURL: "https://www.google.com/maps/search/?api=1&query=",
  }),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
.job
    width: 100%
.location
  display: flex
  flex-wrap: wrap
  width: 100%
  justify-content: space-between
</style>
