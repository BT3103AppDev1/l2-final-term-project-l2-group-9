<template>
    <div class="forum-page">
        <h1>InTurn Forum</h1>
        <div class="search-create-container">
            <div class="search-container">
                <!-- Search bar -->
                <button @click="search" class="search-button">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000" />
                </button>

                <input type="text" v-model="searchTerm" @keyup.enter="search" placeholder="Search Topics"
                    class="search-bar" />
            </div>
            <ForumModal v-if="showModal" @forumPostCreated="updateForumPosts" @close-modal="closeForumModal"
                 />
            <button class="create-button" @click="createForumPost">
                <span>Create Post</span>
            </button>
        </div>
        <div class="sort-by">
            <strong>Sort by:</strong>
            <select v-model="sortOrder" class="options">
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <!-- <option value="most-liked">Most Liked to Least Liked</option>
                <option value="least-liked">Least Liked to Most Liked</option> -->
            </select>
        </div>
        <div class="forum-posts">
            <ForumPosts :userId="this.userId" :filteredPosts="this.sortedPosts" />
        </div>
    </div>
</template>

<script>
import ForumPosts from "@/components/ForumPage/ForumPosts.vue";
import ForumModal from "@/components/ForumPage/ForumModal.vue";
import firebaseApp from "@/firebase.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, getDocs } from "firebase/firestore";



const db = getFirestore(firebaseApp);

export default {
    name: "ForumContent",
    components: {
        ForumPosts,
        ForumModal,
    },
    props: {
        userId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            searchTerm: "",
            showModal: false,
            forumPosts: [],
            filteredPosts: [],
            sortOrder: "newest"
        };
    },
    created() {
        this.getForumPosts();
    },
    computed: {
        sortedPosts() {
            const posts = [...this.filteredPosts]
            switch (this.sortOrder) {
                case 'newest':
                    posts.sort((a, b) => b.datePosted.seconds - a.datePosted.seconds);
                    break;
                case 'oldest':
                    posts.sort((a, b) => a.datePosted.seconds - b.datePosted.seconds);
                    break;
            }
            return posts;
        }
    },
    methods: {
        async search() {
            if (!this.searchTerm) {
                this.filteredPosts = this.forumPosts;
                return;
            }
            this.filteredPosts = this.forumPosts.filter(post => post.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
        },
        async getForumPosts() {
            const forumRef = collection(db, "forum");
            const forumSnap = await getDocs(forumRef);
            forumSnap.forEach((doc) => {
                const forumPosts = doc.data().forumPosts;
                const docId = doc.id;
                forumPosts.forEach((post) => {
                    // Add index of the post in the array
                    post.id = docId;
                    this.forumPosts.push(post);
                });
            });
            this.filteredPosts = this.forumPosts;
            this.search();
        },
        createForumPost() {
            this.showModal = true;
        },
        closeForumModal() {
            this.showModal = false;
        },
        async updateForumPosts(forumPost) {
            const userRef = doc(db, "forum", this.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const forumPosts = userSnap.data().forumPosts;
                forumPosts.push(forumPost);

                await updateDoc(userRef, {
                    forumPosts: forumPosts,
                });
            } else {
                await setDoc(userRef, {
                    forumPosts: [forumPost],
                });
            }
            this.showModal = false;
        },
    },
};
</script>

<style>
.forum-page {
    background-color: #ffffff;
    color: #000000;
    height: 90vh;
}

.forum-page h1 {
    font-size: 2.6em;
    text-align: center;
    margin-top: 1em;
    font-family: "Poppins", sans-serif, Helvetica;
    font-weight: bold;
}

.search-create-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    margin-top: 8px;
}

.create-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    font-size: 1em;
    border: 1px solid #000000;
    border-radius: 20px;
    cursor: pointer;
    background-color: #9db2bf;
    outline: none;
    border-width: 2px;
}

.create-button span {
    font-size: 1.1rem;
    font-weight: bold;
    font-family: "Poppins", sans-serif, Helvetica;
}

.search-container {
    display: flex;
    justify-content: center;
}

.search-bar {
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #000000;
    border-radius: 0 15px 15px 0;
    outline: none;
    border-left: none;
    border-width: 2px;
    font-size: 18px;
}

.search-button {
    padding: 0.5em 1em;
    background-color: #ffffff;
    color: black;
    border: 1px solid #000000;
    border-radius: 15px 0 0 15px;
    cursor: pointer;
    border-right: none;
    border-width: 2px;
    width: 40px;
}

.search-bar::placeholder {
    color: #27374d;
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif, Helvetica;
}

.search-button:hover {
    background-color: #859dac;
}

.sort-by {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
    margin-right: 16px;
}

.options {
    cursor: pointer;
    margin-left: 4px;
}

.forum-posts {
    padding-top: 16px;
}
</style>
