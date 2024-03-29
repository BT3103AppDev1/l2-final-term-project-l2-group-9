import "./assets/main.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')