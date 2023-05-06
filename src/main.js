import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import CSS
//import './assets/css/style.css';

// Create Vue app instance
const app = createApp(App);

// Register Vue router instance
app.use(router);

// Mount Vue app instance to the DOM
app.mount('#app');