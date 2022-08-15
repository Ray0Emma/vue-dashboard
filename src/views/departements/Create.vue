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

const departement = ref({
  id: null,
  name: "",
});

const saveCustomer = () => {
  const data = {
    id: departement.value.id,
    name: departement.value.name,
  };
  DepartementDataService.createData("departement", data)
    .then((response) => {
      departement.value.id = response.data.id;
    })
    .catch((e) => {
      alert(e);
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTownHall"
        title="Neauvau Departement"
        main
      >
      </SectionTitleLineWithButton>
    </SectionMain>
  </LayoutAuthenticated>
</template>
