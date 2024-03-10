<template>
  <div class="container">
    <div id="logo" ref="logo">
      <img :src="logo1" draggable="false" />
      <img :src="logo2" draggable="false" />
      <img :src="logo3" draggable="false" />
      <img :src="logo4" draggable="false" />
    </div>
  </div>
</template>

<script setup>
import logo1 from "@/assets/images/MovingLogo/Enlarged_1.png";
import logo2 from "@/assets/images/MovingLogo/Enlarged_2.png";
import logo3 from "@/assets/images/MovingLogo/Enlarged_3.png";
import logo4 from "@/assets/images/MovingLogo/Enlarged_4.png";
</script>

<script>
export default {
  mounted() {
    this.logo = this.$refs.logo;
    this.images = this.logo.querySelectorAll("img");
    this.setActiveTo(false);
    this.resetLogo();

    this.shiftLogoHandler = (e) => this.shiftLogo(e, this.images);
    this.resetLogoHandler = () => this.resetLogo();

    window.addEventListener("mousemove", this.shiftLogoHandler);
    window.addEventListener("mousedown", this.mouseDownHandler);
    window.addEventListener("mouseup", this.mouseUpHandler);
    this.logo.addEventListener("mouseleave", this.resetLogoHandler);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.shiftLogoHandler);
    window.removeEventListener("mousedown", this.mouseDownHandler);
    window.removeEventListener("mouseup", this.mouseUpHandler);
    this.logo.removeEventListener("mouseleave", this.resetLogoHandler);
  },
  methods: {
    setActiveTo(active) {
      this.$el.dataset.active = active;
    },
    getActive() {
      return this.$el.dataset.active === "true";
    },
    shift(image, index, rangeX, rangeY) {
      const active = this.getActive();

      const translationIntensity = active ? 24 : 4,
        maxTranslation = translationIntensity * (index + 1),
        currentTranslation = `${maxTranslation * rangeX}% ${
          maxTranslation * rangeY
        }%`;

      const scale = active ? 1 + index * 0.4 : 1;

      image.animate(
        {
          translate: currentTranslation,
          scale,
        },
        { duration: 750, fill: "forwards", easing: "ease" }
      );
    },
    shiftAll(images, rangeX, rangeY) {
      images.forEach((image, index) =>
        this.shift(image, index, rangeX, rangeY)
      );
    },
    shiftLogo(e, images) {
      const rect = this.$el.getBoundingClientRect(),
        radius = 1000;

      const centerX = rect.left + rect.width / 2,
        centerY = rect.top + rect.height / 2;

      const rangeX = (e.clientX - centerX) / radius,
        rangeY = (e.clientY - centerY) / radius;

      this.shiftAll(images, rangeX, rangeY);
    },
    resetLogo() {
      this.setActiveTo(false);
      this.shiftAll(this.images, 0.4, -0.7);
    },
    mouseDownHandler(e) {
      this.setActiveTo(true);
      this.shiftLogo(e, this.images);
    },
    mouseUpHandler() {
      this.resetLogo();
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #526d82;
  height: 100vh; /* viewport height */
  width: 50vw; /* viewport width */
  display: grid;
  place-items: center;
  margin: 0;
  overflow: hidden;
}

#logo {
  position: relative;
  width: 80%; /* Adjust the size as needed */
  max-width: 800px; /* Maximum width */
  aspect-ratio: 1000 / 556;
  user-select: none;
  transform: scale(1.2);
}

#logo > img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Preserve aspect ratio and fit inside the container */
  position: absolute;
}
</style>
