<template>
  <div class="mt-5 p-5">
    <mdb-card>
      <mdb-card-body>
        <form novalidate @submit.prevent="login">
          <p class="h4 text-center mb-4">Sign in</p>
          <mdb-list-group v-if="errors.length" class="mb-4">
            <mdb-list-group-item
              v-for="error in errors"
              :key="error"
              class="list-group-item-danger"
              >{{ error }}</mdb-list-group-item
            >
          </mdb-list-group>

          <div class="grey-text mt-5">
            <mdb-input
              v-model="email"
              label="Email"
              icon="envelope"
              type="email"
              required
            />
            <mdb-input
              v-model="password"
              label="Password"
              icon="lock"
              type="password"
              required
            />
          </div>
          <div class="text-center">
            <mdb-btn type="submit">Login</mdb-btn>
          </div>
          <router-link to="register">Register</router-link>
        </form>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>

<script>
import {
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbContainer,
  mdbInput,
  mdbListGroup,
  mdbListGroupItem,
} from "mdbvue";

import { Auth } from "@/firebase/auth";
import validate from "@/modules/validation-module";

export default {
  name: "login",
  components: {
    mdbCard,
    mdbCardBody,
    mdbBtn,
    mdbInput,
    mdbListGroup,
    mdbListGroupItem,
    mdbContainer,
  },
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    login(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push("Please enter a valid email address");
      }
      if (!this.errors.length) {
        event.target.classList.add("was-validated");
        Auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push("/dashboard"))
          .catch((err) => this.errors.push(err.message));
      }
    },
  },
};
</script>
