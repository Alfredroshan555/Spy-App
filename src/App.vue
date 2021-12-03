<template>
  <div class="app-wrapper">
    <div class="app">
      <Navbar v-if="!navigation" />
      <GoogleMap v-if="user && !mapView" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";
import GoogleMap from "./components/GoogleMap.vue";
export default {
  name: "app",
  components: { Navbar, Footer, GoogleMap },
  data() {
    return {
      navigation: null,
      mapView: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
        console.log(this.$store.state.profileEmail);
      }
    });
    this.checkUserRoutes();
    console.log(firebase.auth().currentUser);
  },
  mounted() {},
  methods: {
    checkUserRoutes() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword" ||
        this.$route.name === "Profile"
      ) {
        this.navigation = true;
        this.mapView = true;

        return;
      }
      this.navigation = false;
      this.mapView = false;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  watch: {
    $route() {
      this.checkUserRoutes();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
</style>
