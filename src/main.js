import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { useLayoutStore } from "@/stores/layout.js";

import { useAuthStore } from "@/stores/auth.store";
import { darkModeKey, styleKey } from "@/config.js";

import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App).use(router).use(pinia).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);
const layoutStore = useLayoutStore(pinia);
const AuthStore = useAuthStore(pinia);

/* Fetch sample data */
// mainStore.fetch("clients");
// mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "FPBM";

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.isAsideMobileExpanded = false;
  layoutStore.isAsideLgActive = false;
});

router.afterEach((to) => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

let isAuthenticated = localStorage.getItem('user');
router.beforeEach((to, from, next) => {
  // if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  isAuthenticated = localStorage.getItem('user');
  if (from.name !== "Login" && to.name !== "Login" && !isAuthenticated) 
  // {
    // Not logged in? You get booted to /login
    setTimeout(()=>next({ name: "Login" }),3000);
  
  
  else 
    next()
  
});

router.beforeEach((to, from, next) => {
  isAuthenticated = localStorage.getItem('user');
  if (to.name === "Login" && isAuthenticated)
  // setTimeout(()=>
  next({ name: "dashboard" })
  // ,3000);
  else next()

});

