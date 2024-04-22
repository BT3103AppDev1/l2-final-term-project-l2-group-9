<template>
    <div class="tracking-card" @click="closeDropdown">
        <div class="date-dropdown" @click.stop="toggleDropdown">
            <div class="job-date">{{ job.date }}</div>
            <div class="dropdown">
                <div class="selected-option" :class="selectedClass">
                    {{ selectedLabel }}
                    <img
                        src="@/assets/images/chevron-down.svg"
                        class="chevron"
                        alt="chevron-dropdown"
                    />
                </div>
                <div class="dropdown-content" v-show="showDropdown">
                    <div
                        v-for="option in options"
                        :key="option.value"
                        :class="['dropdown-option', option.colorClass]"
                        @click.stop="selectOption(option)"
                    >
                        {{ option.label }}
                    </div>
                </div>
            </div>
        </div>

        <div class="job-info">
            <img
                :src="job.logo || defaultLogo"
                alt="Company Logo"
                class="company-logo"
            />
            <div class="job-title">
                {{ job.title }} <span>{{ job.company }}</span>
            </div>
        </div>

        <div class="job-notes-detail-trash">
            <img
                src="@/assets/images/notes.png"
                class="notes-icon"
                alt="Notes"
                tabindex="0"
                @click.stop="toggleNotesInput"
                @keyup.enter="toggleNotesInput"
            />
            <input
                v-show="showNotesInput"
                v-model="job.details"
                @blur="saveDetails"
                @keyup.enter="saveDetails"
                type="text"
                placeholder="Add details..."
                class="notes-input"
            />
            <div class="job-details" @click="editDetails">
                {{ job.details }}
            </div>
            <img
                src="@/assets/images/trash.svg"
                class="delete-icon"
                @click.stop="emitJobDeletion"
                alt="Delete"
            />
        </div>
    </div>
</template>

<script>
import defaultLogo from "@/assets/images/logo-placeholder.png";

export default {
    name: "TrackerCard",
    props: {
        job: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            defaultLogo,
            logoSource: defaultLogo,
            showDropdown: false,
            showNotesInput: false,
            tempDetails: "", // Temporary state for the details
            options: [
                { value: "applied", label: "Applied", colorClass: "applied" },
                { value: "pending", label: "Pending", colorClass: "pending" },
                {
                    value: "interview",
                    label: "Interview",
                    colorClass: "interview",
                },
                { value: "offered", label: "Offered", colorClass: "offered" },
                {
                    value: "rejected",
                    label: "Rejected",
                    colorClass: "rejected",
                },
                { value: "closed", label: "Closed", colorClass: "closed" },
            ],
        };
    },
    mounted() {
        document.addEventListener("click", this.closeDropdown);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.closeDropdown);
    },
    created() {
        const initialOption = this.options.find(
            (option) => option.value === this.job.status.toLowerCase(),
        );
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {
            this.job.status = option.value;
            this.showDropdown = false;
            this.emitJobUpdate();
        },
        emitJobUpdate() {
            this.$emit("update-job", this.job);
        },
        emitJobDeletion() {
            this.$emit("delete-job", this.job.id);
        },
        toggleNotesInput() {
            this.tempDetails = this.job.details; // Initialize tempDetails with the current details
            this.showNotesInput = true;
        },

        saveDetails() {
            this.showNotesInput = false;
            this.emitJobUpdate();
        },

        editDetails() {
            this.toggleNotesInput(); // When job details are clicked, show input for editing
        },
        closeDropdown(event) {
            if (!this.$el.contains(event.target)) {
                this.showDropdown = false;
            }
        },
    },
    computed: {
        logoPath() {
            const imageName =
                this.job.company.toLowerCase().replace(/\s+/g, "-") + ".png";
            try {
                return require(`@/assets/images/logos/${imageName}`);
            } catch (e) {
                return this.defaultLogo; // Use the default logo if specific logo not found
            }
        },
        selectedLabel() {
            const initialOption = this.options.find(
                (option) => option.value === this.job.status.toLowerCase(),
            );
            return (initialOption && initialOption.label) || "Status";
        },
        selectedClass() {
            const option = this.options.find(
                (o) => o.value === this.job.status.toLowerCase(),
            );
            return option ? option.colorClass : "";
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
.tracking-card {
    font-family: "Poppins", sans-serif, Helvetica;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    border-radius: 20px;
    color: black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
}

.dropdown {
    cursor: pointer;
}

.date-dropdown {
    margin-bottom: 0.5%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-size: 1.5em;
    color: #a6a6a6;
}

.selected-option {
    color: black;
    border-radius: 8px;
    text-align: center;
    align-items: center;
    font-size: 0.85em;
    padding-left: 8px;
    transition: all 0.3s ease 0s;
}

.selected-option:hover {
    opacity: 0.7;
    transition: 0.3s ease 0s;
}

.dropdown-content {
    align-items: center;
    text-align: center;
    font-size: 0.7em;
}

.dropdown-option {
    border-radius: 10px;
}

/* Styles for each option based on the selection */

.applied {
    background-color: #526d82;
    color: white;
}

.pending {
    background-color: #a4d0a4;
    color: black;
}

.interview {
    background-color: #ffead2;
    color: black;
}

.offered {
    background-color: #00bf63;
    color: white;
}

.rejected {
    background-color: #ce243b;
    color: white;
}

.closed {
    background-color: #85586f;
    color: white;
}

.chevron {
    transform: translateY(20%);
    width: 20%;
    height: auto;
}

.job-info {
    display: flex;
    align-items: center;
    font-weight: 600;
}

.company-logo {
    margin-right: 16px;
    width: 50px;
    height: auto;
}

.job-title,
.job-company {
    font-size: 1.5em;
}

.job-notes-detail-trash {
    align-items: center;
    margin-top: 2%;
    display: flex;
    font-size: 1.2em;
}

.notes-icon,
.delete-icon {
    height: auto;
    cursor: pointer;
    position: relative;
    z-index: 10;
}

.notes-icon {
    margin-right: 1%;
    width: 4%;
    height: auto;
}

.notes-icon:hover,
.delete-icon:hover {
    opacity: 50%;
    transform: scale(1.1);
    transition: transform 0.3s ease;
}

.delete-icon {
    width: 3%;
    margin-left: auto;
}

.notes-input {
    font-family: "Poppins", sans-serif;
    font-size: 1em;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    width: 60%;
    margin-right: 1%;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
}

</style>
