import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { initializeApp } from "firebase/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

const firebaseConfig = {
  apiKey: "AIzaSyC9vuIi1DZhbAYg4R8QQpC6JvRvuXzWftE",
  authDomain: "inturn-d9b53.firebaseapp.com",
  projectId: "inturn-d9b53",
  storageBucket: "inturn-d9b53.appspot.com",
  messagingSenderId: "1074015507217",
  appId: "1:1074015507217:web:a818768f7c0d784ca172b0",
  measurementId: "G-RHVWP7GREH",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
