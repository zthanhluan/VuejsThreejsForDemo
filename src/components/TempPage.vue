<template>
  <div>
    <h1>Create Temp Page in Threejs</h1>
    <nav-menu />
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
  name: 'TempPage',
  components: {
    NavMenu
  },
  mounted() {
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0x444444);
      renderer.setSize( window.innerWidth, window.innerHeight );
      
      this.$el.appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );

      const axesHelper = new THREE.AxesHelper( 5 );
      scene.add( axesHelper );

      camera.position.set(5,5,5);

      const animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
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
