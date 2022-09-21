<script setup>
import { useLayoutStore } from "@/stores/layout.js";
import AsideMenuLayer from "@/components/AsideMenuLayer.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";

import { useAuthStore } from "@/stores/auth.store";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click"]);

const menuClick = async (event, item) => {
  emit("menu-click", event, item);
  if (item.label == "Se déconnecter") {
    const authStore = useAuthStore();
    await authStore.logout();
  }
};

const layoutStore = useLayoutStore();
</script>

<template>
  <AsideMenuLayer
    :menu="menu"
    :class="[
      layoutStore.isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0',
      { 'lg:hidden xl:flex': !layoutStore.isAsideLgActive },
    ]"
    @menu-click="menuClick"
  />
  <OverlayLayer
    v-show="layoutStore.isAsideLgActive"
    z-index="z-30"
    @overlay-click="layoutStore.isAsideLgActive = false"
  />
</template>
