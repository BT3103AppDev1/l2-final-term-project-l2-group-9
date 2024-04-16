<template>
    <nav class="nav-bar">
        <div class="left-logos">
            <router-link to="/postings" v-if="$route.path !== '/postings'">
                <img
                    class="arrow"
                    src="@/assets/images/back-to-board.svg"
                    alt="arrow"
                />
            </router-link>
            <div class="logo">
                <img
                    src="../assets/images/NavBarInTurnLogoName.png"
                    alt="InTurn Logo"
                    class="logo"
                />
            </div>
        </div>
        <ul class="right-logos">
            <li>
                <router-link to="/profile">
                    <div class="icon-wrapper">
                        <img
                            v-if="!isFetching"
                            :src="profileUrl"
                            alt="Profile Picture"
                        />
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/tracker">
                    <div class="icon-wrapper">
                        <font-awesome-icon
                            :icon="['fas', 'clipboard-list']"
                            size="xl"
                            style="color: #ffffff"
                        />
                    </div>
                </router-link>
            </li>
            <li>
                <div class="icon-wrapper" @click="$emit('toggle-sidebar')">
                    <font-awesome-icon
                        :icon="['fas', 'bars']"
                        size="xl"
                        style="color: #ffffff"
                    />
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import defaultImage from "../assets/images/Default_pfp.svg.png"; // Ensure the path is correct
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase"; // Ensure this points to your firebase config file
import { mapGetters } from "vuex";

import {
    getStorage,
    ref as storageRef,
    listAll,
    getMetadata,
    getDownloadURL,
} from "firebase/storage";

const storage = getStorage(firebaseApp);
export default {
    name: "NavBar",

    computed: {
        ...mapGetters(["userProfile"]),
    },

    data() {
        return {
            user: null,
            userName: "",
            profileUrl: "", // Use the imported default image
            isFetching: true, // True when data fetching starts
        };
    },

    watch: {
        // Watch the userProfile from Vuex
        userProfile: {
            handler(newProfile) {
                this.profileUrl = newProfile.profileUrl; // Update data property when Vuex state changes
            },
            immediate: true, // This ensures the watcher is triggered immediately after the component is mounted
            deep: true, // Use deep watcher if userProfile contains nested data that might change
        },
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
            console.log(this.user);
            await this.fetchProfilePicture();
        });
    },

    methods: {
        async fetchProfilePicture() {
            const listRef = storageRef(
                storage,
                `profilePictures/${this.user.uid}`,
            );
            try {
                const result = await listAll(listRef);
                let found = false;
                for (const item of result.items) {
                    const metadata = await getMetadata(item);
                    if (
                        metadata.customMetadata &&
                        metadata.customMetadata.userId === this.user.uid
                    ) {
                        const url = await getDownloadURL(item);
                        this.profileUrl = url;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.profileUrl = defaultImage; // Use the imported default image
                }
            } catch (error) {
                console.error("Failed to fetch profile picture:", error);
                this.profileUrl = defaultImage; // Fallback image on error
            } finally {
                this.isFetching = false;
            }
        },
    },
};
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: #9db2bf;
    /* White background color */
    height: 10vh;
    overflow: hidden;
    width: 100vw;
}

.logo img {
    height: 15vh;
    overflow: hidden;
}

.right-logos {
    display: flex;
    list-style: none;
    /* Remove default bullet points */
    padding-right: 20px;
    /* Remove default padding */
    margin: 0;
    /* Remove default margin */
}

.right-logos li {
    margin-left: 2rem;
    /* Add some margin between icons */
}

.right-logos a {
    text-decoration: none;
    /* Remove underline */
}

.right-logos img {
    width: 45px;
    /* Match the width of the .icon-wrapper class */
    height: 45px;
    /* Match the height of the .icon-wrapper class */
    border-radius: 50%;
    /* Make the image circular */
    object-fit: cover;
    /* Ensure the image covers the entire area */
}

.icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, #000000 0%, #333333 100%);
    /* Gradient background */
    border-radius: 50%;
    /* Makes the div circular */
    width: 45px;
    /* Adjust as needed */
    height: 45px;
    /* Adjust as needed */
    padding: 10px;
    /* Adds some space around the icon */
    border: 1px solid #ffffff;
    /* Adds a white border */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    /* Larger shadow for more depth */
    color: #ffffff;
    /* White icon color */
    cursor: pointer;
}
.arrow {
    width: 48px;
    height: 48px;
    cursor: pointer;
    filter: invert(92%) sepia(15%) saturate(122%) hue-rotate(166deg)
        brightness(99%) contrast(90%);
}
.left-logos {
    display: flex;
    align-items: center;
}
</style>
