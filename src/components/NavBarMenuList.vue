<script setup>
import NavBarItem from "@/components/NavBarItem.vue";
import { useAuthStore } from "@/stores/auth.store";

defineProps({
  menu: {
    type: Array,
    default: () => [],
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
</script>

<template>
  <NavBarItem
    v-for="(item, index) in menu"
    :key="index"
    :item="item"
    @menu-click="menuClick"
  />
</template>
