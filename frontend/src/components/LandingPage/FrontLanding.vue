<template>
  <div id="first-page">
    <div id="logo-spin">
      <LogoSpin />
    </div>
    <div id="main-landing-page">
      <div id="navbar">
        <router-link
          :to="{ name: 'LandingPage', hash: '#landing-posting' }"
          >Internship</router-link
        >
        <router-link to="/tracker">Tracker</router-link>
        <router-link to="/forum">Forum</router-link>
      </div>
      <div id="main-landing-page-slogan">
        <div class="slogan-container">
          <h1 class="fade-in-text">insight,</h1>
          <h1 class="fade-in-text delay-1">incharge,</h1>
          <h1 class="fade-in-text delay-2">InTurn.</h1>
        </div>
      </div>
      <div class="box-container">
        <router-link to="/login" class="box">Login</router-link>
        <router-link to="/register" class="box">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import LogoSpin from "./LogoSpin.vue";
</script>

<style scoped>
#first-page {
  display: flex;
}

#logo-spin {
  flex: 2;
}
#main-landing-page {
  flex: 4;
  text-align: center;
  background-color: #526d82;
  height: 100vh; /* viewport height */
  width: 50vw; /* viewport width */
}

#main-landing-page a {
  margin: 0 20px;
  font-size: 2em;
  position: relative;
  text-decoration: none;
}

#navbar ::before {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 4px;
  background-color: white;
  transition: right 0.3s ease;
}

#navbar a:hover::before {
  right: 0;
}

h1,
#main-landing-page a {
  line-height: 1em;
  font-weight: bolder;
  color: white;
  font-family: "League Spartan";
}

h1 {
  font-size: 8em;
  text-align: left;
}

#navbar {
  padding-top: 3vh;
}

.slogan-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: fit-content;
  margin: 0 auto;
  padding: 10vh;
}

.fade-in-text {
  opacity: 0;
  animation: fadeIn 1s linear forwards;
}

.delay-1 {
  animation-delay: 1s;
}

.delay-2 {
  animation-delay: 2s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.box-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 10vh;
}

.box {
  font-weight: 600;
  transition: all 300ms ease;
  padding: 1rem;
  width: 15rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: #878c8b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
}

.box:hover {
  cursor: pointer;
  background-color: rgb(53, 53, 53);
  color: white;
}
</style>
