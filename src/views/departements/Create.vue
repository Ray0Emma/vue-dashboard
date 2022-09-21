<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTownHall, mdiPlusCircle, mdiBallot, mdiAccount } from "@mdi/js";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import DepartementDataService from "@/services/DepartementDataService";
import { computed, reactive, ref } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import router from "@/router";

const departement = reactive({
  id: null,
  name: "",
});

const submit = () => {
  const data = {
    id: departement.id,
    nom: departement.name,
  };
  DepartementDataService.createData("departments", data)
    .then((response) => {
      departement.id = response.data.id;
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
      <CardBox title="Forms" :icon="mdiBallot" form @submit.prevent="submit">
        <FormField label="please enter departement name">
          <FormControl v-model="departement.name" :icon="mdiAccount" />
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
