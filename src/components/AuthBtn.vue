<template>
  <mdb-navbar
    class="navbar-light lighten-5 flexible-navbar"
    color="orange"
    expand="large"
    position="top"
    scrolling
  >
    <mdb-navbar-brand
      href="https://sourcelink.co.uk"
      style="padding-left: 150px"
      target="_blank"
    >
      <img
        alt="SourceLink"
        class="img-fluid"
        height="60"
        src="../../public/img/logo.png"
      />
    </mdb-navbar-brand>

    <mdb-navbar-nav class="nav-flex-icons" right>
      <mdb-nav-item :to="{ name: 'login' }" v-if="!user" waves-fixed
        >Login</mdb-nav-item
      >
      <mdb-nav-item @click="logout" v-else waves-fixed>Logout</mdb-nav-item>
    </mdb-navbar-nav>
  </mdb-navbar>
</template>

<script>
import { mdbNavbar, mdbNavbarBrand, mdbNavbarNav, mdbNavItem } from "mdbvue";
import { mapState } from "vuex";
import { Auth } from "@/firebase/auth";

export default {
  name: "Header",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarNav,
    mdbNavItem,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      Auth.signOut().then(() => {
        Auth.onAuthStateChanged(() => {
          this.$router.push("/");
        });
      });
    },
  },
};
</script>
