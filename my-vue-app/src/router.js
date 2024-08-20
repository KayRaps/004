import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetails.vue';
import Login from './components/Login.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetail },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;