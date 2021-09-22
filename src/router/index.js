import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
