<template>
  <div class="posting-page">
    <h1>Search Internship Positions for</h1>
    <div class="filter-search-container">
      <div class="filter-container" v-click-away="onClickAway">
        <button class="filter-button" @click="toggleFilterModal">
          <img src="@/assets/filter.svg" alt="Filter" />
          <span>Filter</span>
        </button>

        <transition name="slide-fade">
          <div class="modal" v-show="showModal">
            <div class="modal-content">
              <h2>Filters</h2>
              <button class="close-modal" @click="toggleFilterModal">✕</button>
              <div class="filter-section">
                <h3>Listing Date</h3>
                <label v-for="option in dateOptions" :key="option.id">
                  <input
                    type="radio"
                    name="dateOption"
                    v-model="selectedDateOption"
                    :value="option.id"
                  />
                  {{ option.label }}
                </label>
              </div>
              <div class="filter-section">
                <h3>Internship Period</h3>
                <label v-for="option in periodOptions" :key="option.id">
                  <input type="checkbox" v-model="option.selected" />
                  {{ option.label }}
                </label>
              </div>
              <button class="apply-button" @click="applyFilters">Apply</button>
            </div>
          </div>
        </transition>
      </div>

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
          placeholder="Search for job titles"
          class="search-bar"
        />
      </div>
    </div>
    <div class="content-container">
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        Loading...
      </div>
      <div v-else class="posting-cards-container">
        <div
          v-for="job in jobs"
          :key="job.jobID"
          @click="selectJob(job)"
          class="posting-card"
        >
          <PostingCard
            :employer-logo="job.employerLogo"
            :title="job.jobTitle"
            :company="job.employerName"
            :location="job.jobLocation"
            :duration="job.jobDuration"
            :posted-time="job.jobPostDate"
          />
        </div>
      </div>
      <div v-if="!isLoading && selectedJob" class="job-detail-container">
        <DescriptionCard
          :employer-logo="selectedJob.employerLogo"
          :title="selectedJob.jobTitle"
          :company="selectedJob.employerName"
          :location="selectedJob.jobLocation"
          :duration="selectedJob.jobDuration"
          :posted-time="selectedJob.jobPostDate"
          :job-desc="selectedJob.jobDesc"
          :apply-link="selectedJob.applyLink"
          :job-id="selectedJob.jobID"
          :job="selectedJob"
          :user-id="userId"
          @add-to-tracker="addPosting"
          @remove-from-tracker="removePosting"
        />
      </div>
    </div>
    <!-- <button @click="resetLocalStorage">Reset Local Storage</button> -->
  </div>
</template>

<script>
import PostingCard from "./PostingCard.vue";
import filterJobs from "../../services/filterJobs";
import DescriptionCard from "./DescriptionCard.vue";
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
  name: "ThePostings",
  components: {
    PostingCard,
    DescriptionCard,
  },
  props: {
    userId: String,
    required: true,
  },
  data() {
    return {
      searchTerm: "",
      jobs: [],
      isLoading: false, // Add a loading state
      selectedJob: null,
      showModal: false,
      selectedDateOption: null,
      dateOptions: [
        { id: "newToOld", label: "New to Old", selected: false },
        { id: "oldToNew", label: "Old to New", selected: false },
      ],
      periodOptions: [
        { id: "3months", label: "3 months", selected: false },
        { id: "6months", label: "6 months", selected: false },
        { id: "greater6months", label: "> 6 months", selected: false },
        { id: "partTime", label: "Part-time", selected: false },
      ],
    };
  },
  methods: {
    toggleFilterModal() {
      this.showModal = !this.showModal;
    },
    onClickAway() {
      this.showModal = false;
    },
    applyFilters() {
      const filters = {
        date: this.selectedDateOption,
        period: this.periodOptions
          .filter((option) => option.selected)
          .map((option) => option.label),
      };

      this.filterAndSortJobs(filters);
      this.toggleFilterModal(); // Close the modal after applying filters
    },

    filterAndSortJobs(filters) {
      // Start with a copy of the original jobs array
      this.search();
      if (filters.date === "newToOld") {
        this.jobs.sort((a, b) => b.jobPostDateTime - a.jobPostDateTime);
      } else if (filters.date === "oldToNew") {
        this.jobs.sort((a, b) => a.jobPostDateTime - b.jobPostDateTime);
      }
    },

    async search() {
      let searchKey = `${this.searchTerm} Intern Singapore`;
      // Collect selected periods
      const selectedPeriods = this.periodOptions
        .filter((option) => option.selected)
        .map((option) => option.label);

      // Append selected periods to the searchKey if any
      if (selectedPeriods.length > 0) {
        const periodsString = selectedPeriods.join(", ");
        searchKey += ` ${periodsString}`;
      }
      this.isLoading = true; // Set loading state to true before fetching data

      // Check if the search results are in local storage
      if (localStorage.getItem(searchKey)) {
        this.jobs = JSON.parse(localStorage.getItem(searchKey));
      } else {
        // If not in local storage, fetch the results and store them in local storage
        this.jobs = await filterJobs(searchKey);
        localStorage.setItem(searchKey, JSON.stringify(this.jobs));
      }
      this.jobs.sort((a, b) => b.jobPostDateTime - a.jobPostDateTime);

      this.selectedJob = this.jobs[0];
      this.isLoading = false; // Set loading state to false after fetching data
    },

    resetLocalStorage() {
      localStorage.removeItem("Intern, Singapore");
      this.jobs = [];
    },
    selectJob(job) {
      this.selectedJob = job;
    },
    /* Firebase method to add a new posting to the database called tracker*/
    async addPosting() {
      const postingsCollection = collection(db, "tracker");
      let appliedDate = new Date();
      // Check if month is less than 10, add a 0 in front of the month
      if (appliedDate.getMonth() < 10) {
        appliedDate = `${appliedDate.getFullYear()}-0${
          appliedDate.getMonth() + 1
        }-${appliedDate.getDate()}`;
      } else {
        appliedDate = `${appliedDate.getFullYear()}-${
          appliedDate.getMonth() + 1
        }-${appliedDate.getDate()}`;
      }
      const posting = {
        id: this.selectedJob.jobID,
        date: appliedDate,
        status: "applied",
        title: this.selectedJob.jobTitle,
        company: this.selectedJob.employerName,
        logo: this.selectedJob.employerLogo,
        location: this.selectedJob.jobLocation,
        details: "",
      };
      // Check if there is postings in the database
      const postingSnapshot = await getDoc(
        doc(postingsCollection, this.userId)
      );
      if (postingSnapshot.exists()) {
        // If there is, add the new job to the existing list
        const postingList = postingSnapshot.data().trackedApplications;
        // Check if the job is already in the list with the job ID
        if (postingList.some((job) => job.id === this.selectedJob.jobID)) {
          console.log("Job already exists in the list");
          return;
        }
        postingList.push(posting);
        await setDoc(doc(postingsCollection, this.userId), {
          trackedApplications: postingList,
        });
      } else {
        // If there is no postings, create a new list with the job
        await setDoc(doc(postingsCollection, this.userId), {
          trackedApplications: [posting],
        });
      }
    },
    async removePosting() {
      const postingsCollection = collection(db, "tracker");
      const postingSnapshot = await getDoc(
        doc(postingsCollection, this.userId)
      );
      if (postingSnapshot.exists()) {
        const postingList = postingSnapshot.data().trackedApplications;
        const updatedList = postingList.filter(
          (job) => job.id !== this.selectedJob.jobID
        );
        await setDoc(doc(postingsCollection, this.userId), {
          trackedApplications: updatedList,
        });
      }
    },
  },
  async created() {
    const searchKey = "Intern, Singapore";

    this.isLoading = true; // Set loading state to true before fetching data

    // Check if the search results are in local storage
    if (localStorage.getItem(searchKey)) {
      this.jobs = JSON.parse(localStorage.getItem(searchKey));
    } else {
      // If not in local storage, fetch the results and store them in local storage
      this.jobs = await filterJobs(searchKey);
      localStorage.setItem(searchKey, JSON.stringify(this.jobs));
    }
    this.jobs.sort((a, b) => b.jobPostDateTime - a.jobPostDateTime);

    this.selectedJob = this.jobs[0];
    this.isLoading = false; // Set loading state to false after fetching data
  },
};
</script>

