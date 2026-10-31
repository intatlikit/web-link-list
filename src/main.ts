import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { initAuth } from './composables/useAuth';
import './assets/main.css';

initAuth();

createApp(App).use(router).mount('#app');
