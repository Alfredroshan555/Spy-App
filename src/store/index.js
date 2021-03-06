import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        profileAdmin: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null,
    },
    mutations: {
        setProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().firstName;
            state.profileLastName = doc.data().lastName;
            state.profileUsername = doc.data().username;
        },
        setProfileInitials(state) {
            state.profileInitials =
                state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
        },
        updateUser(state, payload) {
            state.user = payload;
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload;
        },
        changeLastName(state, payload) {
            state.profileLastName = payload;
        },
        changeUsername(state, payload) {
            state.profileUsername = payload;
        },
    },
    actions: {
        async getCurrentUser({ commit }) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const dbResults = await dataBase.get();
            commit("setProfileInfo", dbResults);
            commit("setProfileInitials");
            console.log(dbResults);
        },
        async updateUserSettings({ commit, state }) {
            const dataBase = await db.collection("users").doc(state.profileId);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUsername,

            });
            commit("setProfileInitials");
        }
    },
    modules: {}
})