<template>
    <div v-for="post in filteredPosts" :key="post.postId" class="forum-posts">
        <CommentCard :post="post" :userId="this.userId" @delete-post="deleteForumPost" :displayIcons="this.displayIcons" @update-post="updateForumPost" />
    </div>
</template>

<script>
import CommentCard from "@/components/ForumPage/CommentCard.vue";
import firebaseApp from "@/firebase.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
    components: {
        CommentCard
    },
    props: {
        userId: {
            type: String,
            required: true
        },
        filteredPosts: {
            type: Array,
            required: true
        },
        displayIcons: {
            type: Boolean,
        }
    },
    setup() {
        const deleteForumPost = async (id) => {
            const forumRef = collection(db, "forum");
            const forumSnap = await getDocs(forumRef);
            forumSnap.forEach(async (document) => {
                const forumPosts = document.data().forumPosts;
                const updatedPosts = forumPosts.filter((post) => post.postId !== id);
                await updateDoc(doc(db, "forum", document.id), {
                    forumPosts: updatedPosts
                });
            });
            alert("Post deleted successfully");
            setTimeout(() => {
                location.reload();
            }, 200);
        };

        const updateForumPost = async (post) => {
            const forumRef = collection(db, "forum");
            const forumSnap = await getDocs(forumRef);
            forumSnap.forEach(async (document) => {
                const forumPosts = document.data().forumPosts;
                const updatedPosts = forumPosts.map((p) => {
                    if (p.postId === post.postId) {
                        return post;
                    }
                    return p;
                });
                await updateDoc(doc(db, "forum", document.id), {
                    forumPosts: updatedPosts
                });
            });
            alert("Post updated successfully");
            // Set a fixed time to reload the page
            setTimeout(() => {
                location.reload();
            }, 200);
        };

        return {
            deleteForumPost,
            updateForumPost
        };
    },
}
</script>

<style scoped>
.forum-posts {
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
}
</style>