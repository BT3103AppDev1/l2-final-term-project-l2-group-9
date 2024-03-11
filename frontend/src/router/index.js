import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../components/LandingPage/Introduction.vue'
import LandingJoinUs from '../components/LandingPage/LandingJoinUs.vue';
import LandingFooter from '../components/LandingPage/LandingFooter.vue';
import RegisterationPage from '@/components/Registeration/RegisterationPage.vue';
import LandingPage from '@/components/LandingPage.vue';
const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/',
    name: 'Introduction',
    component: Introduction,
  },
  {
    path: '/',
    name: 'LandingJoinUs',
    component: LandingJoinUs,
  },
  {
    path: '/',
    name: 'LandingFooter',
    component: LandingFooter,
  },
  {
    path: '/register',
    name: 'RegisterationPage',
    component: RegisterationPage,
  },
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
