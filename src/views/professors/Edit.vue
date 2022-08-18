<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTownHall, mdiPlusCircle, mdiBallot, mdiAccount } from "@mdi/js";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import DepartementDataService from "@/services/DepartementDataService";
import { computed, onMounted, reactive, ref } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import router from "@/router";
import { useRoute } from "vue-router";

const departement = reactive({
  id: useRoute().params.id,
  name: "",
});
const getData = () => {
  console.log("hi1");
  DepartementDataService.retrieveData("professors", departement.id)
    .then((resp) => {
      console.log("hi2");
      departement.name = resp.data.nom;
    })
    .catch((e) => {
      alert(e);
    });
  console.log("hi3");
};

onMounted(() => {
  getData();
});
// console.log(departement.id);
const submit = () => {
  const data = {
    id: departement.id,
    name: departement.name,
  };
  DepartementDataService.updateData("professors", data.id, data)
    .then(() => {
      router.push("/professors");
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
        title="Neauvau Professeurs"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox title="Forms" :icon="mdiBallot" form @submit.prevent="submit">
        <FormField label="please enter departement name">
          <FormControl v-model="departement.nom" :icon="mdiAccount" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
