import { createRouter, createWebHistory } from "vue-router";
import RegisterationPage from "../views/RegisterationPage.vue";
import LandingPage from "../views/LandingPage.vue";
import PostingPage from "../views/PostingPage.vue";
import LoginPage from "../views/LoginPage.vue";
import TestingPage from "@/TestingPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import ForumPage from "../views/ForumPage.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/register",
    name: "RegisterationPage",
    component: RegisterationPage,
  },
  {
    path: "/postings",
    name: "PostingPage",
    component: PostingPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/test",
    name: "TestingPage",
    component: TestingPage,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/forum",
    name: "ForumPage",
    component: ForumPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// // Add global navigation guard to handle redirection
// router.beforeEach((to, from, next) => {
//   // Check if the current URL contains a fragment identifier
//   if (window.location.hash) {
//     // Redirect to the base URL
//     window.location.href = window.location.origin;
//   } else {
//     next();
//   }
// });

export default router;
