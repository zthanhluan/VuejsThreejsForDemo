<template>
  <div class="x-color-box"></div>
  <div class="y-color-box"></div>
  <div class="z-color-box"></div>
  <div class="x-axis-label">X Axis</div>
  <div class="y-axis-label">Y Axis</div>
  <div class="z-axis-label">Z Axis</div>
  <div class="nav-buttons">
    <router-link to="/a" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/a' }" @click="navigate()">A</button>
    </router-link>

    <router-link to="/b" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/b' }" @click="navigate()">B</button>
    </router-link>

    <router-link to="/" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/' }" @click="navigate()">Home</button>
    </router-link>

    <router-link to="/multicoloredsphere" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/multicoloredsphere' }" @click="navigate()">Multicolored Sphere</button>
    </router-link>

    <router-link to="/secondpage" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/secondpage' }" @click="navigate()">Second Page</button>
    </router-link>

    <router-link to="/about" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/about' }" @click="navigate()">About</button>
    </router-link>

    <router-link to="/temp" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/temp' }" @click="navigate()">Temp</button>
    </router-link>
  </div>
</template>
