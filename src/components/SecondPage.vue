<template>
  <div>
    <div class="note-text">Using mouse move and mouse click</div>
    <h1>Create particle system in Threejs</h1>
    <nav-menu />
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import TWEEN from '@tweenjs/tween.js'
export default {
  name: 'SecondPage',
  components: {
    NavMenu
  },
  mounted() {
    // Khởi tạo scene, camera, renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5,1,5);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x444444);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$el.appendChild(renderer.domElement);

    const controls = new OrbitControls( camera, renderer.domElement );

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // const geometryp = new THREE.PlaneGeometry( 2, 2 );
    // const materialp = new THREE.MeshBasicMaterial( {color: 0xff0, side: THREE.DoubleSide} );
    // const plane = new THREE.Mesh( geometryp, materialp );
    // plane.rotateX(Math.PI/2);
    // scene.add( plane );
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    const particleGeometry = new THREE.BufferGeometry();

    // generate random positions for each particle
    const positions = [];
    // const colors = [];
    for (let i = 0; i < 100; i++) {
      positions.push(
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20)
      );
      // // add a random color for the particle
      // colors.push(
      //   Math.random(), // r
      //   Math.random(), // g
      //   Math.random(), // b
      //   1 // a
      // );
    }

    // create a buffer attribute for the particle positions
    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    particleGeometry.setAttribute('position', positionAttribute);

    // // create a buffer attribute for the particle colors
    // const colorAttribute = new THREE.Float32BufferAttribute(colors, 4);
    // particleGeometry.setAttribute('color', colorAttribute);

    // create a particle material
    const particleMaterial = new THREE.PointsMaterial();

    // create a particle system and add it to the scene
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // // Khởi tạo audio listener
    // var listener = new THREE.AudioListener();
    // camera.add(listener);

    // // Tải âm thanh
    // var audioLoader = new THREE.AudioLoader();
    // var sound;
    // audioLoader.load('sound.mp3', function(buffer) {
    //     sound = new THREE.Audio(listener);
    //     sound.setBuffer(buffer);
    //     sound.setLoop(true);
    //     sound.setVolume(0.5);
    //     sound.play();
    // });

    // Thêm sự kiện mousemove để thay đổi background
    document.addEventListener('mousemove', function(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        // Di chuyển particle theo vị trí của chuột
        particleSystem.rotation.x += 0.02;
        particleSystem.rotation.y += 0.02;
        particleSystem.position.x = (mouseX / window.innerWidth) * 2 - 1;
        particleSystem.position.y = -(mouseY / window.innerHeight) * 2 + 1;

        // Thay đổi màu nền dựa trên vị trí của particle
        var color = new THREE.Color(0xffffff);
        color.r = particleSystem.position.x * 0.5 + 0.5;
        color.g = particleSystem.position.y * 0.5 + 0.5;
        renderer.setClearColor(color);
    });
    var bSplat = false;
    document.addEventListener('click', (event) => {
      // calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // unproject mouse position into particleSystem's local coordinate system
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const particleSystemWorldPosition = new THREE.Vector3();
      particleSystem.getWorldPosition(particleSystemWorldPosition);
      const particleSystemWorldQuaternion = new THREE.Quaternion();
      particleSystem.getWorldQuaternion(particleSystemWorldQuaternion);
      const particleSystemWorldScale = new THREE.Vector3();
      particleSystem.getWorldScale(particleSystemWorldScale);
      const particleSystemMatrixWorld = new THREE.Matrix4();
      particleSystemMatrixWorld.compose(
        particleSystemWorldPosition,
        particleSystemWorldQuaternion,
        particleSystemWorldScale
      );
      var particleSystemInverseMatrixWorld = new THREE.Matrix4();
      particleSystemInverseMatrixWorld = particleSystemMatrixWorld;
      particleSystemInverseMatrixWorld.invert();
      const particleSystemLocalRaycaster = new THREE.Raycaster();
      particleSystemLocalRaycaster.ray.copy(raycaster.ray);
      particleSystemLocalRaycaster.ray.applyMatrix4(particleSystemInverseMatrixWorld);
      const intersection = particleSystemLocalRaycaster.intersectObject(particleSystem);
      if (intersection.length > 0) {
        // update particle positions
        const positionAttribute = particleGeometry.getAttribute('position');
        if (!bSplat) {
          const array0 = new Float32Array(positionAttribute.count * 3);
          for (let i = 0; i < positionAttribute.count * 3; i+=3) {
            array0[i] = positionAttribute.getX(i/3);
            array0[i+1] = 0;
            array0[i+2] = positionAttribute.getZ(i/3);

          }
          positionAttribute.array = array0; // cập nhật vị trí mới
          positionAttribute.needsUpdate = true; // cập nhật thay đổi
          bSplat = true;
        } else {
          const array1 = new Float32Array(positionAttribute.count * 3);
          for (let i = 0; i < positionAttribute.count * 3; i++) {
            array1[i] = THREE.MathUtils.randFloatSpread(20);
          }
          positionAttribute.array = array1; // cập nhật vị trí mới
          positionAttribute.needsUpdate = true; // cập nhật thay đổi
          bSplat = false;
        }

      }
    });

    // Render scene
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        //TWEEN.update();
        renderer.render(scene, camera);
    }
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
<style>
.note-text {
  position: absolute;
  top: 110px;
  left: 20px;
  font-size: 16px;
}
body {
  min-width: 800px;
  min-height: 600px;
}
h1 {
  border: 2px solid black;
}
</style>