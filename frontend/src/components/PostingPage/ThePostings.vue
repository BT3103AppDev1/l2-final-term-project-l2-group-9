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
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      Loading...
    </div>
    <div v-else class="scrollable-container">
      <PostingCard
        v-for="job in jobs"
        :key="job.jobID"
        :employer-logo="job.employerLogo"
        :title="job.jobTitle"
        :company="job.employerName"
        :location="job.jobLocation"
        :duration="job.jobDuration"
        :posted-time="job.jobPostDate"
      />
    </div>
  </div>
</template>

<script>
import PostingCard from "./PostingCard.vue";
import filterJobs from "../../services/filterJobs";
export default {
  name: "ThePostings",
  components: {
    PostingCard,
  },
  data() {
    return {
      searchTerm: "",
      jobs: [],
      isLoading: false, // Add a loading state
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

      this.isLoading = false; // Set loading state to false after fetching data
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

    this.isLoading = false; // Set loading state to false after fetching data
  },
};
</script>

<style scoped>
.posting-page {
  background-color: #ffffff;
  color: #000000;
}

.posting-page h1 {
  font-size: 2.6em;
  text-align: center;
  margin-top: 0.2em;
  font-family: "Poppins", sans-serif, Helvetica;
  font-weight: bold;
}

.filter-search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em; /* Add some space between filter and search bar */
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
  width: 20px; /* Set the width of the image (adjust as needed) */
  height: 20px; /* Set the height of the image (adjust as needed) */
  margin-right: 0.5em; /* Add some space between the image and the text */
}

.filter-button:hover {
  background-color: #9db2bf; /* Darker button color on hover */
}

.search-container,
.filter-container {
  display: flex;
  justify-content: center;
  margin-top: 0.25em;
}

.search-bar {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #000000;
  border-radius: 0 15px 15px 0;
  outline: none;
  border-left: none; /* Remove the left border */
  border-width: 2px;
}

.search-button {
  padding: 0.5em 1em;
  background-color: #ffffff; /* Example button color */
  color: black;
  border: 1px solid #000000;
  border-radius: 15px 0 0 15px;
  cursor: pointer;
  border-right: none;
  border-width: 2px;
}

.search-bar::placeholder {
  color: #27374d;
  font-size: 1.1rem;
  font-family: "Poppins", sans-serif, Helvetica;
}
.search-button:hover {
  background-color: #859dac; /* Darker button color on hover */
}
.scrollable-container {
  overflow-y: auto; /* Enables vertical scrolling */
  max-height: 55vh; /* Adjust the height as required */
  padding: 1em;
  max-width: 35vw;
  margin-left: 2rem;
  margin-top: 2rem;
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
</style>
