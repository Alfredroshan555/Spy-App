<template>
  <div id="app">
    <!-- <input type="text" v-model="input" />
    <button @click="getLocation">Search</button> -->
    <div class="center-button">
      <button class="button-1" @click="showServices">Show Services</button>
    </div>
    <div class="city">
      <h2>{{ city }}</h2>
    </div>
    <div class="container">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import axios from "axios";

export default {
  name: "Leaflet",
  component: {},
  data() {
    return {
      map: "",
      datas: "",
      input: "",
      marker: [],
      lat: "",
      long: "",
      city: "",
    };
  },
  mounted() {
    this.map = leaflet.map("map").setView([10.5276, 76.2144], 9);
    leaflet
      .tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmcmVkNTU1IiwiYSI6ImNreDcxMXh4NDMxNG4yb3A4Z2lheDR2Z2cifQ.T3oUPe2RMArV_v7eduyl0A",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 10,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoiYWxmcmVkNTU1IiwiYSI6ImNreDcxMXh4NDMxNG4yb3A4Z2lheDR2Z2cifQ.T3oUPe2RMArV_v7eduyl0A",
        }
      )
      .addTo(this.map);
    leaflet.Control.geocoder().addTo(this.map);
  },

  methods: {
    async getLocation() {
      await axios
        .get(
          `https://geo.ipify.org/api/v1?apiKey=at_FBTi0rGPhQlKp2cRdOJV0t3Mibq6F&ipAddress=${this.input}`
        )
        .then((res) => {
          this.datas = res.data;
          this.city = res.data.location.city;
          this.lat = res.data.location.lat;
          this.long = res.data.location.lng;
          console.log(this.datas);
          console.log(this.lat);
          console.log(this.long);
        });
      leaflet.marker([this.lat, this.long]).addTo(this.map);
      this.map.setView([this.lat, this.long], 13);
    },
    showServices() {
      this.$router.push({ name: "Services" });
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map {
  height: 400px;
}
</style>
