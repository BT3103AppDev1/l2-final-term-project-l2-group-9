<template>
    <div class="comment-card-container">
        <div class="post-details">
            <h2>Apple Software Engineer Summer Internship</h2>
            <p>helloo, can I get some advice for the interview with the hiring manager for Apple Software Engineer Summer Internship? I would love to know your experience and the potential live coding questions they’ll ask! tyvm 🙏🏼</p>
        </div>
        <div class="delete">
            <font-awesome-icon :icon="['fas', 'trash-can']" class = "trash-icon"/>
        </div>
    </div>
</template>

<style scoped>
.comment-card-container {
    display: flex; /* Use flexbox */
    background-color: white;
    height: 22vh;
    width: 180vh;
    margin-bottom: 20px;
    justify-content: space-between; /* Align items at the beginning and end of the container */
    align-items: center; /* Align items vertically at the center */
}

.post-details {
    flex: 1; /* Take up remaining space */
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
    margin-right: 80px;
}

.trash-icon {
    font-size: 2em;
}
</style>
