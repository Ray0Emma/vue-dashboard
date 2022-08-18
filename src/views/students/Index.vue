<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTownHall, mdiPlusCircle } from "@mdi/js";
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
  DepartementDataService.uploadFile("students", formData).then((response) => {
    DepartementDataService.retrieveAllData("students")
      .then((response) => {
        dataTable.value = response.data;
      })
      .catch((e) => {
        alert(e);
      });
    router.push("/students");
  });

  // Use this as an example for handling file uploads
};

DepartementDataService.retrieveAllData("students")
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
      <SectionTitleLineWithButton :icon="mdiTownHall" title="Etudiants" main>
        <BaseButton
          :icon="mdiPlusCircle"
          label="Import Excel"
          color="contrast"
          rounded-full
          small
        >
          <!-- <form @submit="submit"> -->
          <input type="file" ref="input" @input="upload" />
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
        :icon="mdiTownHall"
        title="table Etudiants"
        has-table
        url="/students/add"
      >
        <div v-if="items.length">
          <TableSampleClients
            :dataTable="JSON.parse(JSON.stringify(items))"
            instructor="students"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
