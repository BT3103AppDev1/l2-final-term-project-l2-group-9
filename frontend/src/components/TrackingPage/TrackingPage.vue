<template>
  <div id="tracking-page">
    <div id="left-container" class="containers">
      <div id="status-bubble" class="bubble">
        <div id="status-header">
          <img src="@/assets/images/message-circle.svg" class="circle-icon" />
          <h2 class="status-name">Status</h2>
        </div>
        <div id="statuses-1" class="statuses">
          <div id="applied" class="mini-status">Applied</div>
          <div id="pending" class="mini-status">Pending</div>
          <div id="interview" class="mini-status">Interview</div>
        </div>
        <div id="statuses-2" class="statuses">
          <div id="offered" class="mini-status">Offered</div>
          <div id="rejected" class="mini-status">Rejected</div>
          <div id="closed" class="mini-status">Closed</div>
        </div>
      </div>
      <div id="charts-bubble" class="bubble">
        <div id="charts-header">
          <img src="@/assets/images/pie-chart.svg" class="pie-chart-icon" />
          <h2 class="charts-name">Charts</h2>
        </div>
        <div id="timeline">
          <img
            src="@/assets/images/timeline.png"
            id="timeline-icon"
            class="charts"
          />
          <h3 class="application-timeline">Application Timeline</h3>
        </div>
        <div id="funnelchart">
          <img
            src="@/assets/images/funnel.png"
            id="funnel-icon"
            class="charts"
          />
          <h3 class="application-funnel-chart">
            Application Process Funnel Chart
          </h3>
        </div>
        <div id="piechart">
          <img
            src="@/assets/images/yesyesyes.png"
            id="another-pie-icon"
            class="charts"
          />
          <h3 class="job-role-pie-chart">Job Role Pie Chart</h3>
        </div>
      </div>
    </div>

    <div id="right-container" class="containers">
      <div id="managing-bar" class="bubble">
        <!-- Add New Tracker Button -->
        <!-- Tracking Modal -->
        <tracking-modal
          :visible="showModal"
          @add-job="addJob"
          @close-modal="closeModal"
        />
        <div class="add-tracker-button">
          <button @click="showModal = true">+</button>
        </div>
      </div>

      <!-- Tracking Cards Container -->
      <div class="tracking-cards-container">
        <tracking-card
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          @update-job="updateJob"
          @delete-job="deletedJob"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TrackingCard from "./TrackingCard.vue";
import TrackingModal from "./TrackingModal.vue";

export default {
  name: "TrackingPage",
  components: {
    TrackingCard,
    TrackingModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  created() {
    this.fetchJobs(); // Fetch jobs when component is created
    this.sortJobsDescending();
  },

  computed: {
    ...mapState({
      jobs: (state) => state.jobs, // Access jobs directly from Vuex state
    }),
  },

  methods: {
    ...mapActions([
      "fetchJobs", // Assuming you have an action to fetch jobs
      "addJob", // Action to add a job
      "updateJob", // Action to update a job
      "deleteJob", // Action to delete a job
    ]),

    deletedJob(deletedJob) {
      console.log(deletedJob);
      // Here you can add any confirmation or additional logic before deletion
      const confirmDeletion = confirm(
        `Are you sure you want to delete the job`
      );
      if (confirmDeletion) {
        this.deleteJob(deletedJob); // Call Vuex action
      }
    },

    closeModal() {
      this.showModal = false;
    },
    sortJobsDescending() {
      this.jobs.sort((a, b) => b.id - a.id);
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif, Helvetica;
  color: #27374d;
}

#tracking-page {
  display: flex;
  justify-content: center;
  font-family: "Poppins", sans-serif, Helvetica;
  background-color: #f2f2f2f2;
}

.containers {
  padding-top: 43px;
  padding-left: 40px;
}

#left-container {
  width: 25%;
}

#right-container {
  width: 75%;
  padding-right: 40px;
  max-height: 85vh;
}

.bubble {
  color: #27374d;
  border-radius: 20px;
}

#status-header,
#charts-header {
  display: flex;
  padding: 0 10px;
  padding-top: 10px;
}

.status-name,
.charts-name {
  margin-left: 15px;
}

.statuses {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-status:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  transition: 0.2s;
}

#statuses-1 {
  margin-top: 10px;
}

#statuses-2 {
  margin-bottom: 20px;
}

.mini-status {
  border-radius: 15px;
  margin: 5px;
  background-color: #526d82;
  width: 30%;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: black;
}

#applied {
  color: white;
}

#pending {
  background-color: #a4d0a4;
}

#interview {
  background-color: #ffead2;
}

#offered {
  background-color: #00bf63;
  color: white;
}

#rejected {
  background-color: #ce243b;
  color: white;
}

#closed {
  background-color: #85586f;
  color: white;
}

#status-bubble,
#charts-bubble {
  background-color: #fff;
  border-radius: 20px;
}

#status-bubble {
  margin-bottom: 15px;
  height: 17vh;
}

#charts-bubble {
  height: 60vh;
}

.charts {
  padding: 20px;
}

#timeline,
#funnelchart,
#piechart {
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1em;
}

#timeline-icon {
  height: 145px;
  width: auto;
}

#funnel-icon {
  height: 130px;
  width: auto;
}

#another-pie-icon {
  height: 140px;
  width: auto;
}

#managing-bar {
  background-color: #27374d;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 20px;
}

.add-tracker-button button {
  font-size: 24px;
  line-height: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #5fad4b;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tracking-cards-container {
  max-height: 69.2vh;
  overflow-y: auto;
  padding-right: 5px;
}
</style>
