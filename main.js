import './style.css';
import * as THREE from 'three';

// en scene fungere som en container for vores kamera
const scene = new THREE.Scene();

//1.parameter hvor mange grader lensens "field of view" , 
//2.parameter aspect ratioen som regnes udfra skærm størrelse 
//3.parameter view frustrum som er afstanden af objekter fra lensen/ hvilke er synlige

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderen som skaber animationerne på vores id: #bg
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// sætter pixel ratio antal og skærm størrelse til computerens
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera)