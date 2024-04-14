<template>
    <div class="forum-posts">
        <h1>My Posts</h1>
        <CommentCard />
    </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
    components: {
        CommentCard
    }
}
</script>

<style scoped>
.forum-posts {
    background-color: #f2f2f2;
    height: 30vh;
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
    margin-bottom: 10px; 
    margin-top: 10px;
}
</style>

