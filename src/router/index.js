import { createRouter, createWebHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Departements",
    },
    path: "/departments",
    name: "departments",
    component: () => import("@/views/departements/Index.vue"),
  },
  {
    path: "/departments/:id",
    name: "edit-departments",
    component: () => import("@/views/departements/Edit.vue"),
  },
  {
    path: "/departments/add",
    name: "add-departments",
    component: () => import("@/views/departements/Create.vue"),
  },
  {
    meta: {
      title: "Etudiants",
    },
    path: "/students",
    name: "students",
    component: () => import("@/views/Students/Index.vue"),
  },
  {
    path: "/students/:id",
    name: "edit-students",
    component: () => import("@/views/Students/Edit.vue"),
  },
  {
    path: "/students/add",
    name: "add-students",
    component: () => import("@/views/Students/Create.vue"),
  },
  {
    meta: {
      title: "Professors",
    },
    path: "/professors",
    name: "professors",
    component: () => import("@/views/Professors/Index.vue"),
  },
  {
    path: "/professors/:id",
    name: "edit-professors",
    component: () => import("@/views/Professors/Edit.vue"),
  },
  {
    path: "/professors/add",
    name: "add-professors",
    component: () => import("@/views/Professors/Create.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  // {
  //   meta: {
  //     title: 'Ui'
  //   },
  //   path: '/ui',
  //   name: 'ui',
  //   component: () => import('@/views/UiView.vue')
  // },
  // {
  //   meta: {
  //     title: 'Responsive layout'
  //   },
  //   path: '/responsive',
  //   name: 'responsive',
  //   component: () => import('@/views/ResponsiveView.vue')
  // },
  // {
  //   meta: {
  //     title: 'Login'
  //   },
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/LoginView.vue')
  // },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
