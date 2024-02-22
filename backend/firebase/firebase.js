import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC9vuIi1DZhbAYg4R8QQpC6JvRvuXzWftE",
  authDomain: "inturn-d9b53.firebaseapp.com",
  projectId: "inturn-d9b53",
  storageBucket: "inturn-d9b53.appspot.com",
  messagingSenderId: "1074015507217",
  appId: "1:1074015507217:web:a818768f7c0d784ca172b0",
  measurementId: "G-RHVWP7GREH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = firebase.firestore();

export { db };