<template>
  <div>
    <div class="note-text">Press CTRL + Left Mouse Click to start drawing a line. <br>Continue to hold CTRL and Left Mouse Click again to mark the end of the line.</div>
    <nav-menu />
  </div>
</template>
<script>
//import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
export default {
  name: 'DrawDimensionPage',
  components: {
    NavMenu
  },
  mounted() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888);

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    labelRenderer.domElement.style.pointerEvents = 'none'
    this.$el.appendChild(labelRenderer.domElement)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 3, 3);

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
    //controls.autoRotate = true
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

    //raycaster
    renderer.domElement.addEventListener('dblclick', onDoubleClick, false)
    renderer.domElement.addEventListener('mousemove', onMouseMove, false)

    let geometrysphere = new THREE.SphereGeometry(3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 2);
    let materialsphere = new THREE.MeshNormalMaterial();
    const spheresphere = new THREE.Mesh(geometrysphere, materialsphere);
    spheresphere.position.set(0, 1, 2);
    spheresphere.name = "s1";
    spheresphere.scale.set(0.1, 0.1, 0.1);
    scene.add(spheresphere);

    let geometrysphere1 = new THREE.SphereGeometry(3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 2);
    let materialsphere1 = new THREE.MeshNormalMaterial();
    const spheresphere1 = new THREE.Mesh(geometrysphere1, materialsphere1);
    spheresphere1.position.set(2, 1, 0);
    spheresphere1.scale.set(0.1, 0.1, 0.1);
    spheresphere1.name = "s2";
    scene.add(spheresphere1);

    let intersectedObject
    const originalMaterials = {}
    originalMaterials[spheresphere.name] = (spheresphere).material
    originalMaterials[spheresphere1.name] = (spheresphere1).material

    const highlightedMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x00ff00,
    })

    let sceneMeshes = []
    sceneMeshes.push(spheresphere)
    sceneMeshes.push(spheresphere1)

    const arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0.25,
      0xff0000
    )
    const coneGeometry = new THREE.ConeGeometry(0.05, 0.2, 8)
    const material = new THREE.MeshNormalMaterial()
    scene.add(arrowHelper)

    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    var intersects

    function onMouseMove(event) {
      event.preventDefault()
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY - 82) / window.innerHeight) * 2 + 1
      )

      if (drawingLine) {
        raycaster.setFromCamera(mouse, camera)
        intersects = raycaster.intersectObjects(sceneMeshes, false)
        if (intersects.length > 0) {
          const positions = (
            line.geometry.attributes.position
          ).array
          const v0 = new THREE.Vector3(
            positions[0],
            positions[1],
            positions[2]
          )
          const v1 = new THREE.Vector3(
            intersects[0].point.x,
            intersects[0].point.y,
            intersects[0].point.z
          )
          positions[3] = intersects[0].point.x
          positions[4] = intersects[0].point.y
          positions[5] = intersects[0].point.z
          line.geometry.attributes.position.needsUpdate = true
          const distance = v0.distanceTo(v1)
          measurementLabels[lineId].element.innerText =
            distance.toFixed(2) + 'm'
          measurementLabels[lineId].position.lerpVectors(v0, v1, 0.5)
        }
      }
      // console.log(mouse)

      raycaster.setFromCamera(mouse, camera)

      const intersects1 = raycaster.intersectObjects(sceneMeshes, false)

      if (intersects1.length > 0) {

        const n = new THREE.Vector3()
        n.copy((intersects1[0].face).normal)
        n.transformDirection(intersects1[0].object.matrixWorld)

        arrowHelper.setDirection(n)
        arrowHelper.position.copy(intersects1[0].point)
      }
      if (intersects1.length > 0) {
        intersectedObject = intersects1[0].object;
      } else {
        intersectedObject = null;
      }
      for (let i = 0; i < sceneMeshes.length; i++) {
        if (intersectedObject && intersectedObject.name === sceneMeshes[i].name) {
          (sceneMeshes[i]).material = highlightedMaterial
        }
        else {
          (sceneMeshes[i]).material = originalMaterials[sceneMeshes[i].name]
        }
      }
    }

    function onDoubleClick(event) {
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY - 82) / window.innerHeight) * 2 + 1
      )
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(sceneMeshes, false)

      if (intersects.length > 0) {
        const n = new THREE.Vector3()
        n.copy((intersects[0].face).normal)
        n.transformDirection(intersects[0].object.matrixWorld)

        const cube = new THREE.Mesh(coneGeometry, material)

        cube.lookAt(n)
        cube.rotateX(Math.PI / 2)
        cube.position.copy(intersects[0].point)
        cube.position.addScaledVector(n, 0.1)

        scene.add(cube)
      }
    }

    let ctrlDown = false
    let lineId = 0
    let line
    let drawingLine = false
    const measurementLabels = {}

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Control') {
        ctrlDown = true
        controls.enabled = false
        renderer.domElement.style.cursor = 'crosshair'
      }
    })

    window.addEventListener('keyup', function (event) {
      if (event.key === 'Control') {
        ctrlDown = false
        controls.enabled = true
        renderer.domElement.style.cursor = 'pointer'
        if (drawingLine) {
          //delete the last line because it wasn't committed
          scene.remove(line)
          scene.remove(measurementLabels[lineId])
          drawingLine = false
        }
      }
    })

    renderer.domElement.addEventListener('pointerdown', onClick, false)
    function onClick() {
      if (ctrlDown) {
        raycaster.setFromCamera(mouse, camera)
        intersects = raycaster.intersectObjects(sceneMeshes, false)
        if (intersects.length > 0) {
          if (!drawingLine) {
            //start the line
            const points = []
            points.push(intersects[0].point)
            points.push(intersects[0].point.clone())
            const geometry = new THREE.BufferGeometry().setFromPoints(
              points
            )
            line = new THREE.LineSegments(
              geometry,
              new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.75,
                // depthTest: false,
                // depthWrite: false
              })
            )
            line.frustumCulled = false
            scene.add(line)

            const measurementDiv = document.createElement(
              'div'
            )
            measurementDiv.className = 'measurementLabel'
            measurementDiv.innerText = '0.0m'
            const measurementLabel = new CSS2DObject(measurementDiv)
            measurementLabel.position.copy(intersects[0].point)
            measurementLabels[lineId] = measurementLabel
            scene.add(measurementLabels[lineId])
            drawingLine = true
          } else {
            //finish the line
            const positions = (
              line.geometry.attributes.position
            ).array
            positions[3] = intersects[0].point.x
            positions[4] = intersects[0].point.y
            positions[5] = intersects[0].point.z
            line.geometry.attributes.position.needsUpdate = true
            lineId++
            drawingLine = false
          }
        }
      }
    }


    const animate = function () {
      controls.update()
      render()
    };

    function render() {
      labelRenderer.render(scene, camera)
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
