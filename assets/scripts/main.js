/*
*   22 July 2025
*   Matthew Hirschberger 
*
*   TODO:
*       I think this code would be a bit easier to track if all the 
*       slideshow variables were packaged into a struct.
*
*       I don't like tracking slideshow indices for multiple containers
*       in one array.
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#bg');

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Mimimcs human eyeballs
const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 1000);

renderer.setPixelRatio( window.devicePixelRatio );
camera.position.setZ(20);

// Create scene
const scene = new THREE.Scene();

scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

// Object loading and preparation
const soyuz = new THREE.Object3D();
const soyuz_loader = new GLTFLoader();
soyuz_loader.load('Soyuz.glb', function(gltf) {

    // Add the soyuz model to the Object3D struct
    soyuz.add(gltf.scene.children[0]);

    soyuz.traverse((node) => {
      if (!node.isMesh) return;
      node.material.wireframe = true;
      node.material.color.set( 0x33ff00 );
    });

    soyuz.rotation.z = 3.1415926;
    soyuz.rotation.y = 3.1415926 / 3;

    // Add the model to the scene
    scene.add(soyuz);

}, undefined, function(error) {
    console.log(error);
});

function animate() {
    requestAnimationFrame( animate );

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    soyuz.rotateX(0.001);
    renderer.render( scene, camera );
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

animate();

// Construct an array that represents the slideIndex of each slideshow
// [slideshow1.index slideshow2.index, ...]
//let slideshowIndices = Array(slideshows.length).fill(1);
let slideshowIndices = [1, 1, 1, 1, 1];

// TODO: Replace this with some code that dynamically gets the container ids
let slideshowIds = ["ff-slideshow", "fdss-slideshow", "nasa-dpl-slideshow", "mitre-slideshow", "gps-lab-slideshow"];

// Call the showSlides function for every slideshow
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);

function plusSlides(n, no) {
    showSlides(slideshowIndices[no] += n, no);
}

function showSlides(n, no) {

    // Collect all the slides in slideshow #no
    let slideshow = document.getElementById(slideshowIds[no]);

    let slides = slideshow.getElementsByClassName("slide");

    if (n > slides.length) {
        slideshowIndices[no] = 1;
    }

    if (n < 1) {
        slideshowIndices[no] = slides.length;
    }

    // Hide all of the slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remember JS indexes at 0
    slides[slideshowIndices[no] - 1].style.display = "inline";

}