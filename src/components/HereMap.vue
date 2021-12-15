<template>
  <div>
    <div class="select">
      <h1>Select Country and Region</h1>

      <!-- <country-select
        v-model="country"
        :country="country"
        topCountry="US"
        autocomplete="country"
      />

      <region-select
        v-model="region"
        :country="country"
        autocomplete="address-level1"
      /> -->
      <!-- <p>Region is: {{ region }}</p>
      <button @click="changeTo('CA')">CA</button>
      <button @click="changeTo('NV')">NV</button> -->
    </div>
    <div class="container">
      <div class="center-button">
        <button class="button-1" @click="showServices">Show Services</button>
      </div>
    </div>
    <div id="map">
      <!--In the following div the HERE Map will render-->

      <div
        id="mapContainer"
        style="height:600px;width:100%"
        ref="hereMap"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
    center: Object,
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "XIjfp-NEte-zbfrFS1zPkAyhLidpxfSqc7Wx2FgG1b0",
      // You can get the API KEY from developer.here.com
      country: "US",
      region: "CA",
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
  },
  methods: {
    changeTo(region) {
      console.log(`Changing country to US`);
      this.country = "US";
      this.$nextTick(function() {
        console.log(`Changing region to ${region}`);
        this.region = region;
      });
    },
    showServices() {
      this.$router.push({ name: "Services" });
    },
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    },
  },
};
</script>

<style scoped>
/* #map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 50px;
}

.select {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
}
.container {
  height: 200px;
  position: relative;
}
.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
} */
</style>
