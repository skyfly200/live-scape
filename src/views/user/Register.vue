<template>
  <div class="mt-5 p-5">
    <mdb-card>
      <mdb-card-body>
        <form novalidate @submit.prevent="submit">
          <p class="h4 text-center mb-4">New User Sign Up</p>
          <mdb-list-group v-if="errors.length" class="mb-4">
            <mdb-list-group-item
              v-for="error in errors"
              :key="error"
              class="list-group-item-danger"
            >
              {{ error }}
            </mdb-list-group-item>
          </mdb-list-group>

          <div class="grey-text  mt-4">
            <mdb-input
              v-model="email"
              label="Email"
              icon="envelope"
              type="email"
              required
              invalidFeedback="Please provide an email"
            />
            <mdb-input
              v-model="password"
              label="Password"
              icon="lock"
              type="password"
              required
              invalidFeedback="Please provide a password"
            />
          </div>
          <div class="text-center">
            <mdb-btn type="submit">Sign Up</mdb-btn>
          </div>
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
  mdbCol,
  mdbContainer,
  mdbInput,
  mdbListGroup,
  mdbListGroupItem,
  mdbRow,
} from "mdbvue";

import { Auth } from "../../firebase/auth";
import validate from "../../modules/validation-module";

export default {
  name: "register",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbBtn,
    mdbInput,
    mdbListGroup,
    mdbListGroupItem,
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };
  },
  methods: {
    submit(event) {
      this.errors = [];
      if (!validate.email(this.email)) {
        this.errors.push("Please enter a valid email address");
      }
      if (!validate.password(this.password)) {
        this.errors.push("Your password is not strong enough!");
      }
      if (this.password !== this.confirmPassword) {
        this.errors.push("Password do not match");
      }

      if (!this.errors.length) {
        event.target.classList.add("was-validated");
        Auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((created) => {
            created.user.sendEmailVerification().then(() => {
              this.$router.push("/user/profile");
            });
          })
          .catch((error) => {
            this.errors.push(error.message);
          });
      }
    },
  },
};
</script>
