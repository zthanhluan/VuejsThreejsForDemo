<template>
  <div class="x-color-box"></div>
  <div class="y-color-box"></div>
  <div class="z-color-box"></div>
  <div class="x-axis-label">X Axis</div>
  <div class="y-axis-label">Y Axis</div>
  <div class="z-axis-label">Z Axis</div>
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
</template>

<style>
.nav-button {
  background-color: #ccc;
  border: none;
  color: #333;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 1px 1px;
  cursor: pointer;
}

.active {
  background-color: #f00;
  color: #fff;
}
.x-axis-label {
  position: absolute;
  top: 110px;
  right: 20px;
  color: #ff0000;
  font-size: 16px;
}
.y-axis-label {
  position: absolute;
  top: 130px;
  right: 20px;
  color: #00ff00;
  font-size: 16px;
}
.z-axis-label {
  position: absolute;
  top: 150px;
  right: 20px;
  color: #0000ff;
  font-size: 16px;
}
.x-axis-label, .y-axis-label, .z-axis-label {
  z-index: 1000;
}
.x-color-box {
  top: 112px;
  right: 60px;
  width: 30px;
  height: 12px;
  background-color: red;
  display: inline-block;
  position: absolute;
  margin-right: 10px;
}
.y-color-box {
  top: 132px;
  right: 60px;
  width: 30px;
  height: 12px;
  background-color: green;
  display: inline-block;
  position: absolute;
  margin-right: 10px;
}
.z-color-box {
  top: 152px;
  right: 60px;
  width: 30px;
  height: 12px;
  background-color: blue;
  display: inline-block;
  position: absolute;
  margin-right: 10px;
}
</style>