import * as THREE from 'three'
let scene, camera, renderer, earth, moon, light

/**
 * Initialize the scene, camera, renderer, objects, and light source.
 * Set up the scene and start the animation.
 */
function init() {
  // Set up the scene
  scene = new THREE.Scene(); // Create a new scene

  // Set up the camera
  camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    1000 // Far plane
  );
  camera.position.z = 20; // Set the initial camera position

  // Set up the renderer
  renderer = new THREE.WebGLRenderer(); // Create a new WebGL renderer
  renderer.setSize(window.innerWidth, window.innerHeight); // Set the renderer size
  document.body.appendChild(renderer.domElement); // Add the renderer to the document body

  // Create the Earth
  const earthGeometry = new THREE.SphereGeometry(5, 32, 32); // Create a sphere geometry for the Earth
  const earthMaterial = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('/flat_earth.png'), // Load a texture for the Earth
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial); // Create a mesh for the Earth
  scene.add(earth); // Add the Earth to the scene

  // Create the Moon
  const moonGeometry = new THREE.SphereGeometry(1, 32, 32); // Create a sphere geometry for the Moon
  const moonMaterial = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('/flat_moon.png'), // Load a texture for the Moon
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial); // Create a mesh for the Moon
  moon.position.x = 10; // Set the initial position of the Moon
  scene.add(moon); // Add the Moon to the scene

  // Add light source
  light = new THREE.PointLight(0xffffff, 1, 0); // Create a point light source
  light.position.set(10, 0, 10); // Set the initial position of the light source
  scene.add(light); // Add the light source to the scene

  // Start the animation
  animate();
}
 

/**
 * Function to animate the scene.
 * This function is called recursively using requestAnimationFrame.
 * It updates the rotation of the Earth and the Moon, and orbits the Moon around the Earth.
 * Finally, it renders the scene using the WebGLRenderer.
 */
function animate() {
  requestAnimationFrame(animate)

  // Rotate the Earth by decrementing its rotation.y by 0.01
  earth.rotation.y -= 0.01

  // Rotate the Moon by incrementing its rotation.y by 0.01
  moon.rotation.y += 0.01

  // Orbit the Moon around the Earth by updating its position.x and position.z
  // The moon's x and z coordinates are updated based on a sine and cosine of the current time
  // The time is scaled by 0.001 to slow down the orbit
  moon.position.x = 10 * Math.cos(Date.now() * 0.001)
  moon.position.z = 10 * Math.sin(Date.now() * 0.001)

  // Render the scene using the WebGLRenderer
  renderer.render(scene, camera) 
}

// Adjust the canvas size when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

init()
