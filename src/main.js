import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app";
import "firebase/auth";

import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(Vue2Editor);

Vue.config.productionTip = false;



Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyBIRJtrerNQOQ_qX5zZz1i6LK7yDJ4bixc",
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