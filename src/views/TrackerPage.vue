<template>
    <div class="relative" v-if="user">
        <TrackingPage class="absolute-fill" :userId="user.uid" />
    </div>
</template>

<script>
import TrackingPage from "@/components/TrackingPage/TrackingPage.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: "TrackerPage",
    components: {
        TrackingPage,
    },
    data() {
        return {
            user: false,
        };
    },
    async mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.user = user;
            } else {
                // Change the route to the login page
                this.$router.push("/login");
            }
        });
    },
};
</script>

<style scoped>
.relative {
    position: relative;
    height: 82vh;
}

.absolute-fill {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
