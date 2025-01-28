// Import Three.js Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Jedi Character
const jediTexture = new THREE.TextureLoader().load('https://example.com/jedi-texture.jpg');
const jediMaterial = new THREE.MeshStandardMaterial({ map: jediTexture });
const jediGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
const jedi = new THREE.Mesh(jediGeometry, jediMaterial);
jedi.position.set(-5, 1.5, 0);
scene.add(jedi);

// Jedi Lightsaber
const jediSaberGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 32);
const jediSaberMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const jediSaber = new THREE.Mesh(jediSaberGeometry, jediSaberMaterial);
jediSaber.position.set(0, 2, 0);
jedi.add(jediSaber);

// Sith Character
const sithTexture = new THREE.TextureLoader().load('https://example.com/sith-texture.jpg');
const sithMaterial = new THREE.MeshStandardMaterial({ map: sithTexture });
const sithGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
const sith = new THREE.Mesh(sithGeometry, sithMaterial);
sith.position.set(5, 1.5, 0);
scene.add(sith);

// Sith Lightsaber
const sithSaberGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 32);
const sithSaberMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sithSaber = new THREE.Mesh(sithSaberGeometry, sithSaberMaterial);
sithSaber.position.set(0, 2, 0);
sith.add(sithSaber);

// Add Ground Plane
const groundTexture = new THREE.TextureLoader().load('https://example.com/ground-texture.jpg');
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Movement Mechanics
let keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function moveJedi() {
  if (keys['ArrowUp']) jedi.position.z -= 0.2;
  if (keys['ArrowDown']) jedi.position.z += 0.2;
  if (keys['ArrowLeft']) jedi.position.x -= 0.2;
  if (keys['ArrowRight']) jedi.position.x += 0.2;
}

function moveSith() {
  const dx = jedi.position.x - sith.position.x;
  const dz = jedi.position.z - sith.position.z;
  const distance = Math.sqrt(dx * dx + dz * dz);

  if (distance > 2) {
    sith.position.x += dx * 0.01;
    sith.position.z += dz * 0.01;
  }
}

// Add Buildings
for (let i = 0; i < 10; i++) {
  const buildingGeometry = new THREE.BoxGeometry(5, Math.random() * 20 + 10, 5);
  const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(Math.random() * 50 - 25, building.geometry.parameters.height / 2, Math.random() * 50 - 25);
  scene.add(building);
}

// Game Loop
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  moveJedi();
  moveSith();
  renderer.render(scene, camera);
}

animate();
