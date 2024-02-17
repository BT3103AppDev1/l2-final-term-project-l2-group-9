import * as THREE from 'three';

var container = document.getElementById('threejs-container');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Load the earth texture
var textureLoader = new THREE.TextureLoader();
textureLoader.load('images/earth.jpg', function(texture) {
    var geometry = new THREE.SphereGeometry(2, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Create a group for the resumes
    var resumeGroup = new THREE.Group();
    scene.add(resumeGroup);

    // Load the resume texture
    textureLoader.load('images/resume.jpg', function(texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        var geometry = new THREE.PlaneGeometry(0.8, 0.8)
        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        var numResumes = 10; // number of resumes to create
        var radius = 3.5; // radius of the orbit

        for (var i = 0; i < numResumes; i++) {
            var resume = new THREE.Mesh(geometry, material);
            var angle = 2 * Math.PI * i / numResumes; // calculate the angle at which to place this resume
            resume.position.x = radius * Math.cos(angle);
            resume.position.z = radius * Math.sin(angle);
            resume.rotation.y = angle + Math.PI / 2; // rotate the resume to face the Earth
            resumeGroup.add(resume);
        }
    });

    camera.position.z = 5;

    var rotationSpeed = 0.01; // set the rotation speed

    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += rotationSpeed; // rotate the Earth around its y-axis
        resumeGroup.rotation.y += rotationSpeed; // rotate the resume group around its y-axis at the same speed
        renderer.render(scene, camera);
    }
    animate();
});