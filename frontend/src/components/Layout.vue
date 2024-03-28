<template>
  <div id="app"><NavBar v-if="showNavBar" /> <router-view /></div>
</template>

<script>
import { watch } from "vue";
import NavBar from "./NavBar.vue";

export default {
  name: "Layout",
  components: {
    NavBar,
  },
  data() {
    return {
      showNavBar: true, // Initially show navbar
    };
  },
  created() {
    this.updateNavBarVisibility();
    watch(() => this.$route.path, this.updateNavBarVisibility);
  },
  methods: {
    updateNavBarVisibility() {
      const excludedRoutes = ["/", "/register"]; // Routes without navbar
      this.showNavBar = !excludedRoutes.includes(this.$route.path);
    },
  },
};
</script>
