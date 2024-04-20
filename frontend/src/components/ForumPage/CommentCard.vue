<template>
    <div class="comment-card-container">
        <div class="content-wrapper">
        <div class="firstComponent">
            <div class="post-details">
                <h2>{{ this.post.title }}</h2>
                <p> {{ this.post.description }}</p>
            </div>
            <div class="delete">
                <font-awesome-icon :icon="['fas', 'trash-can']" class="trash-icon" />
            </div>
        </div>
        <div class="secondComponent">
            <div class="profileDetails">
                <div class="icon-wrapper">
                    <img :src="profileUrl" />
                </div>
                <p>Posted by: {{ this.post.name }}</p>
            </div>
            <div class="like-date-details">
                <div class="like-section">
                    <p> {{ this.post.likes }} </p>
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" class="thumb-icon" />
                </div>
                <span> {{ this.post.daysAgo }} days ago</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "CommentCard",
    props: {
        post: Object,
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
    /* Take up remaining space */
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

.thumb-icon {
    cursor: pointer;
    font-size: 24px;
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
    margin-left: 8px;
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
