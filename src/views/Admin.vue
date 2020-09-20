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
          template( v-slot:item.photoURL="{ item }")
            v-avatar(color="purple")
              v-img(
                v-if="!!item.photoURL",
                :src="item.photoURL",
                :alt="item.displayName"
              )
              span(v-else) {{ item.displayName.charAt(0).toUpperCase() }}
          template( v-slot:item.role="{ item }")
            template(v-if="editing === item.id")
              v-select(v-model="role" :items="roles" @click:append-outer="save" dense width="50px" append-outer-icon="mdi-content-save")
            template(v-else)
              span {{ item.role }}
              v-icon.role-btn(@click="edit(item)" link) mdi-pencil
</template>

<script>
import { Auth } from "@/firebase/auth";
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: {
    ...mapState(["users", ["users"]]),
  },
  beforeMount() {
    Auth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        console.log("Role: ", idTokenResult.claims.role);
        // Confirm the user is an Admin.
        if (
          !!idTokenResult.claims.role &&
          idTokenResult.claims.role === "admin"
        ) {
          // Show admin UI.
        } else {
          // Show regular user UI.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    edit(item) {
      this.editing = item.uid;
      this.role = item.role;
    },
    save() {
      // call setRole cloud function
      const baseURI =
        "https://us-central1-landscaping-business-manager.cloudfunctions.net/setRole";
      this.$http
        .get(baseURI + "?uid=" + this.editing + "&role=" + this.role)
        .then((result) => {
          console.log(this.editing, this.role);
        });
      // clear role edit state
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
        text: "Avatar",
        align: "start",
        sortable: false,
        filterable: false,
        value: "photoURL",
      },
      { text: "Name", value: "displayName" },
      { text: "Email", value: "email" },
      { text: "Role", align: "end", value: "role" },
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
