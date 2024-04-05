<template>
  <div v-for="menuItem in menuItems" :key="menuItem.id" v-if="user">
    <router-link :to="menuItem.route" class="menu-item" @click.native="menuItem.name === 'Logout' ? signOut() : $emit('close-sidebar')">
      <img :src="menuItem.icon" alt="icon" />
      <h2>{{ menuItem.name }}</h2>
    </router-link>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import PostingsIcon from "../assets/postings.svg";
import TrackerIcon from "../assets/tracker.svg";
import ForumIcon from "../assets/forum.svg";
import LogoutIcon from "../assets/logout.svg";

export default {
    name: "SideBar",
    data() {
        return {
            menuItems: [
                { id: 1, name: "Postings", route: "/postings", icon: PostingsIcon},
                { id: 2, name: "Tracker", route: "/tracker", icon: TrackerIcon},
                { id: 3, name: "Forum", route: "/forum", icon: ForumIcon},
                { id: 4, name: "Logout", route: "/", icon: LogoutIcon},
            ],
            user: false,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    },
    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
                .then(() => {
                    this.user = false;
                    this.$emit("close-sidebar");
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.error(error);
            });
        }
    }
};

</script>


<style scoped>
.menu-item {
    padding: 16px;
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: row; 
    cursor: pointer;
    margin-bottom: 8px;
}

.menu-item img {
    width: 36px;
    height: 36px;
    margin-right: 16px;
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(110%) contrast(107%);
}


</style>