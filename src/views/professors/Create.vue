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
  prenom: "",
  tel: "",
  cin: "",
  cne: "",
  naissance: "",
  grade: "",
});

const submit = () => {
  const data = {
    id: departement.id,
    nom: departement.name,
    prenom: departement.prenom,
    telephone: departement.tel,
    cin: departement.cin,
    cne: departement.cne,
    dateDeNaissance: departement.naissance,
    grade: departement.grade,
  };
  DepartementDataService.createData("professors", data)
    .then((response) => {
      departement.id = response.data.id;
      departement.prenom = response.data.prenom;
      departement.tel = response.data.telephone;
      departement.cin = response.data.cin;
      departement.cne = response.data.cne;
      departement.naissance = response.data.dateDeNaissance.substring(0, 10);
      departement.grade = response.data.grade;
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
      <!-- <SectionTitleLineWithButton
        :icon="mdiTownHall"
        title="Neauvau professors"
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
                G??n??ral
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Cr??ez un neauvau Professeur.
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
                        >Pr??nom</label
                      >
                      <input
                        type="text"
                        name="phone"
                        placeholder="Entrez Prenom"
                        v-model="departement.prenom"
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

                    <div class="col-span-6 sm:col-span-4">
                      <label
                        for="email-address"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >T??l??phone</label
                      >
                      <input
                        placeholder="Entrez T??l??phone"
                        type="text"
                        name="email-address"
                        v-model="departement.tel"
                        id="email-address"
                        autocomplete="email"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.email"
                        ><small class="text-red-300">{{
                          departement.errors.email
                        }}</small></span
                      > -->
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="country"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >CIN</label
                      >
                      <input
                        id="country"
                        v-model="departement.cin"
                        placeholder="Entrez Pays"
                        name="country"
                        autocomplete="country-name"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />

                      <!-- <span v-if="departement.errors.country"
                        ><small class="text-red-300">{{
                          departement.errors.country
                        }}</small></span
                      > -->
                    </div>

                    <div class="col-span-6">
                      <label
                        for="street-address"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >CNE</label
                      >
                      <input
                        type="text"
                        v-model="departement.cne"
                        placeholder="Entrez Adresse"
                        name="street-address"
                        id="street-address"
                        autocomplete="street-address"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.address"
                        ><small class="text-red-300">{{
                          departement.errors.address
                        }}</small></span
                      > -->
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="city"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Date de naissance</label
                      >
                      <input
                        type="date"
                        v-model="departement.naissance"
                        placeholder="Entrez Ville"
                        name="city"
                        id="city"
                        autocomplete="address-level2"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.city"
                        ><small class="text-red-300">{{
                          departement.errors.city
                        }}</small></span
                      > -->
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="postal-code"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Grade</label
                      >
                      <input
                        type="text"
                        name="postal-code"
                        v-model="departement.grade"
                        placeholder="Entrez Code Postal"
                        id="postal-code"
                        autocomplete="postal-code"
                        class="mt-1 focus:ring-indigo-500 bg-white dark:bg-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <!-- <span v-if="departement.errors.postal"
                        ><small class="text-red-300">{{
                          departement.errors.postal
                        }}</small></span
                      > -->
                    </div>
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
      <!-- <CardBox title="Forms" :icon="mdiBallot" form @submit.prevent="submit">
        <FormField label="please enter professor name">
          <FormControl v-model="departement.name" :icon="mdiAccount" />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
