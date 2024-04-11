<template>
    <div v-if="user">
        <ProfilePicture :userName="this.userName" :userId="this.user.uid" />
        <ProfilePosts />
    </div>
</template>

<script>
import ProfilePicture from "../components/ProfilePage/ProfilePicture.vue";
import ProfilePosts from "../components/ProfilePage/ProfilePosts.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    name: "ProfilePage",
    components: {
        ProfilePicture,
        ProfilePosts,
    },
    data() {
        return {
            user: false,
            userName: "",
        };
    },
    async mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.user = user;
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                this.userName = userDoc.data().username;
            } else {
                // Change the route to the login page
                this.$router.push("/login");
            }
        });
    },
};
</script>

<style scoped></style>
