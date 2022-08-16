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

const dataTable = ref([]);

DepartementDataService.retrieveAllData("departement")
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
      <SectionTitleLineWithButton :icon="mdiTownHall" title="Departements" main>
        <BaseButton
          :icon="mdiPlusCircle"
          label="Nouveau departement"
          color="contrast"
          rounded-full
          small
        />
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
        title="table departements"
        has-table
        url="/departements/add"
      >
        <div v-if="items.length">
          <TableSampleClients
            :dataTable="JSON.parse(JSON.stringify(items))"
            instructor="departement"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
