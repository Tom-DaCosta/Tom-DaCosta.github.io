import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

camera.position.z = 5;

let gltfScene;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if (gltfScene) {
        gltfScene.rotation.x += 0.01;
        gltfScene.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

const loader = new GLTFLoader();
loader.load('./../../model/scene.gltf', function (gltf) {
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