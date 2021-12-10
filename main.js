import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Points, Texture } from 'three';
import { AmbientLight } from 'three';


//DISCLAIMER:
// Alt javascript vedrørende hvordan threejs virker samt hvordan man animere partikler er fra denne youtube video
// https://www.youtube.com/watch?v=dLYMzNmILQA&list=PL0lNJEnwfVVO4sNO2WDq_h73w-eHQStCB&index=4&ab_channel=DesignCourse
// Designet af udtrykket har jeg selv fundet



// en scene fungere som en container for vores kamera
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const letterQ = loader.load('img/q.png');
const letterOe = loader.load('img/oe.png');

// map: letter,
// const bogstav = loader



// load a resourcecd 


//1.parameter hvor mange grader lensens "field of view" er ,
//2.parameter window størrelse som regnes udfra individuel skærm størrelse
//3.parameter "view frustrum" er afstanden af objekter fra lensen/ hvilke er synlige

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    size: 0.04,
    map: letterOe,
    transparent: false,
    color: '#A462F4'
  } );

const pointSizeQ = new THREE.PointsMaterial(
  {
    size: 0.005,
    map: letterQ,
    transparent: false
  } );

  const pointSizeOe = new THREE.PointsMaterial(
    {
      size: 0.005,
      map: letterOe,
      transparent: false
    } );

const particlesGeometryQ = new THREE.BufferGeometry;
const particlesGeometryOe = new THREE.BufferGeometry;

const particlesCnt = 100000;

//gemmer et random kordinat til både x y z på alle partikler i et array
const posArray = new Float32Array(particlesCnt * 3);
for(let i = 0; i < particlesCnt *3; i++) {
  posArray[i] = (Math.random() -0.5)*(Math.random()+0.2 -0.5)*10
}

const posArray2 = new Float32Array(particlesCnt * 3);
for(let i = 0; i < particlesCnt *3; i++) {
  posArray[i] = (Math.random()+0.2 -0.5)*(Math.random()+0.2 -0.5)*(Math.random()+0.2 -0.5)*10
}


//posArray giver nu hver particle et kordinat
particlesGeometryQ.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
particlesGeometryOe.setAttribute('position', new THREE.BufferAttribute(posArray2, 3))

//Mesh
const particleMeshQ = new THREE.Points( particlesGeometryQ, pointSizeQ );
const particleMeshOe = new THREE.Points( particlesGeometryOe, pointSizeOe );
const torusKnot = new THREE.Points( geometry, geoPointSize );
scene.add( particleMeshQ, particleMeshOe);



// Lights

 const pointLight = new THREE.PointLight(0xffffff);
 pointLight.position.set(25, 25, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(AmbientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// lytter til musen
const controls = new OrbitControls(camera, renderer.domElement)



function moveCamera() {
  //const t fortæller vi langt vi er fra toppen
  const t = document.body.getBoundingClientRect().top;


  torusKnot.position.z = t * -0.01;
  torusKnot.position.x = t * -0.0002;
  torusKnot.rotation.y = t * -0.0002;
}

// document.body.onscroll = moveCamera;
// moveCamera();

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
  particleMeshQ.rotation.y =-0.0001 * elapsedTime
  particleMeshOe.rotation.y =-0.0001 * elapsedTime

  if (mouseX > 0)
  {
  particleMeshQ.rotation.x = mouseY * (-elapsedTime*0.000009);
  particleMeshQ.rotation.y = mouseX * (-elapsedTime*0.000009);
  }

  if (mouseX > 0)
  {
  particleMeshOe.rotation.x = mouseY * (-elapsedTime*0.000009);
  particleMeshOe.rotation.y = mouseX * (-elapsedTime*0.000009);
  }

  torusKnot.rotation.x += 0.00009 * elapsedTime;
  torusKnot.rotation.y += 0.00006 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);
}

animate();


