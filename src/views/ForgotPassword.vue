<template>
  <div class="reset-password">
    <Modal v-if="modalOn" :modalMsg="modalMsg" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "ForgotPassword",
  components: {
    email,
    Modal,
    Loading,
  },
  data() {
    return {
      email: null,
      modalOn: false,
      modalMsg: "",
      loading: null,
    };
  },
  methods: {
    closeModal() {
      this.modalOn = !this.modalOn;
      this.email = "";
    },
    resetPassword() {
      this.loading = true;
      //--Firebase password reset function-----------------------------------------------------------
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMsg =
            "If your account already exists, you will recieve a email to your email address";
          this.loading = false;
          this.modalOn = true;
        })
        .catch((err) => {
          this.modalMsg = err.message;
          this.loading = false;
          this.modalOn = true;
        });
    },
  },
};
</script>

<style></style>
