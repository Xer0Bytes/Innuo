import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const hand = new URL("./assets/hand.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
//const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(0, 2, 30);
//orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(10, 30, 50);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(10, 40, 100);
spotLight.angle = -0.5;

// // Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

const assetLoader = new GLTFLoader();

assetLoader.load(
  hand.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(2, 0, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
