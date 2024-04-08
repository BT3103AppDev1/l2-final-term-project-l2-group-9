<template>
    <div class="test-container">
        <TrackingCard
            v-for="job in jobsPostings"
            :key="job.id"
            :job="job"
            @updateJob="handleUpdateJob"
            @deleteJob="handleDeleteJob"
            @updateDetail="handleUpdateDetail"
        />
    </div>
</template>

<script>
import TrackingCard from "./components/TrackingPage/TrackingCard.vue";

export default {
    name: "TestingPage",
    components: {
        TrackingCard,
    },
    data() {
        return {
            jobsPostings: [
                {
                    id: 1,
                    title: "Algorithm Engineering Intern at Optiver",
                    date: "May 07, 2024",
                    details:
                        "Revise on Data Structures and Algorithms - Graph Theory, Heaps, Dynamic Programming",
                    status: "Interview",
                    logo: "",
                },
                {
                    id: 2,
                    title: "Software Engineering Intern at Google",
                    date: "May 07, 2024",
                    details:
                        "Revise on Data Structures and Algorithms - Graph Theory, Heaps, Dynamic Programming",
                    status: "Interview",
                    logo: "",
                },
                {
                    id: 3,
                    title: "Software Engineering Intern at Facebook",
                    date: "May 07, 2024",
                    details:
                        "Revise on Data Structures and Algorithms - Graph Theory, Heaps, Dynamic Programming",
                    status: "Interview",
                    logo: "",
                },
            ],
        };
    },
    methods: {
        handleUpdateJob(job) {
            console.log("Job updated:", job);
        },
        handleDeleteJob(jobId) {
            console.log("Job deleted:", jobId);
        },
        handleUpdateDetail(jobId, details) {
            console.log(`Details updated for job ${jobId}:`, details);
        },
    },
};
</script>

<style scoped>
.test-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
</style>
