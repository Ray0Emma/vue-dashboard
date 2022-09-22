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
  DepartementDataService.retrieveData("departments", departement.id)
    .then((resp) => {
      departement.name = resp.data.nom;
    })
    .catch((e) => {
      alert(e);
    });
};

onMounted(() => {
  getData();
});
// console.log(departement.id);
const submit = () => {
  const data = {
    id: departement.id,
    nom: departement.name,
  };
  DepartementDataService.updateData("departments", data.id, data)
    .then(() => {
      router.push("/departments");
    })
    .catch((e) => {
      alert(e);
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- <SectionTitleLineWithButton
        :icon="mdiTownHall"
        title="Neauvau Departement"
        main
      >
      </SectionTitleLineWithButton> -->
      <CardBox
        title="Formulaire"
        :icon="mdiBallot"
        form
        @submit.prevent="submit"
      >
        <FormField label="veuillez entrer le nom du département">
          <FormControl v-model="departement.name" :icon="mdiAccount" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Modifier" />
            <BaseButton
              type="reset"
              color="info"
              outline
              label="Réinitialiser"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
