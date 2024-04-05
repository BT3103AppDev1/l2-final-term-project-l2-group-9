<template>
  <div class="divider-container">
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "DividerComponent",
};
</script>

<style scoped>
.divider-container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
}

.divider {
  width: 60%; /* Adjust this to make the line shorter or longer */
  border-top: 4px solid #ddd; /* Make the line thicker */
  color: #ddd; /* Change the color of the line */
}
</style>
