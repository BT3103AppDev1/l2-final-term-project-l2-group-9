<template>
  <footer class="landing-footer">
    <div>
      <img src="@/assets/images/InTurnLogoName.jpeg" alt="InTurn Logo" />
    </div>
    <div class="nav-links">
      <div>
        <router-link
          class="nav-item"
          :to="{ name: 'LandingPage', hash: '#landing-posting' }"
          >Postings</router-link
        >
        <router-link class="nav-item" :to="{ name: 'LandingPage', hash: '#landing-tracker' }">Tracker</router-link>
      </div>
      <br /><br />
      <div>
        <router-link class="nav-item" to="/forum">Forum</router-link>
        <div
          class="account"
          @mouseover="showAccountMenu = true"
          @mouseleave="showAccountMenu = false"
        >
          <div class="nav-item">Account</div>
          <div v-show="showAccountMenu" class="account-dropdown">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; InTurn 2024</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const showAccountMenu = ref(false);
</script>

<style scoped>
.landing-footer {
  display: flex;
  flex-direction: column;
  background-color: #526d82;
  color: white;
  padding: 10px;
  font-family: "League Spartan";
  font-weight: bold;
}

img {
  width: 10%;
}

.nav-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
}

.nav-links > div {
  display: flex;
  justify-content: space-evenly;
  width: 40%;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 40px;
  align-items: center;
  transition: text-shadow 0.3s ease;
}
.nav-item:hover {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}

.account-dropdown {
  display: flex;
  flex-direction: column;
}

.account-dropdown a {
  color: lightgray;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

.nav-item,
.account-dropdown a {
  cursor: pointer;
}

.copyright {
  font-size: medium;
}
</style>
