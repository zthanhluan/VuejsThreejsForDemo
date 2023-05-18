<template>
  <div class="x-color-box"></div>
  <div class="y-color-box"></div>
  <div class="z-color-box"></div>
  <div class="x-axis-label">X Axis</div>
  <div class="y-axis-label">Y Axis</div>
  <div class="z-axis-label">Z Axis</div>
  <div id="nav">
    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Eleventh navbar example">
      <div class="container-fluid">
        <a class="navbar-brand col-lg-1 me-0" href="#">
          <img src="img/favicon-32x32.png" width="40" height="40" alt="">
           World
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav me-auto mb-0 mb-lg-0">
            <router-link class="nav-item active nav-link" to="/">Follow Cam</router-link>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul class="dropdown-menu">
                <router-link class="dropdown-item nav-item nav-link" to="/draw3dsurface">Draw3D Surface</router-link>
                <router-link class="dropdown-item nav-item nav-link" to="/rainbow">Rainbow Light</router-link>
                <router-link class="dropdown-item nav-item nav-link" to="/drawdimen">Draw Dimension</router-link>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">MeshBVH</a>
              <ul class="dropdown-menu">
                <router-link class="dropdown-item nav-item nav-link" to="/edgeprojection">Edge Projection</router-link>
                <router-link class="dropdown-item nav-item nav-link" to="/selectarea">Select Area</router-link>
                <router-link class="dropdown-item nav-item nav-link" to="/charactermovement">Character Movement</router-link>
              </ul>
            </li>
            <router-link class="nav-item nav-link" to="/water">Water Boat</router-link>
            <router-link class="nav-item nav-link" to="/canonjs">Cannon JS</router-link>
            <router-link class="nav-item nav-link" to="/convexobject">Convex Object</router-link>
            <router-link class="nav-item nav-link" to="/multicoloredsphere">Multicolored Sphere</router-link>
            <router-link class="nav-item nav-link" to="/particlessystem">Particles system</router-link>
            <router-link class="nav-item nav-link" to="/selectbox">Select Box</router-link>
            <router-link class="nav-item nav-link" to="/edgedetect">Edge Detect</router-link>
            <router-link class="nav-item nav-link" to="/shadersocean">Shaders Ocean</router-link>
            <router-link class="nav-item nav-link" to="/game">Shoot Game</router-link>
            <router-link class="nav-item nav-link" to="/temp">Temp Page</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
