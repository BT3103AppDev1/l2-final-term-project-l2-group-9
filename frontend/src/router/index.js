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

// Add global navigation guard to handle redirection
router.beforeEach((to, from, next) => {
  // Check if the current URL contains a fragment identifier
  if (window.location.hash) {
    // Redirect to the base URL
    window.location.href = window.location.origin;
  } else {
    next();
  }
});


export default router
