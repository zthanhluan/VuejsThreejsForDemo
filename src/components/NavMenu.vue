<template>
  <div class="x-color-box"></div>
  <div class="y-color-box"></div>
  <div class="z-color-box"></div>
  <div class="x-axis-label">X Axis</div>
  <div class="y-axis-label">Y Axis</div>
  <div class="z-axis-label">Z Axis</div>
  <div class="nav-buttons">

    <router-link to="/" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/' }" @click="navigate()">Follow Cam</button>
    </router-link>

    <router-link to="/water" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/water' }" @click="navigate()">Water Boat</button>
    </router-link>

    <router-link to="/a" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/a' }" @click="navigate()">Canon JS</button>
    </router-link>

    <router-link to="/b" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/b' }" @click="navigate()">Convex Object</button>
    </router-link>

    <router-link to="/multicoloredsphere" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/multicoloredsphere' }"
        @click="navigate()">Multicolored Sphere</button>
    </router-link>

    <router-link to="/secondpage" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/secondpage' }" @click="navigate()">Second
        Page</button>
    </router-link>

    <router-link to="/about" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/about' }" @click="navigate()">Select Box</button>
    </router-link>

    <router-link to="/edgedetect" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/edgedetect' }" @click="navigate()">Edge Detect</button>
    </router-link>

    <router-link to="/shadersocean" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/shadersocean' }" @click="navigate()">Shaders Ocean</button>
    </router-link>

    <router-link to="/game" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/game' }" @click="navigate()">Shoot Game</button>
    </router-link>

    <router-link to="/temp" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/temp' }" @click="navigate()">Temp Page</button>
    </router-link>
  </div>
</template>
