<template>
  <div class="relative">
    <ThePostings class="absolute-fill" />
  </div>
</template>

<script setup>
import ThePostings from "../components/PostingPage/ThePostings.vue";
</script>

<style scoped>
.relative {
  position: relative;
  height: 82vh;
}

.absolute-fill {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
