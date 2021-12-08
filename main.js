import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()


// en scene fungere som en container for vores kamera
const scene = new THREE.Scene();

//1.parameter hvor mange grader lensens "field of view" er , 
//2.parameter window størrelse som regnes udfra individuel skærm størrelse 
//3.parameter "view frustrum" er afstanden af objekter fra lensen/ hvilke er synlige

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderen skaber animationerne på vores id: #bg i html'en
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// sørge for at vi rendere igen når vi gør skærmen mindre
window.addEventListener('resize', function()
{
  var width = this.innerWidth
  var height = window.innerHeight
  renderer.setSize(width, height)
})

// sætter pixel ratio antal og skærm størrelse til computerens
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
// MeshStandardMateriel gør at lys kan reflektere på objektet
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

// Lights

 const pointLight = new THREE.PointLight(0xffffff);
 pointLight.position.set(25, 25, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// lytter til musen
const controls = new OrbitControls(camera, renderer.domElement)



function moveCamera() {
  //const t fortæller vi langt vi er fra toppen
  const t = document.body.getBoundingClientRect().top;


  torusKnot.position.z = t * -0.01;
  torusKnot.position.x = t * -0.0002;
  torusKnot.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// en recursive function der køre uendeligt så vi hele tiden rendere scene og kamerea
function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.001;
  torusKnot.rotation.y += 0.001;
 





  controls.update();

  renderer.render(scene, camera);
}

animate();