<style scoped>
.posting-page {
  background-color: #ffffff;
  color: #000000;
  height: 100vh;
}

.posting-page h1 {
  font-size: 2.6em;
  text-align: center;
  margin-top: 1em;
  font-family: "Poppins", sans-serif, Helvetica;
  font-weight: bold;
}

.filter-search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  /* Add some space between filter and search bar */
}

.filter-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  font-size: 1em;
  border: 1px solid #000000;
  border-radius: 20px;
  cursor: pointer;
  background-color: #ffffff;
  outline: none;
  border-width: 2px;
}

.filter-button span {
  font-size: 1.1rem;
  font-family: "Poppins", sans-serif, Helvetica;
}

.filter-button img {
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
}

.filter-button:hover {
  background-color: #9db2bf;
}

.search-container,
.filter-container {
  display: flex;
  justify-content: center;
  margin-top: 1em;
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

.posting-cards-container {
  overflow-y: auto;
  max-height: 65vh;
  padding: 1em;
  max-width: 35vw;
  margin-left: 2rem;
  margin-top: 2rem;
  flex: 1;
}

.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.5em;
}

.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #859dac;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.content-container {
  display: flex;
  justify-content: space-between;
}

.job-detail-container {
  overflow-y: auto;
  max-height: 65vh;
  max-width: 100vw;
  margin-right: 2rem;
  margin-top: 2rem;
  flex: 1;
}

.filter-container {
  position: relative; /* This makes the absolute positioning of .modal work as expected */
}

.modal {
  display: block;
  position: absolute; /* Position the modal relative to its nearest positioned ancestor */
  top: 100%; /* Position it right below the filter button */
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border-radius: 8px;
  overflow: hidden; /* This will contain the children inside the modal */
  transform-origin: top center; /* Sliding effect will animate from the top */
}

.modal-content {
  padding: 10px;
  /* This width should be adjusted to match your design requirements */
  width: 300px;
}

.filter-option {
  padding: 10px 20px;
  border-bottom: 1px solid #eee; /* Just an example to separate options */
}

/* Transition for the sliding effect */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: scaleY(1);
  opacity: 1;
}

.modal-content {
  position: relative;
  /* Rest of your modal content styles */
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.filter-section h3 {
  margin: 0.5rem 0;
}

.filter-section label {
  display: block;
  margin: 0.5rem 0;
}

.apply-button {
  margin-top: 1rem;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px; /* Adjust size as needed */
  font-weight: bold;
  text-transform: uppercase; /* Optional: makes the button text uppercase */
  border: none; /* Removes the default border */
  background-color: #859dac;
  border-radius: 5px; /* Gives the button rounded corners */
  color: white; /* White text color */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth transitions for hover effects */
}

.apply-button:hover {
  transform: translateY(-2px); /* Slightly raise the button */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* Increased shadow for a "lifting" effect */
}

.apply-button:active {
  transform: translateY(1px); /* Slightly depress the button */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); /* Decrease shadow to give a "pressed" effect */
}
</style>
