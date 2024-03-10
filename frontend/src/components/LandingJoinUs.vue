<template>
    <div class="join-us">
      <h2>No more missed opportunities</h2>
      <router-link to="/placeholder1">Join Now</router-link>
    </div>
</template>

<script setup>
</script>

<style scoped>
.join-us {
    text-align: center;
    background-color: #dde6ed;
    height: 50%;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.join-us h2 {
    color: #27374d;
    font-family: "Poppins", sans-serif, Helvetica;
    font-weight: bold;
}
  
.join-us a {
    font-size: 5em;
    text-decoration: underline;
    color: #27374d;
    font-family: "Poppins", sans-serif, Helvetica;
    font-weight: bold;
}
</style>