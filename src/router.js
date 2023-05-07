import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import FirstPage from './components/FirstPage.vue';
import SecondPage from './components/SecondPage.vue';
import TempPage from './components/TempPage.vue';

const routes = [
  {
    path: '/threejsdemo/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/threejsdemo/temp',
    name: 'Temp Page',
    component: TempPage
  },
  {
    path: '/threejsdemo/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/threejsdemo/multicoloredsphere',
    name: 'Multicolored Sphere',
    component: FirstPage
  },
  {
    path: '/threejsdemo/secondpage',
    name: 'Second Page',
    component: SecondPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
