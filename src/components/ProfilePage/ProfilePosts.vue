<template>
    <div class="forum-posts">
        <h1>My Posts</h1>
        <ForumPosts :userId="this.userId" :filteredPosts="this.filteredPosts" :displayIcons="true" />
    </div>
</template>

<script>
import ForumPosts from '../ForumPage/ForumPosts.vue';
import firebaseApp from '@/firebase.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
    name: 'ProfilePosts',
    components: {
        ForumPosts,
    },
    props: {
        userId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            filteredPosts: [],
        };
    },
    created() {
        this.getForumPosts();
    },
    methods: {
        async getForumPosts() {
            const forumRef = collection(db, "forum");
            const forumSnap = await getDocs(forumRef);
            forumSnap.forEach((document) => {
                if (document.id === this.userId) {
                    this.filteredPosts = document.data().forumPosts;
                }
            });
        },
    },
};

</script>

<style scoped>
.forum-posts {
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column; /* Organize children in a column */
    justify-content: center; /* Center children vertically */
    align-items: center; /* Center children horizontally */
    color: black;
}

.forum-posts h1 {
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px; 
}
</style>

