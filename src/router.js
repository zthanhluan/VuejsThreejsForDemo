import { createRouter, createWebHistory } from 'vue-router';
import FollowCamPage from './components/FollowCamPage.vue';
import SelectBoxPage from './components/SelectBoxPage.vue';
import MulticoloredSpherePage from './components/MulticoloredSpherePage.vue';
import ParticlesSystemPage from './components/ParticlesSystemPage.vue';
import TempPage from './components/TempPage.vue';
import CanonJSPage from './components/CanonJSPage.vue';
import ConvexObjectPage from './components/ConvexObjectPage.vue';
import WaterPage from './components/WaterPage.vue';
import EdgeDetectPage from './components/EdgeDetectPage.vue';
import ShadersOceanPage from './components/ShadersOceanPage.vue';
import GamePage from './components/GamePage.vue';
import Draw3DSurfacePage from './components/Draw3DSurfacePage.vue';
import DrawRainBowLightPage from './components/DrawRainBowLightPage.vue';
import DrawDimensionPage from './components/DrawDimensionPage.vue';
import DrawSelectAreaPage from './components/DrawSelectAreaPage.vue';
import EdgeProjectionPage from './components/EdgeProjectionPage.vue';
import CharacterMovementPage from './components/CharacterMovementPage.vue';

const routes = [
  {
    path: '/water',
    name: 'Water',
    component: WaterPage
  },
  {
    path: '/canonjs',
    name: 'Canon JS',
    component: CanonJSPage
  },
  {
    path: '/convexobject',
    name: 'Convex Object',
    component: ConvexObjectPage
  },
  {
    path: '/',
    name: 'Follow Cam',
    component: FollowCamPage
  },
  {
    path: '/temp',
    name: 'Temp Page',
    component: TempPage
  },
  {
    path: '/selectbox',
    name: 'Select Box',
    component: SelectBoxPage
  },
  {
    path: '/multicoloredsphere',
    name: 'Multicolored Sphere',
    component: MulticoloredSpherePage
  },
  {
    path: '/particlessystem',
    name: 'Particles System Page',
    component: ParticlesSystemPage
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
  {
    path: '/draw3dsurface',
    name: 'Draw 3D Surface ',
    component: Draw3DSurfacePage
  },
  {
    path: '/rainbow',
    name: 'Rainbow Light ',
    component: DrawRainBowLightPage
  },
  {
    path: '/drawdimen',
    name: 'Draw Dimension ',
    component: DrawDimensionPage
  },
  {
    path: '/selectarea',
    name: 'Select Area ',
    component: DrawSelectAreaPage
  },
  {
    path: '/edgeprojection',
    name: 'Edge Projection ',
    component: EdgeProjectionPage
  },
  {
    path: '/charactermovement',
    name: 'Character Movement ',
    component: CharacterMovementPage
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
