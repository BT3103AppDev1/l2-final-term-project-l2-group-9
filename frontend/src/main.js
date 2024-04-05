import "./assets/main.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueClickAway from "vue3-click-away";

library.add(fas);

createApp(App).use(router).use(VueClickAway).component("font-awesome-icon", FontAwesomeIcon).mount('#app')