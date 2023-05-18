<template>
  <div>
    <div class="note-text">Create random SpotLight</div>
    <progress value="0" max="100" id="progressBar"></progress>
    <nav-menu />
  </div>
</template>
<script>
//import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import TWEEN from '@tweenjs/tween.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
export default {
  name: 'DrawRainBowLightPage',
  components: {
    NavMenu
  },
  mounted() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    //renderer.setClearColor(MYCONST.RENDERER_CLEAR_COLOR);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    //renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.$el.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true
    controls.update();

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    const planeGeometry = new THREE.PlaneGeometry(15, 15)
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ color: 0xaaaaaa }))
    plane.rotateX(-Math.PI / 2)
    plane.position.y = -0.05
    plane.receiveShadow = true
    scene.add(plane)

    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.translateY(-0.01)
    scene.add(gridHelper)

    const mirrorBack1 = new Reflector(
      new THREE.PlaneGeometry(4, 4),
      {
        color: new THREE.Color(0xcccccc),
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
      }
    )
    mirrorBack1.position.y = 1
    mirrorBack1.position.z = -2
    scene.add(mirrorBack1)

    const light = new THREE.DirectionalLight()
    light.castShadow = true
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 100
    light.position.set(0, 10, 10);
    // light.color.setHex(0xff0000)
    scene.add(light)

    const ambient = new THREE.AmbientLight(0x111111);
    scene.add(ambient)

    const progressBar = document.getElementById(
      'progressBar'
    )

    const spotLightColors = [0xFF0000, 0xFFA500, 0xFFFF00, 0x008000, 0x0000FF, 0x4B0082, 0xEE82EE];
    const spotLights = [];
    const spotlightTargets = [];

    for (let i = 0; i < spotLightColors.length; i++) {
      const spotlight = createSpotlight(spotLightColors[i]);
      spotlight.position.set(0, 3, 0);
      spotLights.push(spotlight);

      const spotlightTarget = createSpotlightTarget();
      spotlight.target = spotlightTarget;
      spotlightTargets.push(spotlightTarget);

      scene.add(spotlight, spotlightTarget);
    }

    function createSpotlight(color) {
      const spotlight = new THREE.SpotLight(color, 2);
      // spotlight.castShadow = true;
      spotlight.angle = 0.1;
      spotlight.penumbra = 0.5;
      spotlight.decay = 1;
      spotlight.distance = 10;
      return spotlight;
    }

    function createSpotlightTarget() {
      const spotlightTarget = new THREE.Object3D();
      spotlightTarget.position.set(0, 0, 0);
      return spotlightTarget;
    }

    function tween(light) {

      new TWEEN.Tween(light).to({
        angle: Math.random() * (0.3 - 0.1) + 0.1,
        penumbra: Math.random() * (1 - 0.3) + 0.3,
      }, 10)
        .easing(TWEEN.Easing.Quadratic.Out).start();

    }

    function target(st) {
      const r = 8;
      new TWEEN.Tween(st.position).to({
        x: Math.random() * r * 2 - r
      }, 10)
        .easing(TWEEN.Easing.Quadratic.Out).start();

      let zz = Math.sqrt(r * r - st.position.x * st.position.x);
      new TWEEN.Tween(st.position).to({
        z: Math.random() * zz * 2 - zz
      }, 10)
        .easing(TWEEN.Easing.Quadratic.Out).start();
    }

    const mixer = {}
    let modelReady = {}

    const fbxLoader = new FBXLoader()

    const loadModel = (url, scale, position, animationIndex) => {
      fbxLoader.load(
        url,
        (object) => {
          progressBar.style.display = 'none'
          object.scale.set(scale, scale, scale)
          object.position.copy(position)
          object.traverse(function (child) { child.castShadow = true; child.receiveShadow = true; });
          mixer[url] = new THREE.AnimationMixer(object)

          const animationAction = mixer[url].clipAction(
            (object).animations[animationIndex]
          )

          scene.add(object)
          modelReady[url] = true
          setAction(animationAction)
        },
        (xhr) => {
          const percentComplete = (xhr.loaded / xhr.total) * 100
          progressBar.value = percentComplete === Infinity ? 100 : percentComplete
        },
        (error) => {
          console.log(error)
        }
      )
    }

    const setAction = (toAction) => {
      toAction.reset()
      toAction.fadeIn(1)
      toAction.play()
    }

    // must using 2 clock to run 2 models independently
    const clocks = [];
    const numClocks = 1;
    //loadModel('models/Hip Hop Dancing.fbx', 0.008, new THREE.Vector3(0, 0, -1), 0)
    loadModel('models/eve@dancing.fbx', 0.01, new THREE.Vector3(0, 0, 0), 0)

    for (let i = 0; i < numClocks; i++) {
      clocks.push(new THREE.Clock());
    }

    const animate = function () {

      for (let i = 0; i < spotLightColors.length; i++) {
        tween(spotLights[i]);
        target(spotlightTargets[i]);
      }
      let i = 0;
      for (const url in mixer) {
        if (Object.prototype.hasOwnProperty.call(mixer, url)) {
          const animationMixer = mixer[url]
          if (modelReady[url]) {
            animationMixer.update(clocks[i++].getDelta())
          }
        }
      }
      controls.update()
      render()
    };

    function render() {
      TWEEN.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);
  }
}
</script>
