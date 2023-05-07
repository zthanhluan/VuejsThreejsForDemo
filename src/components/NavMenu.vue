<template>
  <div class="x-color-box"></div>
  <div class="y-color-box"></div>
  <div class="z-color-box"></div>
  <div class="x-axis-label">X Axis</div>
  <div class="y-axis-label">Y Axis</div>
  <div class="z-axis-label">Z Axis</div>
  <div class="nav-buttons">
    <router-link to="/threejsdemo/" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/threejsdemo/' }" @click="navigate()">Home</button>
    </router-link>

    <router-link to="/threejsdemo/multicoloredsphere" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/threejsdemo/multicoloredsphere' }" @click="navigate()">Multicolored Sphere</button>
    </router-link>

    <router-link to="/threejsdemo/secondpage" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/threejsdemo/secondpage' }" @click="navigate()">Second Page</button>
    </router-link>

    <router-link to="/threejsdemo/about" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/threejsdemo/about' }" @click="navigate()">About</button>
    </router-link>

    <router-link to="/threejsdemo/temp" exact exact-active-class="active" active-class="inactive" v-slot="{ navigate }">
      <button class="nav-button" :class="{ active: $route.path === '/threejsdemo/temp' }" @click="navigate()">Temp</button>
    </router-link>
  </div>
</template>
