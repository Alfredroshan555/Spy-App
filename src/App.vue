<template>
  <div class="app-wrapper">
    <div class="app">
      <Navbar v-if="!navigation" />
      <!-- <GoogleMap v-if="user && !mapView" /> -->
      <Leaflet v-if="user && !mapView" />
      <!-- <HereMap v-if="user && !mapView" /> -->
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
// import GoogleMap from "./components/GoogleMap.vue";
import Leaflet from "./components/Leaflet.vue";
// import HereMap from "./components/HereMap.vue";
export default {
  name: "app",
  components: { Navbar, Footer, Leaflet },
  data() {
    return {
      navigation: null,
      mapView: null,
      servicesPage: null,
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
    this.servicePageCheck();
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
    servicePageCheck() {
      if (this.$route.name === "Services") {
        this.mapView = !this.mapView;
      }
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
      this.servicePageCheck();
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
