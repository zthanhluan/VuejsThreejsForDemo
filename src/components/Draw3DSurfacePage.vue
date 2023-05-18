<template>
  <div>
    <div id="inputfordraw3dsurface">
      <div class="form-outline mb-4">
        <textarea class="form-control" id="coord" name="coord" rows="3"
          placeholder="Point { x=??? } - (???), Line { x=???, y =??? } - (???,???) or Surface{ x=???, y=???, z=??? } - (???,???,???)"></textarea>
      </div>
      <div>
        <input type="color" id="color-picker" name="color-picker" value="#ff0000">
        <button class="btn btn-primary rounded-pill px-3" type="button" id="enter">Enter</button>
        <button class="btn btn-primary rounded-pill px-3" type="button" id="clear">ClearAll</button>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" id="mesh" value="mesh"> Visible
          <input type="checkbox" id="Oxy" value="Oxy"> Oxy
        </label>
      </div>
    </div>
    <nav-menu />
  </div>
</template>
<script>
import * as MYCONST from '@/const.js';
import NavMenu from '@/components/NavMenu.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
export default {
  name: 'Draw3DSurfacePage',
  components: {
    NavMenu
  },
  mounted() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(MYCONST.RENDERER_CLEAR_COLOR);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.$el.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    camera.position.set(5, 5, 5);

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
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.translateY(-0.01)
    scene.add(gridHelper)
    const planeGeometry = new THREE.PlaneGeometry(15, 15)
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ color: 0x888888 }))
    plane.rotateX(-Math.PI / 2)
    plane.position.y = -0.05
    plane.receiveShadow = true
    scene.add(plane)

    const elementE = document.getElementById("enter")
    const elementC = document.getElementById("clear")
    const elementCheck = document.getElementById("mesh")
    const checkbox = document.getElementById("mesh");
    elementE?.addEventListener("click", getText)
    elementC?.addEventListener("click", clearAll)
    elementCheck?.addEventListener("click", visibleMesh)

    const checkboxOxy = document.getElementById("Oxy");
    const elementCheckOxy = document.getElementById("Oxy")
    elementCheckOxy?.addEventListener("click", function () {
      if (checkboxOxy.checked) {
        camera.position.set(0, -5, 0)
        plane.visible = false
        gridHelper.translateY(0.02)
        controls.target.set(0, 0, 0)
        controls.update()
        camera.updateProjectionMatrix();
      }
      else {
        controls.reset();
        plane.visible = true
        gridHelper.translateY(-0.02)
        camera.position.set(5, 5, 5);
        controls.target.set(0, 0, 0)
        controls.update()
        camera.updateProjectionMatrix();
      }
    })
    const arraylines = []
    const arrayMeshs = []
    function getText() {
      var points = []

      var colorValue = document.getElementById("color-picker").value;

      var inputValue = document.getElementById("coord").value;
      var lines = inputValue.split(/\n/);
      if (lines.length === 0) {
        points.push(new THREE.Vector3(0, 0, 0))
      }
      else {
        lines.forEach((line) => {
          let re = line.replace(/\s+|{|}|x=|\(|\)/gm, '')
          line = re.replace(/y=|z=/gm, ',')
          var ar = line.split(',')
          if (ar[0] != "") {
            let [x = 0, y = 0, z = 0] = ar.map(Number).concat([0, 0, 0]).slice(0, 3);
            points.push(new THREE.Vector3(y / 1000, z / 1000, x / 1000))
          }
        });
      }
      // To remove duplicate elements
      if (points.length > 1) {
        points = points.filter((point, index) => {
          for (let i = 0; i < index; i++) {
            if (point.distanceTo(points[i]) < MYCONST.TOLERANCE) {
              return false;
            }
          }
          return true;
        });
      }
      var hex = parseInt(colorValue.replace(/^#/, ''), 16);
      if (points.length >= 2) {
        if (points.length > 2) {
          //add first elem
          const [firstPoint] = points;
          points.push(new THREE.Vector3(...firstPoint.toArray()));
        }
        if (points.length > 3) {
          // add mesh
          const geometry1 = new ConvexGeometry(points);
          const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
          const mesh = new THREE.Mesh(geometry1, material1);
          mesh.visible = checkbox.checked;
          scene.add(mesh);
          arrayMeshs.push(mesh)
          mesh.material.color.setHex(hex)
        }
        else {
          alert("No surface created")
        }

        // add line
        let geometry = new THREE.BufferGeometry().setFromPoints(points)
        let line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: 0x88888 })
        )
        line.material.color.setHex(hex)
        arraylines.push(line)
        scene.add(line)

        autoFit();
      }
      else if (points.length == 1) {
        // add Point
        const color = hex;
        const size = 0.01;
        const geometry = new THREE.SphereGeometry(size, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(points[0].x, points[0].y, points[0].z);
        scene.add(sphere);
      }
      else {
        alert("Please check input again!!!")
      }
    }

    function clearAll() {
      arraylines.forEach(line => {
        scene.remove(line)
      });
      arrayMeshs.forEach(mesh => {
        scene.remove(mesh)
      });
      arrayMeshs.length = 0;
      camera.position.set(5, 5, 5)
    }

    function visibleMesh() {
      arrayMeshs.forEach(mesh => {
        mesh.visible = checkbox.checked;
      });
    }

    function autoFit() {
      if (checkboxOxy.checked) return;
      const FIT_OFFSET = 1.25;

      if (arrayMeshs.length < 1) {
        camera.near = 0.1;
        camera.far = 1000;
        camera.position.set(2, 2, 2);
        camera.updateProjectionMatrix();
        controls.maxDistance = Infinity;
        controls.minDistance = 0;
        return;
      }

      const checkLastValueInArray = [arrayMeshs[arrayMeshs.length - 1]];
      let { minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0 } = {};
      let isFirst = true;
      let isExistBox = false;
      for (const localMesh of checkLastValueInArray) {
        if (localMesh instanceof THREE.Mesh) {
          const posAttr = localMesh.geometry.getAttribute("position");
          if (posAttr.count == 0) continue;

          localMesh.geometry.computeBoundingBox()

          if (localMesh.geometry.boundingBox.isBox3) {
            var bBox = new THREE.Box3().copy(localMesh.geometry.boundingBox);
            bBox.applyMatrix4(localMesh.matrixWorld);
            isExistBox = true;

            if (isFirst) {
              minX = bBox.min.x;
              minY = bBox.min.y;
              minZ = bBox.min.z;
              maxX = bBox.max.x;
              maxY = bBox.max.y;
              maxZ = bBox.max.z;
              isFirst = false;
            }
            // compute overall bbox (bbox contains the origin)
            minX = Math.min(minX, bBox.min.x);
            minY = Math.min(minY, bBox.min.y);
            minZ = Math.min(minZ, bBox.min.z);
            maxX = Math.max(maxX, bBox.max.x);
            maxY = Math.max(maxY, bBox.max.y);
            maxZ = Math.max(maxZ, bBox.max.z);
          }
        }
      }

      if (!isExistBox) return;
      const bBox_min = new THREE.Vector3(minX, minY, minZ);
      const bBox_max = new THREE.Vector3(maxX, maxY, maxZ);
      const box = new THREE.Box3(bBox_min, bBox_max);

      const center = box.getCenter(new THREE.Vector3());

      const maxSize = bBox_min.distanceTo(bBox_max);
      const fitHeightDistance =
        maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
      const fitWidthDistance = fitHeightDistance / camera.aspect;
      const distance =
        FIT_OFFSET * Math.max(fitHeightDistance, fitWidthDistance);

      const direction = controls.target
        .clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);

      // Set value max zoom in and zoom out
      controls.maxDistance = distance * 10;
      //controls.minDistance = distance / 10;
      controls.target.copy(center);

      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(controls.target).sub(direction);

      controls.update();
    }


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
