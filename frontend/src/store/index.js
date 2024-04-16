// src/store/index.js
import { createStore } from "vuex"; // Import createStore for Vue 3
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const store = createStore({
  state() {
    return {
      userProfile: {
        profileUrl: "",
      },
      jobs: [],
      user: null,
    };
  },

  mutations: {
    setUser(state, user) {
      console.log("Setting user:", user);
      state.user = user;
    },
    updateUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    addJob(state, job) {
      state.jobs.push(job);
    },
    updateJob(state, updatedJob) {
      const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobs.splice(index, 1, updatedJob);
      }
    },
    deleteJob(state, jobId) {
      state.jobs = state.jobs.filter((job) => job.id !== jobId);
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
  },

  actions: {
    checkUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    },

    setUserProfile({ commit }, userProfile) {
      commit("updateUserProfile", userProfile);
    },

    async fetchJobs({ commit, state }) {
      if (!state.user || !state.user.uid) {
        console.error("No user logged in or user ID is unavailable.");
        return;
      }
      try {
        const userRef = doc(db, "tracker", state.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const jobsData = docSnap.data().trackedApplications || [];
          console.log(jobsData);
          const jobs = jobsData.map(transformJob);
          commit("setJobs", jobs);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    },

    async addJob({ commit, state }, job) {
      if (!state.user || !state.user.uid) {
        console.error("No user logged in or user ID is unavailable.");
        return;
      }
      const userRef = doc(db, "tracker", state.user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          let trackedApplications = docSnap.data().trackedApplications || [];
          trackedApplications.push(job);
          await updateDoc(userRef, { trackedApplications });
          commit("addJob", job);
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error adding job to Firestore:", error);
      }
    },

    async updateJob({ commit, state }, updatedJob) {
      if (!state.user || !state.user.uid) {
        console.error("No user logged in or user ID is unavailable.");
        return;
      }
      const userRef = doc(db, "tracker", state.user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          let trackedApplications = docSnap.data().trackedApplications || [];
          const index = trackedApplications.findIndex(
            (job) => job.id === updatedJob.id
          );
          if (index !== -1) {
            trackedApplications[index] = updatedJob;
            await updateDoc(userRef, { trackedApplications });
            commit("updateJob", updatedJob);
          }
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error updating job in Firestore:", error);
      }
    },

    async deleteJob({ commit, state }, deletedJobID) {
      if (!state.user || !state.user.uid) {
        console.error("No user logged in or user ID is unavailable.");
        return;
      }
      const userRef = doc(db, "tracker", state.user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          let trackedApplications = docSnap.data().trackedApplications || [];
          trackedApplications = trackedApplications.filter(
            (job) => job.id !== deletedJobID
          );
          await updateDoc(userRef, { trackedApplications });
          commit("deleteJob", deletedJobID);
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error deleting job in Firestore:", error);
      }
    },
  },

  getters: {
    userProfile: (state) => state.userProfile,
    jobs: (state) => state.jobs,
    user: (state) => state.user,
  },
});

//Need to fix the trackedJob logic, as we are storing two different things onto the fire
function transformJob(trackedJob) {
  return {
    id: trackedJob.id,
    company: trackedJob.employerName || trackedJob.company,
    title: trackedJob.jobTitle || trackedJob.title,
    date: trackedJob.appliedDate || trackedJob.date,
    status: trackedJob.jobStatus || trackedJob.status,
    details: trackedJob.jobDetails || trackedJob.details,
    logo: trackedJob.employerLogo || trackedJob.logo,
  };
}

export default store;
