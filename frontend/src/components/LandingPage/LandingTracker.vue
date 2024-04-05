<template>
  <div class="container">
    <div class="text-box">
      <div class="employment-container">
        <span class="employment-text">Employing</span>
        <img
          id="pie"
          src="@/assets/images/image-track/pie.jpeg"
          alt="Descriptive Alt Text"
          class="image"
        />
      </div>
      <div class="customised-container">
        <img
          id="info"
          src="@/assets/images/image-track/DataVisualizationInfographicsBlogheader.png"
          alt="Descriptive Alt Text"
          class="image"
        />
        <span class="customised-text">Tailored</span>
      </div>
      <div class="tailored-container">
        <span class="tailored-text">Customised</span>
        <img
          id="scatter"
          src="@/assets/images/image-track/scatter.jpg"
          alt="Descriptive Alt Text"
          class="image"
        />
      </div>
      <div class="plots-container">
        <img
          id="cube"
          src="@/assets/images/image-track/cube.jpeg"
          alt="Descriptive Alt Text"
          class="image"
        />
        <span class="plots-text">Visualisations</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400;700&display=swap");

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  position: relative;
  color: black;
}

.text-box {
  max-width: 80%;
  font-size: 6em;
  font-family: "Libre Bodoni", serif;
  font-weight: 700;
  align-items: center;
  text-align: center;
}

.employment-container,
.tailored-container,
.plots-container,
.customised-container {
  display: flex; /* Aligns the text and image in a row */
  align-items: center; /* Centers them vertically */
  margin-top: 0px;
  margin-bottom: 0px;
}

.customised-container,
.plots-container {
  display: flex; /* Keep using flex for alignment */
  justify-content: space-between; /* This will push the text to the right */
  width: 100%; /* Ensure the container spans the full width */
}

.customised-text,
.plots-text {
  text-align: right;
}

.image {
  max-width: 100%;
  border-radius: 8px;
  width: 410px;
  height: 140px;
  object-fit: cover;
  overflow: hidden;
}

#pie {
  margin-left: 15px;
  width: 320px;
  height: 110px;
}

#scatter {
  margin-left: 15px;
  width: 280px;
  height: 110px;
}

#cube {
  margin-left: 15px;
  margin-right: 0px;
  width: 150px;
  height: 110px;
}

#info {
  margin-right: 15px;
  margin-left: 5px;
  width: 400px;
  height: 110px;
}
</style>
