<template>
  <div>
    <div class="note-text">A-W-S-D to move camera. Arrow key to move vehicle. Left click to shoot. Esc
      to exit</div>

    <progress value="0" max="100" id="progressBar"></progress>
    <nav-menu />
    <div id="menuPanel">
      <button id="startButton">Click to Start</button>
    </div>
  </div>
</template>
<script>
//import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
// import Stats from 'three/examples/jsm/libs/stats.module'
import * as CANNON from 'cannon-es'
import CannonUtils from './utils/cannonUtils'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from '@tweenjs/tween.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
  name: 'ConvexObjectPage',
  components: {
    NavMenu
  },
  mounted() {
    const scene = new THREE.Scene();

    const light1 = new THREE.DirectionalLight()
    light1.position.set(20, 20, 20)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight()
    light2.position.set(-20, 20, 20)
    scene.add(light2)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    //renderer.setClearColor(MYCONST.RENDERER_CLEAR_COLOR);
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.$el.appendChild(renderer.domElement)

    // const controlsOrbit = new OrbitControls(camera, renderer.domElement);
    const progressBar = document.getElementById(
      'progressBar'
    )

    const menuPanel = document.getElementById('menuPanel')
    const startButton = document.getElementById('startButton')
    startButton.addEventListener(
      'click',
      function () {
        controls.lock()
      },
      false
    )

    const controls = new PointerLockControls(camera, renderer.domElement)
    controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
    controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

    camera.position.y = 1
    camera.position.z = 4

    // movement - please calibrate these values
    // var xSpeed = 0.25;
    // var ySpeed = 0.25;
    let axisY = new THREE.Vector3(0, 1, 0);
    let currentDir = new THREE.Vector3(0, 0, 1);

    const onKeyDown = function (event) {
      switch (event.key) {
        case 'w':
          controls.moveForward(0.25)
          break
        case 'a':
          controls.moveRight(-0.25)
          break
        case 's':
          controls.moveForward(-0.25)
          break
        case 'd':
          controls.moveRight(0.25)
          break
        case 'ArrowRight':
          {
            currentDir.applyAxisAngle(axisY, -Math.PI / 10);
            let _q = new THREE.Quaternion();
            _q.setFromAxisAngle(axisY, -Math.PI / 10)
            let tempRot = new THREE.Quaternion();
            tempRot.copy(weapon.quaternion);
            tempRot.multiply(_q);
            new TWEEN.Tween(weapon.quaternion)
              .to(
                {
                  _x: tempRot._x,
                  _y: tempRot._y,
                  _z: tempRot._z,
                  _w: tempRot._w,
                },
                1000
              )
              .easing(TWEEN.Easing.Cubic.Out)
              .start()
          }
          break
        case 'ArrowLeft':
          {
            currentDir.applyAxisAngle(axisY, Math.PI / 10);
            let _q = new THREE.Quaternion();
            _q.setFromAxisAngle(axisY, Math.PI / 10)
            let tempRot = new THREE.Quaternion();
            tempRot.copy(weapon.quaternion);
            tempRot.multiply(_q);
            new TWEEN.Tween(weapon.quaternion)
              .to(
                {
                  _x: tempRot._x,
                  _y: tempRot._y,
                  _z: tempRot._z,
                  _w: tempRot._w,
                },
                1000
              )
              .easing(TWEEN.Easing.Cubic.Out)
              .start()
          }
          break
        case 'ArrowUp':
          {
            let tempPos = new THREE.Vector3()
            tempPos.copy(weapon.position)
            let tempDir = new THREE.Vector3(0, 0, 1)
            tempDir.applyQuaternion(weapon.quaternion);
            tempDir.y = 0;
            tempPos.addScaledVector(tempDir, 0.5)
            new TWEEN.Tween(weapon.position)
              .to(
                {
                  x: tempPos.x,
                  y: tempPos.y,
                  z: tempPos.z,
                },
                1000
              )
              .easing(TWEEN.Easing.Cubic.Out)
              .start()
          }
          break
        case 'ArrowDown':
          {
            let tempPos = new THREE.Vector3()
            tempPos.copy(weapon.position)
            let tempDir = new THREE.Vector3(0, 0, 1)
            tempDir.applyQuaternion(weapon.quaternion);
            tempDir.y = 0;
            tempPos.addScaledVector(tempDir, -0.5)
            new TWEEN.Tween(weapon.position)
              .to(
                {
                  x: tempPos.x,
                  y: tempPos.y,
                  z: tempPos.z,
                },
                1000
              )
              .easing(TWEEN.Easing.Cubic.Out)
              .start()
          }
          break
        case 'Space':
          weapon.position.set(0, 0, 0);
          break
      }
    }
    document.addEventListener('keydown', onKeyDown, false)

    const world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    //;(world.solver as CANNON.GSSolver).iterations = 20
    //world.allowSleep = true

    const material = new THREE.MeshStandardMaterial({
      //color: 0xa2ffb8,
      color: 0xffffff,
      //reflectivity: 0.15,
      metalness: 1.0,
      roughness: 0.25,
      transparent: true,
      opacity: 0.75,
      //transmission: 1.0,
      side: THREE.DoubleSide,
      //clearcoat: 1.0,
      //clearcoatRoughness: 0.35,
    })

    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envTexture = new THREE.TextureLoader().load(
      'img/pano-equirectangular.jpg',
      () => {
        material.envMap = pmremGenerator.fromEquirectangular(envTexture).texture
      }
    )

    const meshes = {}
    const bodies = {}
    let meshId = 0

    const groundMirror = new Reflector(new THREE.PlaneGeometry(1024, 1024), {
      color: new THREE.Color(0x222222),
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
    })
    groundMirror.position.y = -0.05
    groundMirror.rotateX(-Math.PI / 2)
    scene.add(groundMirror)

    const planeShape = new CANNON.Plane()
    const planeBody = new CANNON.Body({ mass: 0 })
    planeBody.addShape(planeShape)
    planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    world.addBody(planeBody)

    const convexObjectBreaker = new ConvexObjectBreaker()

    for (let i = 0; i < 20; i++) {
      const size = {
        x: Math.random() * 4 + 2,
        y: Math.random() * 10 + 5,
        z: Math.random() * 4 + 2,
      }
      const geo = new THREE.BoxGeometry(
        size.x,
        size.y,
        size.z
      )
      const cube = new THREE.Mesh(geo, material)

      cube.position.x = Math.random() * 50 - 25
      cube.position.y = size.y / 2 + 0.1
      cube.position.z = Math.random() * 50 - 25

      if (Math.abs(cube.position.x - camera.position.x) < 5 && Math.abs(cube.position.z - camera.position.z) < 5) {
        cube.position.x += 5;
        cube.position.z += 5;
      }

      scene.add(cube)
      meshes[meshId] = cube
      convexObjectBreaker.prepareBreakableObject(
        meshes[meshId],
        1,
        new THREE.Vector3(),
        new THREE.Vector3(),
        true
      )

      const cubeShape = new CANNON.Box(
        new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
      )
      const cubeBody = new CANNON.Body({ mass: 1 })
        ; (cubeBody).userData = { splitCount: 0, id: meshId }
      cubeBody.addShape(cubeShape)
      cubeBody.position.x = cube.position.x
      cubeBody.position.y = cube.position.y
      cubeBody.position.z = cube.position.z

      world.addBody(cubeBody)
      bodies[meshId] = cubeBody

      meshId++
    }

    const bullets = {}
    const bulletBodies = {}
    let bulletId = 0

    const bulletMaterial = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load('img/marble.png'),
      clearcoat: 1.0,
      clearcoatRoughness: 0,
      clearcoatMap: null,
      clearcoatRoughnessMap: null,
      metalness: 0.4,
      roughness: 0.3,
      color: 'white',
    })
    document.addEventListener('click', onClick, false)
    function onClick() {
      if (controls.isLocked) {
        const bullet = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 16, 16),
          bulletMaterial
        )
        bullet.position.copy(weapon.position)
        bullet.position.y += 2
        scene.add(bullet)
        bullets[bulletId] = bullet

        const bulletShape = new CANNON.Sphere(0.5)
        const bulletBody = new CANNON.Body({ mass: 1 })
        bulletBody.addShape(bulletShape)
        bulletBody.position.x = weapon.position.x
        bulletBody.position.y = weapon.position.y
        bulletBody.position.z = weapon.position.z
        bulletBody.position.y += 2

        world.addBody(bulletBody)
        bulletBodies[bulletId] = bulletBody

        bulletBody.addEventListener('collide', (e) => {
          if (e.body.userData) {
            if (e.body.userData.splitCount < 2) {
              splitObject(e.body.userData, e.contact)
            }
          }
        })

        //const v = raycaster.ray.direction.clone();
        const v = new THREE.Vector3(0, 0, 1)
        v.applyQuaternion(weapon.quaternion)
        // const gunPos = new THREE.Vector3()
        // gunPos.set(weapon.position.x, weapon.position.y+2, weapon.position.z)
        //v.subVectors(pointS.position, gunPos).normalize();

        // const v = new THREE.Vector3(0, 0, -1) // (0, 0 , -1) to shoot behind
        // v.applyQuaternion(camera.quaternion)
        // v.multiplyScalar(50)
        v.multiplyScalar(50);
        bulletBody.velocity.set(v.x, v.y, v.z)
        bulletBody.angularVelocity.set(
          Math.random() * 10 + 1,
          Math.random() * 10 + 1,
          Math.random() * 10 + 1
        )

        bulletId++

        //remove old bullets
        while (Object.keys(bullets).length > 5) {
          scene.remove(bullets[bulletId - 6])
          delete bullets[bulletId - 6]
          world.removeBody(bulletBodies[bulletId - 6])
          delete bulletBodies[bulletId - 6]
        }
      }
    }

    function splitObject(userData, contact) {
      const contactId = userData.id
      if (meshes[contactId]) {
        const poi = bodies[contactId].pointToLocalFrame(
          (contact.bj.position).vadd(contact.rj)
        )
        const n = new THREE.Vector3(
          contact.ni.x,
          contact.ni.y,
          contact.ni.z
        ).negate()
        const shards = convexObjectBreaker.subdivideByImpact(
          meshes[contactId],
          new THREE.Vector3(poi.x, poi.y, poi.z),
          n,
          1,
          0
        )

        scene.remove(meshes[contactId])
        delete meshes[contactId]
        world.removeBody(bodies[contactId])
        delete bodies[contactId]

        shards.forEach((d) => {
          const nextId = meshId++

          scene.add(d)
          meshes[nextId] = d
            ; (d).geometry.scale(0.99, 0.99, 0.99)
          const shape = gemoetryToShape((d).geometry)

          const body = new CANNON.Body({ mass: 1 })
          body.addShape(shape)
            ; (body).userData = {
              splitCount: userData.splitCount + 1,
              id: nextId,
            }
          body.position.x = d.position.x
          body.position.y = d.position.y
          body.position.z = d.position.z
          body.quaternion.x = d.quaternion.x
          body.quaternion.y = d.quaternion.y
          body.quaternion.z = d.quaternion.z
          body.quaternion.w = d.quaternion.w
          world.addBody(body)
          bodies[nextId] = body
        })
      }
    }

    function gemoetryToShape(geometry) {
      const position = (geometry.attributes.position).array
      const points = []
      for (let i = 0; i < position.length; i += 3) {
        points.push(
          new THREE.Vector3(position[i], position[i + 1], position[i + 2])
        )
      }
      const convexHull = new ConvexGeometry(points)
      const shape = CannonUtils.CreateConvexPolyhedron(convexHull)
      return shape
    }

    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    const geometryS = new THREE.SphereGeometry(0.05)
    const materialS = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const pointS = new THREE.Mesh(geometryS, materialS)
    scene.add(pointS)
    pointS.visible = false;
    const geometryT = new THREE.TorusGeometry(0.2, 0.01, 16, 100)
    const materialT = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const torus = new THREE.Mesh(geometryT, materialT)
    scene.add(torus)
    torus.visible = false;

    renderer.domElement.addEventListener('mousemove', onMouseMove, false)
    function onMouseMove(event) {
      event.preventDefault()
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY - 82) / window.innerHeight) * 2 + 1
      )

      raycaster.setFromCamera(mouse, camera)

      let arrayMeshs = [];
      Object.keys(meshes).forEach((m) => {
        arrayMeshs.push(meshes[m]);
      })

      const wall_intersects = raycaster.intersectObjects(arrayMeshs, false)

      if (wall_intersects.length > 0) {

        const n = new THREE.Vector3()
        n.copy((wall_intersects[0].face).normal)
        n.transformDirection(wall_intersects[0].object.matrixWorld)

        // arrowHelper.setDirection(n)
        // arrowHelper.position.copy(wall_intersects[0].point)
        // arrowHelper.visible = true;
        pointS.lookAt(n)
        pointS.position.copy(wall_intersects[0].point)
        pointS.position.addScaledVector(n, 0.1)
        pointS.visible = true;

        torus.lookAt(n)
        torus.position.copy(wall_intersects[0].point)
        torus.position.addScaledVector(n, 0.1)
        torus.visible = true;
        if (weapon) {
          const rotationMatrix = new THREE.Matrix4()
          //const rayDirection = raycaster.ray.direction.clone()
          const direction = new THREE.Vector3()
          const gunPos = new THREE.Vector3()
          gunPos.set(weapon.position.x, weapon.position.y+2, weapon.position.z)
          direction.subVectors(pointS.position, gunPos).normalize();
          rotationMatrix.lookAt(weapon.position, weapon.position.clone().add(direction), weapon.up)
          weapon.quaternion.setFromRotationMatrix(rotationMatrix);
          weapon.rotateY(Math.PI)
        }
      }
      else {
        pointS.visible = false;
        torus.visible = false;
        if (weapon) {
          const rotationMatrix = new THREE.Matrix4()
          const rayDirection = raycaster.ray.direction.clone()
          const pointB = new THREE.Vector3();
          pointB.copy(camera.position).add(rayDirection.multiplyScalar(1000));
          const direction = new THREE.Vector3()
          const gunPos = new THREE.Vector3()
          gunPos.set(weapon.position.x, weapon.position.y+2, weapon.position.z)
          direction.subVectors(pointB, gunPos).normalize();

          rotationMatrix.lookAt(weapon.position, weapon.position.clone().add(direction), weapon.up)
          weapon.quaternion.setFromRotationMatrix(rotationMatrix);
          weapon.rotateY(Math.PI)
        }
      }
      arrayMeshs = [];
    }

    var weapon = null;
    const loader = new GLTFLoader()
    loader.load(
      'models/artillery_military_weapon.glb',
      function (gltf) {
        progressBar.style.display = 'none'
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
        gltf.scene.scale.set(0.01, 0.01, 0.01)
        weapon = gltf.scene;
        weapon.rotateY(Math.PI);
        scene.add(gltf.scene)
      },
      (xhr) => {
        const percentComplete = (xhr.loaded / xhr.total) * 100
        progressBar.value = percentComplete === Infinity ? 100 : percentComplete
      },
    )

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      render()
    }
    // const options = {
    //   side: {
    //     FrontSide: THREE.FrontSide,
    //     BackSide: THREE.BackSide,
    //     DoubleSide: THREE.DoubleSide,
    //   },
    // }

    const clock = new THREE.Clock()
    let delta

    function animate() {
      requestAnimationFrame(animate)

      delta = clock.getDelta()
      if (delta > 0.1) delta = 0.1
      world.step(delta)

      Object.keys(meshes).forEach((m) => {
        meshes[m].position.set(
          bodies[m].position.x,
          bodies[m].position.y,
          bodies[m].position.z
        )
        meshes[m].quaternion.set(
          bodies[m].quaternion.x,
          bodies[m].quaternion.y,
          bodies[m].quaternion.z,
          bodies[m].quaternion.w
        )
      })

      Object.keys(bullets).forEach((b) => {
        bullets[b].position.set(
          bulletBodies[b].position.x,
          bulletBodies[b].position.y,
          bulletBodies[b].position.z
        )
        bullets[b].quaternion.set(
          bulletBodies[b].quaternion.x,
          bulletBodies[b].quaternion.y,
          bulletBodies[b].quaternion.z,
          bulletBodies[b].quaternion.w
        )
      })

      // controlsOrbit.update();
      TWEEN.update()

      render()

      // stats.update()
    }

    function render() {
      renderer.render(scene, camera)
    }

    animate()
  }
}
</script>