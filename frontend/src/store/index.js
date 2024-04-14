// src/store/index.js
import { createStore } from "vuex"; // Import createStore for Vue 3

const store = createStore({
  state() {
    return {
      userProfile: {
        profileUrl: "",
      },
    };
  },
  mutations: {
    updateUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
  },
  actions: {
    setUserProfile({ commit }, userProfile) {
      commit("updateUserProfile", userProfile);
    },
  },
  getters: {
    userProfile: (state) => state.userProfile,
  },
});

export default store;
