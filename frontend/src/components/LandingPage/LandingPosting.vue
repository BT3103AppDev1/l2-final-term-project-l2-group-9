<template>
  <div id="landing-posting" v-once>
    <div class="header">
      <h2 class="left-text">
        <span id="text"></span>
        <span class="cursor">|</span>
      </h2>
    </div>
    <video class="walkthrough-video" width="320" autoplay muted loop>
      <source src="@/assets/walkthrough-posting.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  mounted() {
    const textArray = ["Internship Postings", "Curated for your needs"];
    let textIndex = 0;
    let charIndex = 0;
    let direction = "forward";
    const textElement = document.getElementById("text");

    function type() {
      const text = textArray[textIndex];
      textElement.textContent = text.slice(0, charIndex);

      if (charIndex === (direction === "forward" ? text.length : 0)) {
        direction = direction === "forward" ? "backward" : "forward";
        if (direction === "forward") {
          textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(type, 1000);
      } else {
        charIndex += direction === "forward" ? 1 : -1;
        setTimeout(type, 100);
      }
    }

    type();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

#landing-posting {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2f2;
  padding: 5rem 0;
  flex-direction: column;
}

#landing-posting h2 {
  font-weight: bold;
  font-family: "League Spartan";
  color: black;
  font-size: 2.5rem;
  min-height: 4rem;
}

.walkthrough-video {
  width: 60%;
  height: auto;
  margin-top: 30px;
  border: 5px solid #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.cursor {
  opacity: 1;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
