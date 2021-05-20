import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three'


//Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture =  textureLoader.load('./textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 ); 
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x292929)
material.metalness = 0.3
material.roughness = 5
material.normalMap = normalTexture



// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight((Math.random() * 0xFFF00F << 0).toString(16).padStart(6, '0'), 1)
pointLight.position.x = 6
pointLight.position.y = -3
pointLight.position.z = 4
pointLight.intensity = 2
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-3.5,7,3)
pointLight2.intensity = 3
scene.add(pointLight2)


gui.add(pointLight2.position, 'y').min(-3).max(7).step(0.01)
gui.add(pointLight2.position, 'x').min(-9).max(6).step(0.01)
gui.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
gui.add(pointLight2, 'intensity').min(0).max(3).step(0.01)

gui.add(pointLight.position, 'y').min(-3).max(7).step(0.01)
gui.add(pointLight.position, 'x').min(-9).max(6).step(0.01)
gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
gui.add(pointLight, 'intensity').min(0).max(3).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
const pointLightHelper2 = new THREE.PointLightHelper(pointLight, 2)
scene.add(pointLightHelper)
scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)
camera.lookAt(sphere)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()