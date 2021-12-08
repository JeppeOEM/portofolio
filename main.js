import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui'
import { Points, Texture } from 'three';


//DISCLAIMER:
// Alt javascript vedrørende hvordan threejs virker samt hvordan man sætter partikler op er fra denne
// https://www.youtube.com/watch?v=dLYMzNmILQA&list=PL0lNJEnwfVVO4sNO2WDq_h73w-eHQStCB&index=4&ab_channel=DesignCourse
// Designet af udtrykket har jeg selv fundet


// Debug
const gui = new dat.GUI()


// en scene fungere som en container for vores kamera
const scene = new THREE.Scene();

// const loader = new THREE.TextureLoader().load();
// const letter = loader.load('webporto\img\oe.png');
// const bogstav = loader

//1.parameter hvor mange grader lensens "field of view" er ,
//2.parameter window størrelse som regnes udfra individuel skærm størrelse
//3.parameter "view frustrum" er afstanden af objekter fra lensen/ hvilke er synlige

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 100);

camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

//renderen skaber animationerne på vores id: #bg i html'en
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// sørge for at vi rendere igen når vi gør skærmen mindre

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// sætter pixel ratio antal og skærm størrelse til computerens
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//variabl 2 er opacity
renderer.setClearColor('black', 2)
// camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry( 1, 3, 100, 16 );
// MeshStandardMateriel gør at lys kan reflektere på objektet
const geoPointSize = new THREE.PointsMaterial(
  {
    size: 0.002,
    color: '#A462F4'
  } );

const pointSize = new THREE.PointsMaterial(
  {
    size: 0.005,
    color: 'blue'
  } );

const particlesGeometry = new THREE.BufferGeometry;

const particlesCnt = 500000;

//gemmer et random kordinat til både x y z på alle partikler i et array
const posArray = new Float32Array(particlesCnt * 3);
for(let i = 0; i < particlesCnt *3; i++) {
  posArray[i] = (Math.random() -0.5)*(Math.random()+0.2 -0.5)*10
}

//posArray giver nu hver particle et kordinat
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

//Mesh
const particleMesh = new THREE.Points( particlesGeometry, pointSize );
const torusKnot = new THREE.Points( geometry, geoPointSize );
scene.add(torusKnot, particleMesh);



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

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event){
  mouseX = event.clientX
  mouseY = event.clientY
}

// en recursive function der køre uendeligt så vi hele tiden rendere scene og kamerea
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime()
  particleMesh.rotation.y =-0.1 * elapsedTime

  if (mouseX > 0)
  {
  particleMesh.rotation.x = mouseY * (-elapsedTime*0.00002);
  particleMesh.rotation.y = mouseX * (-elapsedTime*0.00002);
  }

  torusKnot.rotation.x += 0.0009 * elapsedTime;
  torusKnot.rotation.y += 0.0006 * elapsedTime;






  controls.update();

  renderer.render(scene, camera);
}

animate();



// const tick = () =>
// {

//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     sphere.rotation.y = .5 * elapsedTime

//     // Update Orbital Controls
//     // controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

