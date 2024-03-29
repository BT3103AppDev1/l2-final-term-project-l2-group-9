<template>
  <div class="card">
    <div class="company-logo">
      <img :src="logoSource" alt="Company Logo" />
    </div>
    <div class="card-content">
      <h2 class="job-title">{{ title }}</h2>
      <p class="company-name">{{ company }}</p>
      <div class="job-info">
        <span class="location"
          ><i class="fas fa-map-marker-alt"></i> {{ location }}</span
        >
      </div>
      <div class="card-footer">
        <span class="time-posted">{{ postedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import defaultLogo from "@/assets/images/logo-placeholder.png";

export default {
  name: "PostingCard",
  props: {
    employerLogo: String,
    title: String,
    company: String,
    location: String,
    duration: String,
    postedTime: String,
  },
  data() {
    return {
      defaultLogo,
    };
  },
  computed: {
    logoSource() {
      const logo =
        this.employerLogo !== null ? this.employerLogo : this.defaultLogo;
      return logo;
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 1em;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
}

.company-logo img {
  width: 3vw; /* Adjust as needed */
  height: auto;
  object-fit: contain;
  margin-right: 1rem;
}
</style>
