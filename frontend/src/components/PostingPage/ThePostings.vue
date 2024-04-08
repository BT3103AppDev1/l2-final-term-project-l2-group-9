<template>
  <div class="posting-page">
    <h1>Search Internship Positions for</h1>
    <div class="filter-search-container">
      <div class="filter-container">
        <button class="filter-button">
          <img src="@/assets/filter.svg" alt="Filter" /> <span>Filter</span>
        </button>
      </div>
      <div class="search-container">
        <!-- Search bar -->
        <button @click="search" class="search-button">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000" />
        </button>

        <input type="text" v-model="searchTerm" @keyup.enter="search" placeholder="Search for job titles"
          class="search-bar" />
      </div>
    </div>
    <div class="content-container">
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        Loading...
      </div>
      <div v-else class="posting-cards-container">
        <div v-for="job in jobs" :key="job.jobID" @click="selectJob(job)" class="posting-card">
          <PostingCard :employer-logo="job.employerLogo" :title="job.jobTitle" :company="job.employerName"
            :location="job.jobLocation" :duration="job.jobDuration" :posted-time="job.jobPostDate" />
        </div>
      </div>
      <div v-if="!isLoading && selectedJob" class="job-detail-container">
        <DescriptionCard :employer-logo="selectedJob.employerLogo" :title="selectedJob.jobTitle"
          :company="selectedJob.employerName" :location="selectedJob.jobLocation" :duration="selectedJob.jobDuration"
          :posted-time="selectedJob.jobPostDate" :job-desc="selectedJob.jobDesc" :apply-link="selectedJob.applyLink"
          :job="selectedJob" @add-to-tracker="addPosting" />
      </div>
    </div>
    <button @click="resetLocalStorage">Reset Local Storage</button>
  </div>
</template>

<script>
import PostingCard from "./PostingCard.vue";
import filterJobs from "../../services/filterJobs";
import DescriptionCard from "./DescriptionCard.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'

const db = getFirestore(firebaseApp)
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
    };
  },
  methods: {
    async search() {
      console.log("Searching for:", this.searchTerm);
      const searchKey = `${this.searchTerm}, Intern Singapore`;

      this.isLoading = true; // Set loading state to true before fetching data

      // Check if the search results are in local storage
      if (localStorage.getItem(searchKey)) {
        this.jobs = JSON.parse(localStorage.getItem(searchKey));
      } else {
        // If not in local storage, fetch the results and store them in local storage
        this.jobs = await filterJobs(searchKey);
        localStorage.setItem(searchKey, JSON.stringify(this.jobs));
      }
      this.selectedJob = this.jobs[0];
      this.isLoading = false; // Set loading state to false after fetching data
    },
    resetLocalStorage() {
      localStorage.removeItem("Intern, Singapore");
      console.log("Local storage cleared");
      this.jobs = [];
    },
    selectJob(job) {
      this.selectedJob = job;
      console.log(this.selectedJob);
    },
    /* Firebase method to add a new posting to the database called tracker*/
    async addPosting() {
      const postingsCollection = collection(db, 'tracker')
      const posting = {
        jobID: this.selectedJob.jobID,
        appliedDate: new Date(),
        jobStatus: 'Applied',
        jobTitle: this.selectedJob.jobTitle,
        employerName: this.selectedJob.employerName,
        employerLogo: this.selectedJob.employerLogo,
        jobLocation: this.selectedJob.jobLocation,
        jobDesc: this.selectedJob.jobDesc,
      }
      // Check if there is postings in the database
      const postingSnapshot = await getDoc(doc(postingsCollection, this.userId))
      if (postingSnapshot.exists()) {
        // If there is, add the new job to the existing list
        const postingList = postingSnapshot.data().trackedApplications
        // Check if the job is already in the list with the job ID
        if (postingList.some((job) => job.jobID === this.selectedJob.jobID)) {
          console.log('Job already exists in the list')
          return
        }
        postingList.push(posting)
        await setDoc(doc(postingsCollection, this.userId), {
          trackedApplications: postingList
        })
      } else {
        // If there is no postings, create a new list with the job
        await setDoc(doc(postingsCollection, this.userId), {
          trackedApplications: [posting]
        })
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
    this.selectedJob = this.jobs[0];
    this.isLoading = false; // Set loading state to false after fetching data
  },
};
</script>

<style scoped>
.posting-page {
  background-color: #ffffff;
  color: #000000;
  height: 90vh;
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
  width: 30px;
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
</style>
