<template>
  <div class="test-container">
    <!-- Bind the component's emitted events to the corresponding methods -->
    <TrackingCard
      :job="testJob"
      @update-job="handleUpdateJob"
      @delete-job="handleDeleteJob"
      @update-detail="handleUpdateDetail"
    />
  </div>
</template>

<script>
import TrackingCard from './components/TrackingPage/TrackingCard.vue'; 

export default {
  name: 'TestingPage',
  components: {
    TrackingCard // Register the TrackingCard component
  },
  data() {
    return {
      // Sample test data for TrackingCard
      testJob: {
        id: 1,
        title: 'Algorithm Engineering Intern at Optiver',
        date: 'May 07, 2024',
        details: 'Revise on Data Structures and Algorithms - Graph Theory, Heaps, Dynamic Programming',
        status: 'Interview',
        logo: '',
      }
    };
  },
  methods: {
    handleUpdateJob(job) {
      console.log('Job updated:', job);
    },
    handleDeleteJob(jobId) {
      console.log('Job deleted:', jobId);
    },
    handleUpdateDetail(jobId, details) {
      console.log(`Details updated for job ${jobId}:`, details);
    }
  }
}
</script>

<style scoped>
.test-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
