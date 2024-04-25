<template>
    <div id="layout-container">
        <NavBar v-if="showNavBar" @toggle-sidebar="toggleSidebar" />
        <router-view />
    </div>
    <transition name="sidebar-slide">
        <div v-if="showSidebar" class="sidebar" v-click-away="onClickAway">
            <SideBar @close-sidebar="showSidebar = false" />
        </div>
    </transition>
    <div v-if="showSidebar" class="overlay"></div>
</template>

<script>
import { watch } from "vue";
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";

export default {
    name: "Layout",
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            showNavBar: true, // Initially show navbar
            showSidebar: false, // Initially hide sidebar
        };
    },
    created() {
        this.updateNavBarVisibility();
        watch(() => this.$route.path, this.updateNavBarVisibility);
    },
    methods: {
        updateNavBarVisibility() {
            const excludedRoutes = ["/", "/register", "/login"]; // Routes without navbar
            this.showNavBar = !excludedRoutes.includes(this.$route.path);
        },
        toggleSidebar() {
            this.showSidebar = !this.showSidebar;
        },
        onClickAway() {
            this.showSidebar = false;
        },
    },
};
</script>

<style scoped>
#layout-container {
    background-color: #f2f2f2;
    height: 100vh;
}
.sidebar {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 25%;
    height: 100%;
    padding: 32px;
    z-index: 20;
    box-shadow: 0 1px 25px rgba(0, 0, 0, 0.25);
    background-color: #27374d;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: right 2s ease;
}

.sidebar-slide-enter,
.sidebar-slide-leave-to {
    right: -100%;
}
</style>
