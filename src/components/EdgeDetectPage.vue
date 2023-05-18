<template>
  <div>

    <nav-menu />
    <div id="my-gui-container"></div>
  </div>
</template>
<script>
//import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let gui;

export default {
  name: 'EdgeDetectPage',
  components: {
    NavMenu
  },
  unmounted() {
    if (gui) {
      gui.destroy();
    }
    gui = null
  },
  mounted() {
    let camera, scene, renderer, composer;

    let effectSobel;

    const params = {
      enable: true
    };

    let doc = this.$el;
    init(doc);
    animate();



    function init(doc) {

      //

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 10, 25);
      camera.lookAt(scene.position);

      //

      // const geometry = new THREE.TorusKnotGeometry(8, 3, 256, 32, 2, 3);
      // const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });

      // const mesh = new THREE.Mesh(geometry, material);
      // scene.add(mesh);

      const loader = new GLTFLoader()
      loader.load(
        'models/artillery_military_weapon.glb',
        function (gltf) {
          gltf.scene.traverse(function (child) {
            if ((child).isMesh) {
              const m = child
              m.receiveShadow = true
              m.castShadow = true
            }
            if ((child).isLight) {
              const l = child
              l.castShadow = true
              l.shadow.bias = -0.003
              l.shadow.mapSize.width = 2048
              l.shadow.mapSize.height = 2048
            }
          })
          gltf.scene.scale.set(0.06, 0.06, 0.06)
          gltf.scene.rotateY(Math.PI / 2)
          scene.add(gltf.scene)
        },
      )
      //

      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      camera.add(pointLight);
      scene.add(camera);

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      doc.appendChild(renderer.domElement);

      // postprocessing

      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // color to grayscale conversion

      const effectGrayScale = new ShaderPass(LuminosityShader);
      composer.addPass(effectGrayScale);

      // you might want to use a gaussian blur filter before
      // the next pass to improve the result of the Sobel operator

      // Sobel operator

      effectSobel = new ShaderPass(SobelOperatorShader);
      effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
      effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;
      composer.addPass(effectSobel);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 10;
      controls.maxDistance = 100;

      //

      gui = new GUI({ autoPlace: false });
      var customContainer = document.getElementById('my-gui-container');
      customContainer.appendChild(gui.domElement);

      gui.add(params, 'enable');
      gui.close();

      //

      window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);

      effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
      effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    }

    function animate() {

      requestAnimationFrame(animate);

      if (params.enable === true) {

        composer.render();

      } else {

        renderer.render(scene, camera);

      }

    }
  }
}
</script>