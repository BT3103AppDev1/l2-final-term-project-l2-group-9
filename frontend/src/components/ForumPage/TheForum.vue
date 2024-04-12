<template>
    <div class="forum-page">
        <h1>Forum</h1>
        <CreatePost />
    </div>

</template>

<script>
import CreatePost from './CreatePost.vue';
import firebaseApp from "../../firebase.js";
import {
    getFirestore,
    collection,
    getDoc,
    doc,
    setDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
    name: "TheForum",
    components: {
        CreatePost,
    },
    data() {
        return {
            title: '',
            paragraph: '',
            submitted: false,
        };
    },
    methods: {
        submitForm() {
            this.submitted = true;
        },
    },
};
</script>

<style scoped>
.forum-page {
    background-color: #ffffff;
    color: #000000;
    height: 90vh;
}
</style>