import { createRouter, createWebHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Login from "@/views/LoginView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Connexion",
    },
    path: "/",
    name: "Login",
    component: Login,
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
    component: () => import("@/views/students/Index.vue"),
  },
  {
    path: "/students/:id",
    name: "edit-students",
    component: () => import("@/views/students/Edit.vue"),
  },
  {
    path: "/students/add",
    name: "add-students",
    component: () => import("@/views/students/Create.vue"),
  },
  {
    meta: {
      title: "Professors",
    },
    path: "/professors",
    name: "professors",
    component: () => import("@/views/professors/Index.vue"),
  },
  {
    meta: {
      title: "Professors",
    },
    path: "/professors/:id",
    name: "edit-professors",
    component: () => import("@/views/professors/Edit.vue"),
  },
  {
    meta: {
      title: "Ajouter Professeur",
    },
    path: "/professors/add",
    name: "add-professors",
    component: () => import("@/views/professors/Create.vue"),
  },
  {
    meta: {
      title: "Ajouter Pv",
    },
    path: "/pv/add",
    name: "add-pv",
    component: () => import("@/views/Pvs/Create.vue"),
  },
  {
    meta: {
      title: "Pv",
    },
    path: "/pv/show/:filiere/:semester/:module/:time/:date",
    name: "show-pv",
    component: () => import("@/views/Pvs/Show.vue"),
  },
  {
    meta: {
      title: "Pv",
    },
    path: "/pv/index",
    name: "index-pv",
    component: () => import("@/views/Pvs/Index.vue"),
  },
  {
    meta: {
      title: "Profil",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Aide",
    },
    path: "/help",
    name: "help",
    component: () => import("@/views/Help.vue"),
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
