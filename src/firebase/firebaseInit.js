import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuRy5uG8s2qFGjjeHTH7-05yoP6Br4fwg",
    authDomain: "spy-app-4a2df.firebaseapp.com",
    projectId: "spy-app-4a2df",
    storageBucket: "spy-app-4a2df.appspot.com",
    messagingSenderId: "110887596031",
    appId: "1:110887596031:web:6c718997bfba8b429081ca"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();