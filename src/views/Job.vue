<template lang="pug">
v-container.job(fluid)
  v-row(no-gutters)
    v-col
      v-card.ma-2(dark)
        v-img(:src="streetViewURL + encodeURI(location.address)")
        v-card-title {{ contacts[location.contact].lastName }}, {{ contacts[location.contact].firstName }}
        v-card-subtitle {{ contacts[location.contact].nickname }}
        v-divider
        v-card-text.location
          div
            h3 {{ location.title }}
            p {{ location.address }}
          div
            v-btn(:href="'https://www.google.com/maps/dir/?api=1&destination='+ encodeURI(location.address)" target="_blank" color="primary") Navigate To
    v-col
      v-card.ma-2(dark)
          v-card-title Notes
          v-card-text
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
    getTasks: function(index) {
      return this.tasks.filter((task) => task.job === index);
    },
  },
  computed: {
    ...mapState("taskSys", [
      "locations",
      "contacts",
      "tasks",
      "tools",
      "materials",
    ]),
    location: function() {
      return this.locations[this.$route.params.id];
    },
  },
  data: () => ({
    streetViewURL:
      "https://maps.googleapis.com/maps/api/streetview?size=300x200&fov=80&pitch=0&key=AIzaSyDPbvEAlVbD1oME8UH9b2pbTQJympA5lM8&location=",
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
