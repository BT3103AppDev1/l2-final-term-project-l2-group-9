<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>
    <router-link to="/">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  height: 100vh;
}

.not-found h1 {
  margin: 20px 0;
}

.not-found p {
  margin-bottom: 20px;
}
</style>
