import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(5, 5, 5).normalize();
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-5, -5, -5).normalize();
scene.add(directionalLight);
scene.add(directionalLight2);

camera.position.z = 500;

let gltfScene;

const rainCount = 20000;
const rainGeometry = new THREE.BufferGeometry();
const rainVertices = [];

for (let i = 0; i < rainCount; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2500 - 1300;
    const z = Math.random() * 2000 - 1000;
    rainVertices.push(x, y, z);
}

rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));

const rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true
});

const rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if (gltfScene) {
        gltfScene.rotation.x += 0.01;
        gltfScene.rotation.y += 0.01;
    }

    // Mise à jour des particules de pluie
    const positions = rainGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.2; // Déplacement vers le bas
        if (positions[i + 1] < -200) {
            positions[i + 1] = 200; // Réinitialisation de la position
        }
    }
    rainGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

const loader = new GLTFLoader();
loader.load('./model/scene.gltf', function (gltf) {
    gltfScene = gltf.scene;
    scene.add(gltfScene);
}, undefined, function (error) {
    console.error(error);
});

// Gestion de la taille de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});