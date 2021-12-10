import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app";
import "firebase/auth";

import * as VueGoogleMaps from "vue2-google-maps";
import vueCountryRegionSelect from "vue-country-region-select";

Vue.use(Vue2Editor);
Vue.use(vueCountryRegionSelect);

Vue.config.productionTip = false;



Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyALSlT0ESoeyai_3T_1--dVGXrUaappIE0",
        libraries: "places"
    }
});

let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {

        new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");

    }
});