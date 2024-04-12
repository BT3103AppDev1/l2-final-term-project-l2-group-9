<template>
    <div class="relative" v-if="user">
        <TheForum class="absolute-fill" :userId="user.uid" />
    </div>
</template>

<script>
import TheForum from "../components/ForumPage/TheForum.vue";
import firebaseApp from "../firebase.js";
import {
    getFirestore,
    collection,
    getDoc,
    doc,
    setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
    name: "ForumPage",
    components: {
        TheForum,
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
                await this.fetchAndUpdateDatabase(user);
            } else {
                // Change the route to the login page
                this.$router.push("/login");
            }
        });
    },
    methods: {
        async fetchAndUpdateDatabase(user) {
            const usersCollection = collection(db, "users");
            const userSnapshot = await getDoc(doc(usersCollection, user.uid));
            if (userSnapshot.exists()) {
                this.username = userSnapshot.data().username;
            } else {
                await this.addUserToDatabase(user);
            }
        },
        async addUserToDatabase(user) {
            const usersCollection = collection(db, "users");
            await setDoc(doc(usersCollection, user.uid), {
                username: user.displayName,
                email: user.email,
            });
        },
    },
};
</script>

<style scoped>
</style>