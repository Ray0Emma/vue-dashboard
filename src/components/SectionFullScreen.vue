<script setup>
import { computed } from "vue";
import { useStyleStore } from "@/stores/style";
import {
  gradientBgPurplePink,
  gradientBgDark,
  gradientBgPinkRed,
} from "@/colors";

const props = defineProps({
  bg: {
    type: String,
    required: true,
    validator: (value) => ["purplePink", "pinkRed"].includes(value),
  },
});

const colorClass = computed(() => {
  if (useStyleStore().darkMode) {
    return gradientBgDark;
  }

  switch (props.bg) {
    case "purplePink":
      return gradientBgPurplePink;
    case "pinkRed":
      return gradientBgPinkRed;
  }

  return "";
});
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center gap-10 lg:pr-5"
    :class="colorClass"
  >
    <div class="hidden lg:block md:w-6/12 flex-col">
      <div class="pl-5">
        <div
          class="flex flex-col items-center justify-center"
          style="width: 512px"
        >
          <div style="width: 350px; height: 350px">
            <img src="public/user-account.png" />
          </div>
          <h1 class="text-2xl text-center text-gray-400 font-bold">
            Faculté Polydisciplinaire - Université Sultan Moulay Slimane
          </h1>
        </div>
      </div>
    </div>
    <slot card-class="sm:w-6/12 lg:w-6/12 shadow-2xl" />
  </div>
</template>
