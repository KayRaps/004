import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Example component

const routes = [
  { path: '/', component: Home }, // Define your routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
