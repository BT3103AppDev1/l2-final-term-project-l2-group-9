<template>
    <div class="container">
        <div id="introduction-container" ref="container"></div>
        <div class="text-right">
            <h2>Ignite your career path. Step into InTurn, where the world is at your fingertips.</h2>
            <hr>
            <h4 class="intro-highlight-listing">Dynamic Internship Listings</h4>
            <p>Navigate and discover opportunities that align with your career aspirations.</p>
            <hr>
            <h4 class="intro-highlight-tracker">Effortless Application Tracking</h4>
            <p>No more uncertainties. Know the status of your applications at a glance.</p>
            <hr>
            <h4 class="intro-highlight-forum">Where Insight Meets Interaction</h4>
            <p>Share, learn, and connect with like-minded professionals.</p>
        </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as THREE from 'three';
  import earthImage from '@/assets/images/earth.jpg';
  import resumeImage1 from '@/assets/images/resume1.jpg';
  import resumeImage2 from '@/assets/images/resume2.jpg';
  import resumeImage3 from '@/assets/images/resume3.jpg';
  import resumeImage4 from '@/assets/images/resume4.jpg';
  import resumeImage5 from '@/assets/images/resume5.jpg';
  
  const container = ref(null);
  const resumeImages = [resumeImage1, resumeImage2, resumeImage3, resumeImage4, resumeImage5];
  
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
      var zoomIntensity = 0.005;
  
      window.addEventListener("scroll", function () {
        var scrollPosition = window.scrollY;
  
        if (scrollPosition > 0) {
          camera.position.z = initialCameraZ - zoomIntensity * scrollPosition;
        } else {
          camera.position.z = initialCameraZ;
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
    });
  });
</script>
  
<style scoped>
    body {
        min-height: 100vh;
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
        height: 100vh;;
        background-color: #dde6ed;
    }
    
    .text-right {
        width: 50%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-evenly;
        font-family: "Poppins", sans-serif, Helvetica;
        font-size: xx-large;
        animation: fade-down 1s ease-in-out;
        margin-left: 40px;
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
  
</style>