<script setup>
import { computed } from "vue";
import {
  mdiTownHall,
  mdiAccountSchool,
  mdiReceiptTextCheck,
  mdiHumanMaleBoard,
} from "@mdi/js";
import PillTag from "@/components/PillTag.vue";

const props = defineProps({
  trend: {
    type: String,
    required: true,
  },
  trendType: {
    type: String,
    default: null,
  },
  small: Boolean,
});

const trendStyle = computed(() => {
  if (props.trendType === "dep") {
    return {
      icon: mdiTownHall,
      style: "success",
    };
  }

  if (props.trendType === "stud") {
    return {
      icon: mdiAccountSchool,
      style: "info",
    };
  }

  if (props.trendType === "alert") {
    return {
      icon: mdiReceiptTextCheck,
      style: "warning",
    };
  }

  if (props.trendType === "prof") {
    return {
      icon: mdiHumanMaleBoard,
      style: "danger",
    };
  }

  return {
    style: "info",
  };
});
</script>

<template>
  <PillTag
    :text="trend"
    :type="trendStyle.style"
    :icon="trendStyle.icon"
    :small="small"
  />
</template>
