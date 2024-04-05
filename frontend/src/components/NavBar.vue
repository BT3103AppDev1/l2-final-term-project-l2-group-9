<template>
  <nav class="nav-bar">
    <a href="/" class="logo">
      <img src="../assets/images/NavBarInTurnLogoName.png" alt="InTurn Logo" />
    </a>
    <ul class="right-logos">
      <li>
        <router-link to="/profile">
          <div class="icon-wrapper">
            <img src="../assets/images/businessman.jpg" alt="Profile Icon" />
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/notification">
          <div class="icon-wrapper">
            <font-awesome-icon
              :icon="['fas', 'bell']"
              size="xl"
              style="color: #ffffff"
            />
          </div>
        </router-link>
      </li>
      <li>
        <div class="icon-wrapper" @click="$emit('toggle-sidebar')">
          <font-awesome-icon :icon="['fas', 'bars']" size="xl" style="color: #ffffff" />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #9db2bf;
  /* White background color */
  height: 10vh;
  overflow: hidden;
  width: 100vw;
}

.logo img {
  height: 15vh;
  overflow: hidden;
}

.right-logos {
  display: flex;
  list-style: none;
  /* Remove default bullet points */
  padding: 0;
  /* Remove default padding */
  margin: 0;
  /* Remove default margin */
}

.right-logos li {
  margin-left: 2rem;
  /* Add some margin between icons */
}

.right-logos a {
  text-decoration: none;
  /* Remove underline */
}

.right-logos img {
  width: 45px;
  /* Match the width of the .icon-wrapper class */
  height: 45px;
  /* Match the height of the .icon-wrapper class */
  border-radius: 50%;
  /* Make the image circular */
  object-fit: cover;
  /* Ensure the image covers the entire area */
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #000000 0%, #333333 100%);
  /* Gradient background */
  border-radius: 50%;
  /* Makes the div circular */
  width: 45px;
  /* Adjust as needed */
  height: 45px;
  /* Adjust as needed */
  padding: 10px;
  /* Adds some space around the icon */
  border: 1px solid #ffffff;
  /* Adds a white border */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  /* Larger shadow for more depth */
  color: #ffffff;
  /* White icon color */
  cursor: pointer;
}
</style>
