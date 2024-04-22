<template>
    <div id="tracking-page">
        <div id="left-container" class="containers">
    
            <div id="status-bubble" class="bubble">
                <div id="status-header">
                    <img src="@/assets/images/message-circle.svg" class="circle-icon" />
                    <h2 class="status-name">Status</h2>
                    <div id="all" class="mini-status" @click="setFilter(null)">All</div>
                </div>
                <div id="statuses-1" class="statuses">
                    <div id="applied" class="mini-status" @click="setFilter('applied')">Applied</div>
                    <div id="pending" class="mini-status" @click="setFilter('pending')">Pending</div>
                    <div id="interview" class="mini-status" @click="setFilter('interview')">Interview</div>
                </div>
                <div id="statuses-2" class="statuses">
                    <div id="offered" class="mini-status" @click="setFilter('offered')">Offered</div>
                    <div id="rejected" class="mini-status" @click="setFilter('rejected')">Rejected</div>
                    <div id="closed" class="mini-status" @click="setFilter('closed')">Closed</div>
                </div>
            </div>
    
            <div id="charts-bubble" class="bubble">
                <div id="charts-header">
                    <img src="@/assets/images/pie-chart.svg" class="pie-chart-icon" />
                    <h2 class="charts-name">Charts</h2>
                </div>

                <div id="timeline" @click="toggleTimelineModal">
                    <img src="@/assets/images/timeline.png" id="timeline-icon" class="charts" />
                    <h3 class="application-timeline">Application Timeline</h3>
                </div>
                <timeline-modal :visible="showTimelineModal" @close="showTimelineModal = false" :jobs="jobs"></timeline-modal>

                <div id="piepiechart" @click="togglePieModal">
                    <img src="@/assets/images/yesyesyes.png" id="pie-icon" class="charts" />
                    <h3 class="application-pie-chart">
                        Application Process Pie Chart
                    </h3>
                </div>
                <pie-modal :visible="showPieChartModal" @close="showPieChartModal = false" :jobs="jobs"></pie-modal>

            </div>
    
        </div>
    
        <div id="right-container" class="containers">
            <div id="managing-bar" class="bubble">
                <!-- Add New Tracker Button -->
                <!-- Tracking Modal -->
                <tracking-modal :visible="showModal" @add-job="addJob" @close-modal="closeModal" />
                <div class="add-tracker-button">
                    <button @click="showModal = true">+</button>
                </div>
            </div>
    
            <!-- Tracking Cards Container -->
            <div class="tracking-cards-container">
                <tracking-card v-for="job in filteredJobs" :key="job.id" :job="job" @update-job="updateJob" @delete-job="deletedJob" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TrackingCard from "./TrackingCard.vue";
import TrackingModal from "./TrackingModal.vue";
import TimelineModal from './TimelineModal.vue';
import PieModal from './PieModal.vue';

export default {
    name: "TrackingPage",
    components: {
        TrackingCard,
        TrackingModal,
        TimelineModal,
        PieModal
    },
    data() {
        return {
            showModal: false,
            currentFilter: null,
            showTimelineModal: false,
            showPieChartModal: false,
        };
    },
    created() {
        this.fetchJobs(); // Fetch jobs when component is created
    },

    computed: {
        ...mapState({
            jobs: (state) => state.jobs, // Access jobs directly from Vuex state
        }),

        filteredJobs() {
            if (!this.currentFilter) {
                return this.jobs;
            }
            return this.jobs.filter(job => job.status.toLowerCase() === this.currentFilter);
        },
    },

    methods: {
        ...mapActions([
            "fetchJobs", // Assuming you have an action to fetch jobs
            "addJob", // Action to add a job
            "updateJob", // Action to update a job
            "deleteJob", // Action to delete a job
        ]),

        setFilter(status) {
            this.currentFilter = status;
        },

        toggleTimelineModal() {
            this.showTimelineModal = !this.showTimelineModal;
        },

        togglePieModal() {
            this.showPieChartModal = !this.showPieChartModal;
        },

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
    max-height: 90vh;
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

#all {
    margin-left: auto;
    cursor: pointer;
    position: relative;
    padding: 10px 20px;
    background: white;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: all 1s;
    &:after,
    &:before {
        content: " ";
        width: 10px;
        height: 10px;
        position: absolute;
        border: 0px solid #fff;
        transition: all 1s;
    }
    &:after {
        top: -1px;
        left: -1px;
        border-top: 5px solid black;
        border-left: 5px solid black;
    }
    &:before {
        bottom: -1px;
        right: -1px;
        border-bottom: 5px solid black;
        border-right: 5px solid black;
    }
    &:hover {
        border-top-right-radius: 0px;
        border-bottom-left-radius: 0px;
        &:before,
        &:after {
            width: 100%;
            height: 100%;
        }
    }
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
    cursor: pointer;
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
#piepiechart,
#piechart {
    align-items: center;
    text-align: center;
    display: flex;
    font-size: 1em;
}

#timeline-icon {
    height: 145px;
    width: auto;
    cursor: pointer;
}

#pie-icon {
    height: 130px;
    width: auto;
    cursor: pointer;
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
    transition: all 0.4s ease 0s;
}

.add-tracker-button:hover {
    opacity: 0.7;
    transition: all 0.4s ease 0s;
}

.tracking-cards-container {
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 5px;
}
</style>
