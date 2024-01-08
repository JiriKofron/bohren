import * as THREE from 'three'
import gsap from 'gsap'

import { Camera, Clock, Mesh, Scene } from 'three'
import { useWindowSize } from '@vueuse/core/index'
import type { Ref } from 'vue'

let scene: Scene | null = null
let camera: Camera | null = null
let pointLight: any = null
let clock: Clock | null = null
const delta = ref(0)
const renderer = ref()

const windowWidth = ref()
const windowHeight = ref()
const smokeTexture: Ref | null = ref()
const smokeGeometry: Ref | null = ref()
const smokeMaterial: Ref | null = ref()
const smokeParticles: Mesh[] = []
const id: Ref<number | null> = ref(null)

const defineRenderer = (canvas: HTMLCanvasElement) => {
  renderer.value = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.value.setPixelRatio(window.devicePixelRatio)
  renderer.value.setSize(windowWidth.value, windowHeight.value)
}

const defineCamera = () => {
  camera = new THREE.PerspectiveCamera(75, windowWidth.value / windowHeight.value, 1, 1000)

  camera.position.setZ(1000)
}

const defineLight = () => {
  pointLight = new THREE.HemisphereLight(0xD6E6FF, 0xA38C08, 1)
  pointLight.position.set(2, 6, 6)
  scene?.add(pointLight)
}

const addFog = (scene: Scene) => {
  scene.fog = new THREE.Fog(0xC0F0FF, 0.0015)
}

const addSmoke = () => {
  smokeTexture.value = new THREE.TextureLoader().load('/animations/smoke.png')
  smokeTexture.value.colorSpace = THREE.SRGBColorSpace

  smokeGeometry.value = new THREE.PlaneGeometry(500, 400)
  smokeMaterial.value = new THREE.MeshLambertMaterial({
    map: smokeTexture.value,
    emissive: 0x222222,
    opacity: 0.10,
    transparent: true
  })

  for (let i = 0; i < 70; i++) {
    const smokeElement = new THREE.Mesh(smokeGeometry.value, smokeMaterial.value)
    smokeElement.scale.set(2, 2, 2)

    smokeElement.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 100)
    smokeElement.rotation.z = Math.random() * 360

    scene?.add(smokeElement)
    smokeParticles.push(smokeElement)
  }
}

const init = (canvas: HTMLCanvasElement) => {
  const { width, height } = useWindowSize()
  clock = new THREE.Clock()

  windowWidth.value = width.value
  windowHeight.value = height.value

  scene = new THREE.Scene()

  addFog(scene)

  defineRenderer(canvas)
  defineCamera()
  defineLight()

  gsap.ticker.add(() => {
    renderer.value?.render((scene as Scene), camera, { antialias: true })
  })
}

const animate = () => {
  id.value = requestAnimationFrame(animate)
  delta.value = (clock as Clock).getDelta()

  for (let i = 0; i < smokeParticles.length; i++) {
    smokeParticles[i].rotation.z += (delta.value * 0.04)
  }
}

export const runSmokeAnimation = (canvas: HTMLCanvasElement) => {
  init(canvas)
  addSmoke()
  animate()
}

export const cancelSmokeAnimation = () => {
  id.value && cancelAnimationFrame(id.value)
}
