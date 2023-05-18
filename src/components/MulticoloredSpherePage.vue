<template>
  <div>

    <nav-menu />
  </div>
</template>
<script>
import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
  name: 'MulticoloredSpherePage',
  components: {
    NavMenu
  },
  mounted() {
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(MYCONST.RENDERER_CLEAR_COLOR);
      renderer.setSize( window.innerWidth, window.innerHeight );
      
      this.$el.appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );

      const axesHelper = new THREE.AxesHelper( 10 );
      scene.add( axesHelper );

      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      // const cube = new THREE.Mesh( geometry, material );
      // scene.add( cube );
      const size = 10;
      const divisions = 10;

      const gridHelper = new THREE.GridHelper( size, divisions );
      scene.add( gridHelper );
      // const geometryp = new THREE.PlaneGeometry( 10, 10 );
      // const materialp = new THREE.MeshBasicMaterial( {color: 0x444400, side: THREE.DoubleSide} );
      // const plane = new THREE.Mesh( geometryp, materialp );
      // plane.rotateX(Math.PI/2);
      // scene.add( plane );

      camera.position.set(5,5,5);

      var sphereMesh;
      const createsphere = function () {
        const radius = 3;
        const widthSegments = 32;
        const heightSegments = 32;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        var rainbowColors = [
          0xff0000, // Đỏ
          0xffa500, // Cam
          0xffff00, // Vàng
          0x00ff00, // Xanh lá
          0x0000ff, // Xanh dương
          0x4b0082, // Xanh da trời
          0xee82ee  // Tím
        ];
        const colors = new Array(sphereGeometry.attributes.position.count).fill().map(() =>
            new THREE.Color().setHex(rainbowColors[Math.floor(Math.random() * rainbowColors.length)])
        );
        const colorAttribute = new THREE.Float32BufferAttribute(colors.flatMap(color => color.toArray()), 3);
        sphereGeometry.setAttribute('color', colorAttribute);
        const material = new THREE.MeshBasicMaterial({ vertexColors: true });
        sphereMesh = new THREE.Mesh(sphereGeometry, material);
        // sphereMesh.position.set(0,3,0);
        scene.add(sphereMesh);
      }
      createsphere();

      const animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        sphereMesh.rotation.y += 0.02;
        sphereMesh.rotation.x += 0.02;
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
