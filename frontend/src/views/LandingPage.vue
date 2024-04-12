<template>
  <FrontLanding />
  <Introduction />
  <CreatePost />
  <DividerComponent />
  
  <LandingPosting />

  <Vue3Marquee />
  <DividerComponent />

  <LandingTracker />
  <DividerComponent />

  <LandingJoinUs />

  <LandingFooter />
</template>

<script setup>
import Introduction from "../components/LandingPage/Introduction.vue";
import Vue3Marquee from "../components/LandingPage/Vue3Marquee.vue";
import FrontLanding from "../components/LandingPage/FrontLanding.vue";
import LandingTracker from "@/components/LandingPage/LandingTracker.vue";
import LandingJoinUs from "../components/LandingPage/LandingJoinUs.vue";
import LandingFooter from "../components/LandingPage/LandingFooter.vue";
import LandingPosting from "../components/LandingPage/LandingPosting.vue";
import DividerComponent from "../components/LandingPage/DividerComponent.vue";
import CreatePost from "../components/ForumPage/CreatePost.vue";
</script>

<style scoped></style>
