import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import FirstPage from './components/FirstPage.vue';
import SecondPage from './components/SecondPage.vue';
import TempPage from './components/TempPage.vue';
import APage from './components/APage.vue';

const routes = [
  {
    path: '/a',
    name: 'A',
    component: APage
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
