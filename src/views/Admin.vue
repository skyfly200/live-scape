<template lang="pug">
v-container(fluid)
  v-row
    v-col.admin-portal
      v-card(dark, width="100%")
        v-card-title Users
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
          :items="users.users",
          :items-per-page="5",
          dark,
          :search="search"
        )
          template( v-slot:item.role="{ item }")
            template(v-if="editing === item.id")
              v-select(v-model="role" :items="roles" @click:append-outer="save" dense width="50px" append-outer-icon="mdi-content-save")
            template(v-else)
              span {{ item.role }}
              v-icon.role-btn(@click="edit(item)" link) mdi-pencil
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: {
    ...mapState(["users", ["users"]]),
  },
  methods: {
    edit(item) {
      this.editing = item.id;
      this.role = item.role;
    },
    save() {
      console.log(this.editing, this.role);
      // clear edit data
      this.editing = null;
      this.role = "";
    },
  },
  data: () => ({
    editing: null,
    role: "",
    roles: ["new", "contractor", "client", "manager", "admin"],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
    ],
    search: "",
  }),
};
</script>

<style lang="sass" scoped>
.admin-portal
  display: flex
  flex-wrap: wrap
  justify-content: space-around
.role-btn
  margin-left: 1rem
</style>
