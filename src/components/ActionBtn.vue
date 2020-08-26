<template lang="pug">
.action-btn
  v-speed-dial(v-model="actions", fixed, direction="top", bottom, right)
    template(v-slot:activator)
      v-btn(fab, v-model="actions", dark, color="blue")
        v-icon mdi-plus
    v-tooltip(v-for="action in roleActions", left)
      template(v-slot:activator="{ on, attrs }")
        template(v-if="action.toggle === undefined")
          v-btn(
            fab,
            @click="$emit(action.event)",
            small,
            dark,
            v-bind="attrs",
            v-on="on",
            :color="action.color"
          )
            v-icon {{ action.icon }}
        template(v-else)
          v-btn(
            @click.stop="$emit(lookup(action) ? action.event[0] : action.event[1])",
            fab,
            small,
            dark,
            v-bind="attrs",
            v-on="on",
            :color="lookup(action) ? action.color[0] : action.color[1]"
          )
            v-icon {{ lookup(action) ? action.icon[0] : action.icon[1] }}
      template(v-if="lookup(action) === undefined")
        span {{ action.tooltip }}
      template(v-else)
        span {{ lookup(action) ? action.tooltip[0] : action.tooltip[1] }}
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { format, isBefore, isAfter, intervalToDuration } from "date-fns";
import { functions } from "firebase";

export default Vue.extend({
  name: "ActionBtn",
  props: ["role"],
  data: function () {
    return {
      actions: false,
      speedDial: [
        {
          toggle: "running",
          event: ["stopClock", "startClock"],
          icon: ["mdi-stop", "mdi-timer"],
          color: ["red", "red"],
          tooltip: ["Stop Timeclock", "Start Timeclock"],
        },
        {
          event: "startTask",
          icon: "mdi-clipboard",
          color: "green",
          tooltip: "Start Task",
        },
        {
          event: "newTask",
          icon: "mdi-clipboard-plus",
          color: "green",
          tooltip: "New Task",
          roles: ["admin", "manager"],
        },
        {
          event: "newJob",
          icon: "mdi-calendar-plus",
          color: "purple",
          tooltip: "New Job",
          roles: ["admin", "manager"],
        },
      ],
    };
  },
  computed: {
    ...mapState("timeclock", ["entries"]),
    running(): boolean {
      return this.entries.filter((e: any) => e.end === undefined).length > 0;
    },
    roleActions() {
      return (this as any).speedDial.filter(
        (a: any) => a.roles === undefined || (this as any).roleFilter(a.roles)
      );
    },
  },
  methods: {
    roleFilter(roles: Array<string>) {
      return roles.reduce((acc, role) => acc || role === this.role, false);
    },
    lookup(action: any) {
      return (this as any)[action.toggle];
    },
  },
});
</script>

<style lang="sass" scoped>
.flex
  display: flex
  width: 100%
.center
  align-items: center
  text-align: center
</style>
