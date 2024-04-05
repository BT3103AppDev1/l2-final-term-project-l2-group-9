<template>
  <div class="job-card">
    <div class="top-section">
      <img :src="logoSource" alt="Company Logo" class="company-logo" />
      <div class="info-and-actions">
        <div class="job-details">
          <h2 class="job-title">{{ title }}</h2>
          <h3 class="company-name">{{ company }}</h3>
          <div class="location">{{ location }}</div>
        </div>
        <div class="job-actions">
          <button class="tracker-button">Add to Tracker</button>
          <a :href="applyLink" target="_blank" class="apply-button"
            >Apply Now
            <font-awesome-icon
              :icon="['fas', 'arrow-up-right-from-square']"
              style="color: #ffffff"
              class="apply-icon"
          /></a>
        </div>
      </div>
    </div>
    <div class="job-description" v-html="formattedJobDesc"></div>
    <div class="footer">
      <span class="posted-time">{{ postedTime }}</span>
    </div>
  </div>
</template>

<script>
import defaultLogo from "@/assets/images/logo-placeholder.png";

export default {
  name: "DescriptionCard",
  props: {
    employerLogo: String,
    title: String,
    company: String,
    location: String,
    postedTime: String,
    jobDesc: String,
    applyLink: String,
  },
  data() {
    return {
      logo: null,
    };
  },
  watch: {
    employerLogo: {
      deep: true,

      immediate: true,
      handler(newValue) {
        this.updateLogo(newValue);
      },
    },
  },
  computed: {
    formattedJobDesc() {
      const bulletPoints = this.jobDesc.split("\n");
      const mappedArray = bulletPoints.map((item) =>
        item === "" ? "\n" : item
      );
      const htmlContent = mappedArray
        .map((item) => (item === "\n" ? "<br><br>" : item))
        .join("");
      const bp = htmlContent.split("•");
      const finalContent = bp.map((item) => `<br>• ${item}`).join("");
      return finalContent;
    },

    logoSource() {
      return this.logo;
    },
  },

  methods: {
    async updateLogo(logoUrl) {
      const isValid = await this.isValidImage(logoUrl);
      this.logo = isValid ? logoUrl : defaultLogo;
      console.log(logoUrl, this.logo, isValid);
    },
    isValidImage(url) {
      return new Promise((resolve) => {
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    },
  },
};
</script>

<style scoped>
.job-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.top-section {
  display: flex;
  align-items: start;
}
.info-and-actions {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}
.company-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 20px;
}

.job-title {
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.2;
}

.company-name {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.location {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.job-actions {
  display: flex;
  gap: 10px;
  align-self: start;
}

.tracker-button,
.apply-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(to right, #9db2bf, #526d82);
  font-size: 0.9rem;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  outline: none;
  margin-top: 2vh;
}

.apply-button::after {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.tracker-button:hover,
.apply-button:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.apply-icon {
  margin-left: 0.25rem;
}
.job-description {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 20px;
}

.footer {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}

.posted-time {
  color: #666;
  margin-left: auto;
}
</style>
