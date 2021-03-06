<template lang="pug">
v-container.tasks.d-flex(fluid, no-gutter)
  v-card.task.ma-2(
    v-for="task in taskSys.tasks",
    dark,
    v-bind:class="{ active: task.status === 'active', paused: task.status === 'paused', done: task.status === 'done' }"
  )
    v-card-title {{ task.title }}
    v-divider
    v-card-text
      p {{ task.description }}
      v-btn.ma-2(
        v-if="task.job !== null",
        :to="'/jobs/' + task.job.id",
        text,
        small
      ) View Job Info
      v-btn.ma-2(v-else, text, small) Schedule Task
      v-expansion-panels(flat)
        v-expansion-panel
          v-expansion-panel-header Tools
          v-expansion-panel-content
            v-list(avatar, dense)
              v-list-item(v-for="t in task.tools", two-line)
                v-list-item-avatar(v-if="t.image")
                  v-img(:src="t.image")
                v-list-item-content
                  v-list-item-title {{ t.name }}
                  v-list-item-subtitle {{ t.description }}
    v-divider
    v-card-actions
      template(v-if="task.status === 'new'")
        v-btn(@click="setTaskStatus(task, 'active')", icon)
          v-icon(color="green") mdi-play
      template(v-else-if="task.status !== 'done'")
        v-btn(@click="setTaskStatus(task, 'new')", icon)
          v-icon(color="red") mdi-cancel
        v-spacer
        v-btn(
          v-if="task.status === 'paused'",
          @click="setTaskStatus(task, 'active')",
          icon
        )
          v-icon(color="yellow") mdi-play
        v-btn(v-else, @click="setTaskStatus(task, 'paused')", icon)
          v-icon(color="yellow") mdi-pause
        v-btn(
          :disabled="task.status === 'paused'",
          @click="setTaskStatus(task, 'done')",
          icon
        )
          v-icon(color="green") mdi-check
      template(v-else)
        v-btn(@click="setTaskStatus(task, 'active')", icon)
          v-icon mdi-undo
        v-spacer
        v-icon(color="green") mdi-check
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Tasks",
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
  },
  data: () => ({}),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
  flex-wrap: wrap
.task
  border: 0.5px solid white
  width: 250px
.active
  border: 2px solid blue
.paused
  border: 2px solid yellow
.done
  border: 2px solid green
</style>
