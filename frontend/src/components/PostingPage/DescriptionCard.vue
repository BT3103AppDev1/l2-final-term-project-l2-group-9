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
                    <button
                        class="tracker-button"
                        @click="
                            trackerAdded ? removeFromTracker() : addToTracker()
                        "
                    >
                        {{
                            trackerAdded
                                ? "Remove from Tracker"
                                : "Add to Tracker"
                        }}
                    </button>
                    <a :href="applyLink" target="_blank" class="apply-button"
                        >Apply Now
                        <font-awesome-icon
                            :icon="['fas', 'arrow-up-right-from-square']"
                            style="color: black"
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
import firebaseApp from "../../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import defaultLogo from "@/assets/images/logo-placeholder.png";
import { mapGetters } from "vuex";
const db = getFirestore(firebaseApp);
export default {
    name: "DescriptionCard",
    props: {
        job: Object,
        employerLogo: String,
        title: String,
        company: String,
        location: String,
        postedTime: String,
        jobDesc: String,
        applyLink: String,
        jobId: String,
        userId: String,
    },
    data() {
        return {
            logo: null,
            trackerAdded: false,
        };
    },
    watch: {
        // Keep track of the lastest change in jobId whenever a new posting is selected
        jobId: {
            immediate: true,
            handler() {
                this.checkTracker();
            },
        },
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
                item === "" ? "\n" : item,
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
        ...mapGetters(['isJobTracked']),
    },
    methods: {
        async updateLogo(logoUrl) {
            const isValid = await this.isValidImage(logoUrl);
            this.logo = isValid ? logoUrl : defaultLogo;
        },
        isValidImage(url) {
            return new Promise((resolve) => {
                let img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        },

        addToTracker() {
            this.$emit("add-to-tracker", this.job);
            this.trackerAdded = true;
        },
        removeFromTracker() {
            this.$emit("remove-from-tracker", this.job);
            this.trackerAdded = false;
        },
        async checkTracker() {
            this.trackerAdded = this.isJobTracked(this.jobId);
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
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 30px;
    color: black;
    cursor: pointer;
    text-decoration: none;
    background: #c2dae9;
    font-size: 0.9rem;
    white-space: nowrap;
    outline: none;
    margin-top: 2vh;
    font-family: "Poppins", sans-serif, Helvetica;
    font-weight: bold;
    position: relative;
    top: 0;
    box-shadow:
        8px 8px 15px #a3b1c6,
        -8px -8px 15px #ffffff; /* Inset shadow for neomorphism */
    transition: all 0.3s ease;
}

.tracker-button:hover,
.apply-button:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    top: 3px;
}

.apply-button::after {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
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

.tracker-button:active .apply-button:active {
    box-shadow:
        inset 5px 5px 10px #a3b1c6,
        inset -5px -5px 10px #ffffff;
    color: #333;
}
</style>
