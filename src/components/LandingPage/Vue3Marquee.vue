<template>
  <Vue3Marquee>
    <img
      class="marquee-image"
      v-for="image in images"
      :key="image"
      :src="image.src"
    />
  </Vue3Marquee>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";
import bytedance from "@/assets/images/marquee/bytedance.png";
import google from "@/assets/images/marquee/google.png";
import morganstanley from "@/assets/images/marquee/morganstanley.png";
import mckinsey from "@/assets/images/marquee/mckinsey.svg";
import meta from "@/assets/images/marquee/meta.png";
import kpmg from "@/assets/images/marquee/kpmg.png";
import allen from "@/assets/images/marquee/allen.png";
import rajah from "@/assets/images/marquee/rajah.jpeg";
import govtech from "@/assets/images/marquee/govtech.png";
import goldmansachs from "@/assets/images/marquee/goldmansachs.png";

const images = [
  { src: bytedance },
  { src: google },
  { src: morganstanley },
  { src: mckinsey },
  { src: meta },
  { src: kpmg },
  { src: allen },
  { src: rajah },
  { src: govtech },
  { src: goldmansachs },
];
</script>

<style scoped>
.vue3-marquee {
  max-width: 100vw;
  background-color: #f2f2f2;
}

.marquee-image {
  margin: 15px;
  width: 10vw;
  height: auto;
  padding: 30px;
}
</style>
