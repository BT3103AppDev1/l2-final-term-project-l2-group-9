<template>
    <div class="comment-card-container">
        <div class="content-wrapper">
            <div class="firstComponent" >
                <div class="post-details">
                    <h2>{{ this.post.title }}</h2>
                    <p> {{ this.post.details }}</p>
                </div>
                <div class = "pencil" v-if="this.userId === this.post.id || this.displayIcons" @click="openForumModal">
                    <font-awesome-icon :icon="['fas', 'pencil']" class="pencil-icon" style="color: #000000;" />
                </div>
                <div class="delete" v-if="this.userId === this.post.id || this.displayIcons" @click="deleteForumPost">
                    <font-awesome-icon :icon="['fas', 'trash-can']" class="trash-icon" />
                </div>
            </div>
            <ForumModal v-if="this.forumModalVisibility" :edit-mode="true" @close-modal-edit-mode="disableForumModal" @forumPostCreated="updatingForumPost" :post="this.post"/>
            <div class="secondComponent">
                <div class="profileDetails">
                    <p>Posted by: {{ this.post.name }}</p>
                </div>
                <div class="like-date-details">
                    <span> {{ this.post.daysAgo }} days ago</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ForumModal from "@/components/ForumPage/ForumModal.vue";

export default {
    name: "CommentCard",
    components: {
        ForumModal,
    },
    props: {
        post: Object,
        userId: String,
        displayIcons: Boolean,
    },
    data() {
        return {
            createdDaysAgo: 0,
            forumModalVisibility: false,
        };
    },
    mounted() {
        const datePostedSeconds = this.post.datePosted.seconds;
        const currentDate = new Date();
        const currentDateSeconds = currentDate.getTime() / 1000;
        const daysAgo = Math.floor((currentDateSeconds - datePostedSeconds) / 86400);
        this.post.daysAgo = daysAgo;
    },
    methods: {
        // Set an alert to confirm the deletion of the post
        deleteForumPost() {
            if (confirm("Are you sure you want to delete this post?")) {
                this.$emit("delete-post", this.post.postId);
            }
        },
        openForumModal() {
            this.forumModalVisibility = true;
        },
        disableForumModal() {
            this.forumModalVisibility = false;
        },
        updatingForumPost(post) {
            this.$emit("update-post", post);
        },p
    },
};
</script>

<style scoped>
.comment-card-container {
    display: flex;
    /* Use flexbox */
    flex-direction: column;
    background-color: white;
    height: fit-content;
    width: 180vh;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid #000000;
}

.post-details {
    flex: 1;
}

.comment-card-container h2 {
    margin-left: 30px;
    font-weight: 700;
}

.comment-card-container p {
    font-size: 15px;
    margin: 15px;
    margin-left: 30px;
}

.delete {
    margin-right: 32px;
    margin-top: 12px;
    cursor: pointer;
}

.trash-icon {
    font-size: 2em;
}
.pencil {
    margin-top: 12px;
    margin-left: 32px;
    margin-right: 16px;
    cursor: pointer;
}
.pencil-icon {
    font-size: 2em;
}
.firstComponent {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-top: 4px;
}

.secondComponent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.profileDetails {
    display: flex;
    flex-direction: row;
}

.profileDetails p {
    margin-left: 32px;
}

.icon-wrapper {
    margin-top: 5px;
    margin-left: 28px;
    display: flex;
    background: radial-gradient(circle, #000000 0%, #333333 100%);
    /* Gradient background */
    border-radius: 50%;
    /* Makes the div circular */
    width: 40px;
    /* Adjust as needed */
    height: 40px;
    /* Adds some space around the icon */
    border: 1px solid #ffffff;
    /* Larger shadow for more depth */
    color: #ffffff;
}

.like-date-details {
    padding-right: 24px;
    padding-bottom: 12px;
}

.like-section {
    display: flex;
    align-items: center;
}

.like-section p {
    margin-left: 4px;
}
</style>
