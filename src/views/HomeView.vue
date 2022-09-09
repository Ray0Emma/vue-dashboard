<script setup>
import {
  mdiAccountMultiple,
  mdiAccountSchool,
  mdiChartTimelineVariant,
  mdiHumanMaleBoard,
  mdiReceiptTextCheck,
  mdiTownHall,
  mdiGithub,
  mdiChartPie,
} from "@mdi/js";

import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { ref } from "vue";
import DepartementDataService from "@/services/DepartementDataService";

const depatements = ref(null);
const etudiants = ref(null);
const profs = ref(null);
const pv = ref(null);

DepartementDataService.retrieveAllData("pv/all").then((resp) => {
  pv.value = resp.data.length;
});

DepartementDataService.retrieveAllData("departments").then((resp) => {
  depatements.value = resp.data.length;
});

DepartementDataService.retrieveAllData("students").then((resp) => {
  etudiants.value = resp.data.length;
});
DepartementDataService.retrieveAllData("professors").then((resp) => {
  profs.value = resp.data.length;
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Tableau de bord"
        main
      >
        <BaseButton class="hidden"></BaseButton>
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend=" "
          trend-type="dep"
          linkTo="/departments"
          color="text-emerald-500"
          :icon="mdiTownHall"
          :number="depatements"
          label="Departements"
        />
        <CardBoxWidget
          trend=" "
          trend-type="stud"
          color="text-blue-500"
          linkTo="/students"
          :icon="mdiAccountSchool"
          :number="etudiants"
          label="Etudiants"
        />
        <CardBoxWidget
          trend=" "
          trend-type="prof"
          color="text-red-500"
          linkTo="/professors"
          :icon="mdiHumanMaleBoard"
          :number="profs"
          label="Professeurs"
        />
        <CardBoxWidget
          trend=" "
          trend-type="alert"
          color="text-red-500"
          linkTo="/pv/index"
          :icon="mdiReceiptTextCheck"
          :number="pv"
          label="Les Pv"
        />
      </div>

      <!-- <CardBoxTransaction
        v-for="(transaction, index) in transactionBarItems"
        :key="index"
        :amount="transaction.amount"
        :date="transaction.date"
        :business="transaction.business"
        :type="transaction.type"
        :name="transaction.name"
        :account="transaction.account"
      /> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
