<template>
  <div class="container">
    <div id="introduction-container" ref="container"></div>
    <div class="text-right" ref="textRight">
      <h2 id="typewriterTitle">Step into InTurn</h2>
      <p id="titleText"></p>
      <hr />
      <div class="typewriterContent">
        <h4 class="intro-highlight-listing">Dynamic Internship Listings</h4>
        <p id="listingText"></p>
      </div>
      <hr />
      <div class="typewriterContent">
        <h4 class="intro-highlight-tracker">Effortless Application Tracking</h4>
        <p id="trackingText"></p>
      </div>
      <hr />
      <div class="typewriterContent">
        <h4 class="intro-highlight-forum">Insight Meets Interaction</h4>
        <p id="forumText"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import earthImage from "@/assets/images/earth.jpg";
import resumeImage1 from "@/assets/images/resume1.jpg";
import resumeImage2 from "@/assets/images/resume2.jpg";
import resumeImage3 from "@/assets/images/resume3.jpg";
import resumeImage4 from "@/assets/images/resume4.jpg";
import resumeImage5 from "@/assets/images/resume5.jpg";

const container = ref(null);
const textRight = ref(null);
const resumeImages = [
  resumeImage1,
  resumeImage2,
  resumeImage3,
  resumeImage4,
  resumeImage5,
];

onMounted(() => {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    container.value.offsetWidth / container.value.offsetHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(container.value.offsetWidth, container.value.offsetHeight);
  container.value.appendChild(renderer.domElement);

  var textureLoader = new THREE.TextureLoader();
  var resumeGroup = new THREE.Group();
  textureLoader.load(earthImage, function (texture) {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    scene.add(resumeGroup);

    var numResumes = 5;
    var radius = 2.5;

    function loadTextureAsync(url) {
      return new Promise((resolve, reject) => {
        textureLoader.load(url, resolve, undefined, reject);
      });
    }

    async function loadResumes() {
      for (var i = 0; i < numResumes; i++) {
        try {
          var texture = await loadTextureAsync(resumeImages[i]);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          var geometry = new THREE.PlaneGeometry(0.5, 0.5);
          var material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });

          var resume = new THREE.Mesh(geometry, material);
          var angle = (2 * Math.PI * i) / numResumes;
          resume.position.x = radius * Math.cos(angle);
          resume.position.z = radius * Math.sin(angle);
          resume.rotation.y = -angle;

          resumeGroup.add(resume);
        } catch (error) {
          console.error("Error loading texture:", error);
        }
      }
    }

    loadResumes();

    camera.position.z = 5;
    var initialCameraZ = camera.position.z;
    var zoomIntensity = 0.002;
    var section = document.getElementById("introduction-container");
    var sectionOffsetTop = section.offsetTop;

    window.addEventListener("scroll", function () {
      var scrollPosition = window.scrollY;

      if (scrollPosition >= sectionOffsetTop) {
        if (scrollPosition > 0) {
          camera.position.z =
            initialCameraZ -
            zoomIntensity * (scrollPosition - sectionOffsetTop);
        } else {
          camera.position.z = initialCameraZ;
        }
      }
    });

    var rotationSpeed = 0.004;

    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y += rotationSpeed;
      resumeGroup.rotation.y += rotationSpeed;
      renderer.render(scene, camera);
    }

    animate();

    const typewriter = (elementId, text, delay = 75) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          document.getElementById(elementId).innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, delay);
    };
    typewriter("titleText", "The world is at your fingertips.", 75);
    typewriter(
      "listingText",
      "Navigate and discover opportunities that align with your career aspirations.",
      75
    );
    typewriter(
      "trackingText",
      "No more uncertainties. Know the status of your applications at a glance.",
      75
    );
    typewriter(
      "forumText",
      "Share, learn, and connect with like-minded professionals.",
      75
    );
  });
});
</script>

<style scoped>
body {
  min-height: 100vh;
  width: 100vw; /* viewport width */
}

header {
  text-align: center;
  background-color: lightblue;
}

#introduction-container {
  width: 100%;
  flex: 1;
  overflow: hidden;
}

#introduction-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This will ensure that the aspect ratio of the image is maintained */
}
.container {
  display: flex;
  height: 100vh;
  background-color: #f2f2f2;
}

.text-right {
  max-width: 50%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  font-family: "League Spartan";
  font-size: xx-large;
  margin-left: 40px;
  margin-right: 20px;
  animation: fadeIn 2s linear forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.text-right p {
  color: #535760;
  margin-top: 0;
  font-weight: lighter;
}

.text-right h2 {
  color: black;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 0.1em;
  padding-top: 0.5em;
}

.text-right h4 {
  margin-bottom: 0;
  color: black;
  font-weight: bold;
}

@keyframes fade-down {
  0% {
    opacity: 0;
    transform: translateY(-100%) scale(0);
  }

  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}

/* Typewriter typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* For paragraphs, adjust the animation duration as needed */
#titleText #listingText,
#trackingText,
#forumText {
  animation-duration: 0.001ms; /* Shorter text, faster typing effect */
}
</style>
