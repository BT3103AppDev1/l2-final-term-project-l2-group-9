<template>
    <div class="forum-page">
        <h1>InTurn Community</h1>
        <div class="search-create-container">
            <div class="search-container">
                <!-- Search bar -->
                <button @click="search" class="search-button">
                    <font-awesome-icon
                        :icon="['fas', 'magnifying-glass']"
                        style="color: #000000"
                    />
                </button>

                <input
                    type="text"
                    v-model="searchTerm"
                    @keyup.enter="search"
                    placeholder="Search Topics"
                    class="search-bar"
                />
            </div>
            <button class="create-button" @click="createForumPost">
                <span>Create Post</span>
            </button>
        </div>
        <div class="sort-by">
            <strong>Sort by:</strong>
            <select class="options">
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
                <option value="most-liked">Most Liked to Least Liked</option>
                <option value="least-liked">Least Liked to Most Liked</option>
            </select>
        </div>
        <div class="forum-posts">
            <ForumPosts />
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ForumPosts from "@/components/ForumPage/ForumPosts.vue";

export default {
    name: "ForumContent",
    components: {
        ForumPosts,
    },
    data() {
        return {
            searchTerm: "",
        };
    },
    methods: {
        ...mapActions(["createForumPost"]),
        search() {
            this.$router.push({
                name: "ForumSearch",
                params: { searchTerm: this.searchTerm },
            });
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
