<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiHumanMaleBoard, mdiPlusCircle } from "@mdi/js";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import DepartementDataService from "@/services/DepartementDataService";
import { computed, ref } from "vue";
import router from "@/router";

const dataTable = ref([]);
const file = ref(null);
const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files;

  file.value = value[0];
  // this.$emit("update:modelValue", file.value);
  let formData = new FormData();
  formData.append("file", file.value);
  DepartementDataService.uploadFile("professors", formData).then((response) => {
    DepartementDataService.retrieveAllData("professors")
      .then((response) => {
        dataTable.value = response.data;
      })
      .catch((e) => {
        alert(e);
      });
    router.push("/professors");
  });

  // Use this as an example for handling file uploads
};

DepartementDataService.retrieveAllData("professors")
  .then((response) => {
    dataTable.value = response.data;
  })
  .catch((e) => {
    alert(e);
  });

const items = computed(() => dataTable.value);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHumanMaleBoard"
        title="Professeurs"
        main
      >
        <BaseButton
          :icon="mdiPlusCircle"
          label="Importer Excel"
          color="contrast"
          rounded-full
          small
          class="relative"
        >
          <!-- <form @submit="submit"> -->
          <input
            type="file"
            ref="input"
            @input="upload"
            class="absolute opacity-0"
          />
          <!-- </form> -->
        </BaseButton>
        <!-- <BaseButton
          :icon="mdiPlusCircle"
          label="Import departement"
          color="contrast"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>
      <CardBox
        :icon="mdiHumanMaleBoard"
        title="tableau des professeurs"
        has-table
        url="/professors/add"
      >
        <div v-if="items.length">
          <TableSampleClients
            :dataTable="JSON.parse(JSON.stringify(items))"
            instructor="professors"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
