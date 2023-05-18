<template>
  <div>
    <div class="note-text">Hello</div>
    <nav-menu />
    <div id="my-gui-container"></div>
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue';
import * as MYCONST from '@/const.js';
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let gui;
export default {
  name: 'TempPage',
  components: {
    NavMenu
  },
  unmounted() {
    if (gui) gui.destroy();
    gui = null;
  },
  mounted() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(MYCONST.RENDERER_CLEAR_COLOR);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.$el.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    camera.position.set(5, 5, 5);


    gui = new GUI({ autoPlace: false });
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);
  }
}
</script>
