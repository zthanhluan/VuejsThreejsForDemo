import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import FirstPage from './components/FirstPage.vue';
import SecondPage from './components/SecondPage.vue';
import TempPage from './components/TempPage.vue';
import APage from './components/APage.vue';
import BPage from './components/BPage.vue';
import WaterPage from './components/WaterPage.vue';
import EdgeDetectPage from './components/EdgeDetectPage.vue';
import ShadersOceanPage from './components/ShadersOceanPage.vue';
import GamePage from './components/GamePage.vue';

const routes = [
  {
    path: '/water',
    name: 'Water',
    component: WaterPage
  },
  {
    path: '/a',
    name: 'A',
    component: APage
  },
  {
    path: '/b',
    name: 'B',
    component: BPage
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/temp',
    name: 'Temp Page',
    component: TempPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/multicoloredsphere',
    name: 'Multicolored Sphere',
    component: FirstPage
  },
  {
    path: '/secondpage',
    name: 'Second Page',
    component: SecondPage
  },
  {
    path: '/edgedetect',
    name: 'Edge Detect ',
    component: EdgeDetectPage
  },
  {
    path: '/shadersocean',
    name: 'Shaders Ocean ',
    component: ShadersOceanPage
  },
  {
    path: '/game',
    name: 'Shoot Game ',
    component: GamePage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
