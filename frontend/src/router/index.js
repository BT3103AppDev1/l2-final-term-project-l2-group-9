import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../components/Introduction.vue'

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: Introduction,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});


export default router
