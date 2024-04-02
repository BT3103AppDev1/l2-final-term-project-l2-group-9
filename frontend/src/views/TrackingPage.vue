<template>
    <div class="relative">
      <TrackingPage class="absolute-fill" />
    </div>
  </template>
  
  <script setup>
  import TrackingPage from "../components/TrackingPage/TrackingPage.vue";
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
  