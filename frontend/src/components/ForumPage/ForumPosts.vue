<template>
    <div v-for="post in posts" :key="post.id" class="forum-posts">
        <CommentCard :post="post" />
    </div>
</template>

<script>
import CommentCard from "@/components/ForumPage/CommentCard.vue";

export default {
    components: {
        CommentCard
    },
    data () {
        return {
            posts: [
                {
                    id: 1,
                    title: "Apple Software Engineer Summer Internship",
                    description: "helloo, can I get some advice for the interview with the hiring manager for Apple Software Engineer Summer Internship? I would love to know your experience and the potential live coding questions they’ll ask! tyvm 🙏🏼",
                    name: "John Doe",
                    likes: 100,
                    daysAgo: 2
                },
                {
                    id: 2,
                    title: "Google Software Engineer Internship",
                    description: "Has anyone interviewed for the Google Software Engineer Internship? What was your experience like and what kind of questions did they ask?",
                    name: "Jane Doe",
                    likes: 50,
                    daysAgo: 3
                },
                {
                    id: 3,
                    title: "Facebook Data Science Internship",
                    description: "I'm preparing for the Facebook Data Science Internship interview. Any tips or advice would be greatly appreciated!",
                    name: "John Smith",
                    likes: 2,
                    daysAgo: 10
                },
                {
                    id: 4,
                    title: "Foodpanda Backend Engineer",
                    description: "I have an interview with Foodpanda for a Backend Engineer position. Can anyone share their experience with the interview process and the types of questions they ask?",
                    name: "Jane Smith",
                    likes: 1,
                    daysAgo: 15
                },
            ]
        }
    }
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