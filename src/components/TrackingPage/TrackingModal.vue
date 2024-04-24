<template>
  <div class="modal-overlay" v-if="visible" @click.self="closeModal">
    <div class="modal-content">
      <h2>Add a new Internship Application</h2>
      <form @submit.prevent="submitForm">
        <!-- Job Comapny Input -->
        <input
          type="text"
          v-model="newJob.company"
          placeholder="Company"
          required
          class="form-input"
        />

        <!-- Job Title Input -->
        <input
          type="text"
          v-model="newJob.title"
          placeholder="Job Title"
          required
          class="form-input"
          @blur="appendAtToTitle"
        />

        <!-- Job Status Dropdown -->
        <select v-model="newJob.status" required class="form-select">
          <option disabled value="">Select Status</option>
          <option value="applied">Applied</option>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
          <option value="closed">Closed</option>
        </select>

        <!-- Job Date Picker -->
        <input type="date" v-model="newJob.date" required class="form-input" />

        <!-- Job Details Input -->
        <textarea
          v-model="newJob.details"
          placeholder="Add details... (e.g. Notes for upcoming Interview!)"
          rows="4"
          class="form-textarea"
          maxlength="100"
        ></textarea>

        <!-- Submit Button -->
        <button type="submit" class="form-button">Add To Tracker</button>
      </form>

      <!-- Close Button -->
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TrackingModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newJob: {
        id: null, // ID will be set on form submission
        company: "",
        title: "",
        date: "",
        status: "",
        details: "",
        logo: "", // don't know how to deal with this yet
      },
    };
  },
  methods: {
    ...mapActions([
      "addJob", // Maps `this.addJob()` to the Vuex store's `addJob` action
    ]),

    submitForm() {
      this.newJob.id = Date.now(); // assign a unique ID based on date
      this.addJob(this.newJob); // Dispatch the Vuex action
      this.closeModal();
    },

    appendAtToTitle() {
      if (this.newJob.title && !/ at$/i.test(this.newJob.title)) {
        this.newJob.title += " - ";
      }
    },
    resetForm() {
      this.newJob = {
        id: null,
        title: "",
        date: "",
        status: "",
        details: "",
        logo: "",
      };
    },
    closeModal() {
      this.resetForm();
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 55%;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
}

.form-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #45a049;
}

.close-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>
