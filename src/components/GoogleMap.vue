<template>
  <div>
    <div>
      <h2>Select City</h2>

      <label>
        <gmap-autocomplete
          @place_changed="initMarker"
          class="input"
        ></gmap-autocomplete>
        <div class="button">
          <button @click="addLocationMarker">Add</button>
        </div>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :zoom="14" :center="center" style="width:100%;  height: 600px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825,
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
    };
  },

  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .input {
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 8px;
//   width: 100%;
//   border: none;
//   background-color: #f2f7f6;
//   padding: 4px 4px 4px 30px;
//   height: 50px;
//   &:focus {
//     outline: none;
//   }
// }
// .button {
//   text-align: center;
// }
// h2 {
//   text-align: center;
//   padding-top: 20px;
//   padding-bottom: 10px;
// }
// button {
//   background-color: #303030;
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 10px;
// }
</style>
