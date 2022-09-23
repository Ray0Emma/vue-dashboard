<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import router from "@/router";

const props = defineProps({
  //   title: {
  //     type: String,
  //     default: null
  //   },
  //   largeTitle: {
  //     type: String,
  //     default: null
  //   },
  //   button: {
  //     type: String,
  //     default: 'info'
  //   },
  //   buttonLabel: {
  //     type: String,
  //     default: 'Done'
  //   },
  //   hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
  router.push("/dashboard");
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <OverlayLayer v-show="value" @overlay-click="cancel">
        <CardBox
          v-show="value"
          class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50"
          :header-icon="mdiClose"
          modal
          @header-icon-click="cancel"
        >
          <div class="space-y-3">
            <h1 class="text-2xl">FPBM</h1>
            <p>
              Vous n'avez plus besoin de gérer vos données sur des fichiers
              Excel sans fin.
            </p>
            <p>
              Gérez vos données et générez votre pv à partir d'une seule
              plateforme.
            </p>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton label="Ok" @click="confirm" color="info" />
              <BaseButton label="Cancel" color="info" outline @click="cancel" />
            </BaseButtons>
          </template>
        </CardBox>
      </OverlayLayer>
    </SectionMain>
  </LayoutAuthenticated>
</template>
