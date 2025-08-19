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
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

var PI = 3.1415926535;

// Set up the canvas
const canvas = document.querySelector('#bg');

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
  alpha: true,
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Camera mimimcs human eyeballs
const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 1000);

renderer.setPixelRatio( window.devicePixelRatio );
camera.position.setZ(20);

// Create scene
const scene = new THREE.Scene();

// Add lighting
scene.add(new THREE.AmbientLight(0xbbbbbb, 0.8));

// Add 2D headliner
const headliner = document.querySelector('#headliner-container');
const headliner_renderer = new CSS2DRenderer();
headliner_renderer.setSize(canvas.clientWidth, canvas.clientHeight);

document.body.appendChild(headliner_renderer.domElement);

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

    soyuz.position.x -= 8;
    soyuz.rotation.z = PI;
    soyuz.rotation.y = PI / 2;

    // Add the model to the scene
    scene.add(soyuz);

}, undefined, function(error) {
    console.log(error);
});

// Add wireframe sphere
const geometry = new THREE.SphereGeometry(25, 20, 20);
const material = new THREE.MeshBasicMaterial( {color: 0x33ff00, wireframe: true});
const wire_earth = new THREE.Mesh(geometry, material);

wire_earth.rotation.z = - (23.4 * (PI/180));
wire_earth.position.y = -30;
wire_earth.position.z = 8;

scene.add(wire_earth);

// Add opaque sphere
const opaque_geometry = new THREE.SphereGeometry(25, 20, 20);
const opaque_material = new THREE.MeshBasicMaterial( {color : 0x000000 , wireframe: false} );
const opaque_sphere = new THREE.Mesh(opaque_geometry, opaque_material);

opaque_sphere.rotation.z = - (23.4 * (PI/180));
opaque_sphere.position.y = -30;
opaque_sphere.position.z = 8;

scene.add(opaque_sphere);

function animate() {
    requestAnimationFrame( animate );

    soyuz.rotateX(0.001);
    wire_earth.rotateY(0.0001);
    opaque_sphere.rotateY(0.0001);
    renderer.render( scene, camera );
}

// 
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();