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
  filiere: "",
});
const submit = () => {
  const data = {
    id: departement.id,
    nom: departement.name,
    filiere: departement.filiere,
  };
    DepartementDataService.createData("semesters", data)
    .then((response) => {
      departement.id = response.data.id;
      departement.name = response.data.name;
      departement.filiere = response.data.filiere;
      router.push("/semesters");
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
        title="Neauvau student"
        main
      >
      </SectionTitleLineWithButton> -->
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3
                class="text-lg font-normal leading-6 text-black dark:text-gray-300"
              >
                Général
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Créez un nouveau Semester.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form @submit.prevent="submit">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6 dark:bg-gray-900">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Nom
                        <span class="text-red-300 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        placeholder="Entrez Nom"
                        v-model="departement.name"
                        id="first-name"
                        autocomplete="given-name"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.name"
                        ><small class="text-red-300">{{
                          departement.errors.name
                        }}</small></span
                      > -->
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Filière</label
                      >
                      <input
                        type="text"
                        name="phone"
                        placeholder="Entrez Filiere"
                        v-model="departement.filiere"
                        id="phone"
                        autocomplete="phone"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.phone"
                        ><small class="text-red-300">{{
                          departement.errors.phone
                        }}</small></span
                      > -->
                    </div>

                      <!-- <span v-if="departement.errors.country"
                        ><small class="text-red-300">{{
                          departement.errors.country
                        }}</small></span
                      > -->
                      <!-- <span v-if="departement.errors.postal"
                        ><small class="text-red-300">{{
                          departement.errors.postal
                        }}</small></span
                      > -->
                  </div>
                </div>
                <div
                  class="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6"
                >
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Engeristrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
