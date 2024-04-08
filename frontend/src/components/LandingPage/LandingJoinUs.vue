<template>
  <div class="join-us">
    <h2>No more missed opportunities</h2>
    <router-link to="/register">Join Now</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.join-us {
  text-align: center;
  background-color: #f2f2f2;
  height: 80%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.join-us h2 {
  color: #000000;
  font-family: "League Spartan";
  font-weight: bold;
  font-size: 2em;
}

.join-us a {
  font-size: 6em;
  text-decoration: underline;
  color: #000000;
  font-family: "League Spartan";
  font-weight: bold;
  transition: transform 0.3s ease; 
}

.join-us a:hover {
  animation: bounce 1s infinite; 
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-20px); 
  }
}
</style>
