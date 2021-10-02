import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import NotFound from '../views/NotFound.vue';
import MyOrders from '../views/MyOrders.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog,
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyOrders,
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/not-found',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
