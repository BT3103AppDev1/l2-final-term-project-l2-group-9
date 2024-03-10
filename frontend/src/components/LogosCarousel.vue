<template>
    <div class="logos" ref="logos">
      <div class="logos-slide">
        <img :src="resumeImage1" alt="Resume 1" />
        <img :src="resumeImage1" alt="Resume 1" />
        <img :src="resumeImage1" alt="Resume 1" />
        <img :src="resumeImage1" alt="Resume 1" />
        <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      </div>
      <div class="logos-slide">
      <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      <img :src="resumeImage1" alt="Resume 1" />
      
    </div>
    </div>
  </template>
  
  <script setup>
import { onMounted, ref } from 'vue';
import resumeImage1 from '@/assets/images/resume1.jpg';


</script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    overflow-x: hidden;
    background: #f2f2f2;
  }
  
  @keyframes slide {
    0% { transform: translateX(0); }
    50% { transform: translateX(-50%); }
  100% { transform: translateX(-100%); }
  }
  
  .logos {
    overflow-x: hidden;
    padding: 60px 0;
    background: white;
    white-space: nowrap;
    position: relative;
    font-size: 0;
  }
  
  .logos:before,
  .logos:after {
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    content: "";
    z-index: 2;
  }
  
  .logos:before {
    left: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
  }
  
  .logos:after {
    right: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
  }

  
  .logos-slide {
    display: inline-block;
    animation: slide 10s infinite linear;
    width: 100%;
    font-size: initial;
  }
  
  .logos-slide img {
    height: 50px;
    margin: 0 40px;
  }
  </style>