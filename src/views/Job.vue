<template lang="pug">
v-container.job(fluid)
  template(v-if="location === undefined")
    v-row
      v-col
        v-card
          v-card-title Invalid Job ID
          v-card-subtitle {{ jobID }}
  template(v-else)
    v-row(no-gutters)
      v-col
        v-card.ma-2(dark)
          v-img(:src="streetViewURL + encodeURI(location.address)")
          v-card-title
          v-card-text.location.d-flex.flex-nowrap
            div
              h3 {{ location.title }}
              a(:href="mapsURL + encodeURI(location.address)", target="_blank")
                p.text-truncate.d-inline-block.address {{ location.address }}
            div
              v-btn(
                :href="navigationURL + encodeURI(location.address)",
                target="_blank",
                color="green",
                fab,
                outlined
              )
                v-icon mdi-navigation
      v-col.data-col
        v-card.contact.ma-2(dark)
          template(v-if="location.contact")
            v-card-title {{ location.contact.lastName }}, {{ location.contact.firstName }}
            v-card-subtitle {{ location.contact.nickname }}
            v-card-actions
              v-spacer
              v-menu(offset-y)
                template(v-slot:activator="{ on, attrs }")
                  v-btn.ma-2(color="primary", v-bind="attrs", v-on="on")
                    v-icon mdi-phone
                    span Call
                v-list(two-line)
                  v-list-item(
                    link,
                    two-line,
                    :href="'tel:' + location.contact.homePhone"
                  )
                    v-list-item-icon
                      v-icon mdi-home
                    v-list-item-content
                      v-list-item-title Home
                      v-list-item-subtitle {{ location.contact.homePhone }}
                  v-list-item(
                    link,
                    two-line,
                    :href="'tel:' + location.contact.cellPhone"
                  )
                    v-list-item-icon
                      v-icon mdi-cellphone
                    v-list-item-content
                      v-list-item-title Cell
                      v-list-item-subtitle {{ location.contact.cellPhone }}
              v-btn.ma-2(
                color="primary",
                target="_blank",
                :href="'mailto:' + location.contact.email"
              )
                v-icon mdi-email
                span Email
          template(v-else)
            v-card-title No Contact Info
        v-card.notes.ma-2(dark)
          v-card-title Notes
          v-card-text
            v-list(v-if="location.notes")
              v-list-item(
                v-for="(note, i) in location.notes",
                dense,
                three-line,
                :key="i"
              )
                v-list-item-content
                  v-list-item-subtitle {{ note }}
            h4(v-else) None
    v-row(no-gutters)
      v-sheet.pa-3.ma-2(dark, width="100%")
        h2.text-center {{ format(job.start.toDate(), 'PPp') }}
    v-row(no-gutters)
      v-col
        v-card.ma-2(dark, min-height="200px")
          v-card-title Tasks List
            v-spacer
            v-btn(icon, dark, @click="$emit('newTask')") 
              v-icon mdi-plus-circle
          v-card-text
            draggable(
              tag="v-list",
              :group="{ name: 'tasksList', put: true }",
              v-model="tasksList",
              @start="drag = true",
              @end="drag = false",
              @change="updateTasks($event)",
              draggable=".item",
              handle=".handle"
            )
              v-list-item.item(
                v-for="task in tasksList",
                dense,
                two-line,
                :key="task.id"
              )
                v-list-item-avatar.handle
                  v-icon mdi-drag
                v-list-item-content
                  v-list-item-title {{ task.title }} for {{ location.title }}
                  v-list-item-subtitle
                    p {{ task.description }}
                v-list-item-avatar
                  template(v-if="task.status === 'new'")
                    v-icon(
                      color="green",
                      @click="setTaskStatus(task, 'active')"
                    ) mdi-play
                  template(v-else-if="task.status !== 'done'")
                    v-icon(
                      color="yellow",
                      @click="setTaskStatus(task, 'paused')"
                    ) mdi-pause
                    v-icon(color="red", @click="setTaskStatus(task, 'new')") mdi-cancel
                  template(v-else)
                    v-icon(@click="setTaskStatus(task, 'active')") mdi-undo
                    v-icon(color="green") mdi-check
      v-col
        v-card.ma-2(dark, min-height="200px")
          v-card-title Unscheduled Tasks
          v-card-text
            draggable(
              tag="v-list",
              v-model="unscheduledTasks",
              @start="drag = true",
              @end="drag = false",
              @change="updateUnscheduledTasks($event)",
              draggable=".item",
              handle=".handle",
              :sort="false",
              :group="{ name: 'unscheduledTasks', put: true }"
            )
              v-list-item.item(
                v-for="task in unscheduledTasks",
                dense,
                two-line,
                :key="task.id"
              )
                v-list-item-avatar.handle
                  v-icon mdi-drag
                v-list-item-content
                  v-list-item-title {{ task.title }} for {{ location.name }}
                  v-list-item-subtitle
                    p {{ task.description }}
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import { format } from "date-fns";

export default {
  name: "Job",
  components: {
    draggable,
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
    jobID: function () {
      return this.$route.params.id;
    },
    job: function () {
      return this.jobs.jobs.filter((job) => job.id === this.jobID)[0];
    },
    location: function () {
      return this.job.location;
    },
    unscheduledTasks: {
      get() {
        return this.taskSys.tasks.filter(this.scheduleFilter);
      },
      set() {},
    },
  },
  methods: {
    format: format,
    scheduleFilter(t) {
      return t.job === null && t.location.id === this.location.id;
    },
    setTaskStatus(task, status) {
      this.$store.dispatch("taskSys/update", {
        id: task.id,
        update: {
          status: status,
        },
      });
      this.$store.dispatch("taskSys/log", {
        id: task.id,
        log: {
          timestamp: new Date(),
          status: status,
          user: this.user === undefined ? null : this.user,
        },
      });
    },
    updateTasks(e) {
      if (e.added)
        this.$store.dispatch("taskSys/setJob", {
          job: this.jobID,
          id: e.added.element.id,
        });
      this.$store.dispatch("jobs/setTasks", {
        tasks: this.tasksList.map((t) => t.id),
        id: this.jobID,
      });
    },
    updateUnscheduledTasks(e) {
      if (e.added)
        this.$store.dispatch("taskSys/setJob", {
          job: null,
          id: e.added.element.id,
        });
      this.$store.dispatch("jobs/setTasks", {
        tasks: this.tasksList.map((t) => t.id),
        id: this.jobID,
      });
    },
  },
  created() {
    this.tasksList = this.job.tasks;
  },
  data: () => ({
    drag: false,
    tasksList: [],
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
.data-col
  display: flex
  flex-direction: column
  .contact
    flex-shrink: inherit
  .notes
    flex-grow: inherit
.item:hover, .item:active
  border: solid white 0.02rem
  border-radius: 5px
  background: rgba(1,1,1,0.2)
.address
  max-width: 30vw
@media(max-width: 500px)
  .address
    max-width: 50vw
@media(max-width: 320px)
  .address
    max-width: 30vw
</style>

