<template>
    <div class="relative" v-if="user">
        <ForumContent class="absolute-fill" :userId="this.user.uid" />
    </div>
</template>

<script>
import ForumContent from "@/components/ForumPage/ForumContent.vue";
import firebaseApp from "@/firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
export default {
    name: "ForumPage",
    components: {
        ForumContent,
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
                // Get the user's username
                const userDoc = await getDoc(doc(db, "users", this.user.uid));
                if (userDoc.exists()) {
                    this.userName = userDoc.data().username;
                }
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
