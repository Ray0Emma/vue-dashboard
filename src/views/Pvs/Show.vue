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
import SelectInput from "@/components/SelectInput.vue";
import router from "@/router";
import { useRoute } from "vue-router";

// const props = defineProps({
//   itemsPaginated:Array
// })
const route = useRoute();
const form = reactive({
  itemsPaginated: [],
  filiere: "",
  filiere_id: "",
  semester: "",
  semester_id: "",
  time: "",
  module: "",
  module_id: "",
});

DepartementDataService.createPv(
  "pv",
  route.params.filiere,
  route.params.semester,
  route.params.module,
  route.params.time
)
  .then((response) => {
    console.log(response.data.length);
    form.itemsPaginated = response.data;
  })
  .catch((e) => {
    alert(e);
  });

const printDiv = (elemId) => {
  let contents = document.getElementById(elemId).innerHTML;
  let frame1 = document.createElement("iframe");
  frame1.name = "frame1";
  frame1.style.position = "absolute";
  frame1.style.top = "-1000000px";
  document.body.appendChild(frame1);
  let frameDoc = frame1.contentWindow
    ? frame1.contentWindow
    : frame1.contentDocument.document
    ? frame1.contentDocument.document
    : frame1.contentDocument;
  frameDoc.document.open();
  frameDoc.document.write(
    '<!DOCTYPE html><html lang="fr"><head><title></title>'
  );
  frameDoc.document.write('<link rel="stylesheet" href="/src/css/main.css">');
  frameDoc.document.write("</head><body>");
  frameDoc.document.write(contents);
  frameDoc.document.write("</body></html>");
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    document.body.removeChild(frame1);
  }, 500);
  return false;
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="justify-between items-center block md:flex">
        <div
          class="items-center sm:mb-0 flex shrink-0 grow-0 justify-center mb-6 md:mb-0"
        >
          <h1
            class="text-2xl xl:text-5xl text-black dark:text-gray-300 font-light -ml-0.5"
          >
            Tableau Pv
          </h1>
        </div>

        <!-- <div class="flex shrink-0 grow-0 items-center justify-center">
          <a href="item/create"
            class="px-3 py-1.5 mb-3 sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-violet-500 hover:bg-violet-700 text-white disabled:bg-green-100">
            Nouveau Facture</a>
        </div> -->
      </div>
      <div class="flex flex-col lg:flex-row mt-14 w-full">
        <div class="relative lg:w-full">
          <div class="overflow-x-visible">
            <div class="py-2 align-middle">
              <table class="flex flex-col divide-y divide-gray-200">
                <thead style="display: table-column-group">
                  <tr
                    class="flex items-center px-2 bg-violet-100 dark:bg-transparent"
                  >
                    <th
                      scope="col"
                      class="w-4/12 table-title sm:table-cell hidden pr-6 text-left py-3 text-xs font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <div class="font-medium truncate">Filiere</div>
                      <div class="font-normal truncate">Module</div>
                    </th>
                    <th
                      scope="col"
                      class="w-3/12 table-title hidden sm:table-cell pr-6 text-left py-3 text-xs font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <div class="font-medium truncate">Heure</div>
                    </th>
                    <th
                      scope="col"
                      class="w-6/12 sm:w-3/12 table-title pr-6 text-left py-3 text-xs font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <div class="font-medium truncate">La Salle</div>
                      <div class="font-normal truncate">Semester</div>
                    </th>
                    <th
                      scope="col"
                      class="w-6/12 sm:w-2/12 pl-6 py-3 text-right text-sm font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <div class="font-medium truncate">Imprimer Pv</div>
                    </th>
                    <th v-if="0"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in form.itemsPaginated"
                    class="relative flex items-center px-2 group border-b"
                  >
                    <td
                      class="w-4/12 table-title hidden sm:table-cell pr-6 text-left cursor-pointer py-4 whitespace-nowrap text-sm font-normal text-black dark:text-gray-300 truncate"
                    >
                      <div class="font-bold truncate">
                        {{ item.filier }}
                      </div>
                      <div class="font-normal truncate">
                        {{ item.module }}
                      </div>
                    </td>
                    <td
                      class="w-3/12 table-title hidden sm:table-cell pr-6 text-left cursor-pointer py-4 whitespace-nowrap text-sm font-normal text-black dark:text-gray-300 truncate"
                    >
                      <span
                        class="px-2.5 py-1 ml-2 text-xs font-medium rounded-xl bg-violet-300 dark:bg-violet-500"
                      >
                        {{ item.localDateTime }}
                      </span>
                    </td>
                    <td
                      class="mytd w-6/12 sm:w-3/12 table-title pr-6 text-left cursor-pointer py-4 whitespace-nowrap text-sm font-normal text-black dark:text-gray-300 truncate"
                    >
                      <div class="font-medium truncate">
                        {{ item.local }}
                      </div>
                      <div class="w-20 group font-normal truncate">
                        <span class="border-black border-b border-dashed">
                          {{ item.semester }}
                        </span>
                      </div>
                    </td>
                    <td
                      class="mytd w-6/12 sm:w-2/12 pl-6 py-3 text-right text-sm font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <button
                        @click="printDiv(item.filier + item.localDateTime)"
                        class="px-3 py-1.5 mb-3 sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-violet-500 hover:bg-violet-700 text-white disabled:bg-green-100"
                      >
                        Imprimer Pv
                      </button>
                    </td>
                    <td v-show="0">
                      <div :id="item.filier + item.localDateTime">
                        <div
                          class="row grid grid-rows-2 grid-flow-col gap-1 pb-5 mb-5"
                        >
                          <div class="col-58 row-span-2">
                            <div class="text">
                              <img
                                src="http://www.fpbm.ma/new/img/fplogo_145x154.png"
                                alt="fpbm logo"
                                class="relative object-contain max-h-32"
                              />
                            </div>
                          </div>
                          <div class="col-42 row-span-2 text-right mt-1">
                            <div class="text-dark">
                              <h3>Fiche D'absense</h3>
                              <span class="text-sm"
                                >A.U : {{ new Date().getFullYear() }}-{{
                                  new Date().getFullYear() + 1
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="row grid grid-rows-2 grid-flow-col gap-1 pb-5 mb-5"
                        >
                          <div class="col-42 row-span-2">
                            <div class="text-center">
                              <p class="text-normal font-semibold">
                                Filiere : {{ item.filier }}
                              </p>
                              <p>Semester : {{ item.semester }}</p>
                              <p>Heure : {{ item.localDateTime }}</p>
                              <p>Salle : {{ item.local }}</p>

                              <p class="text-sm">Module : {{ item.module }}</p>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row grid grid-cols-2 grid-flow-col"> -->
                        <!-- <div class="col-60 col-span-2 w-50">
                      <div class="text p-index-left">
                        <p class="font-semibold mb-0">Facture de</p>
                        <p>{{ props.invoice.client.name }}</p>
                        <p>{{ props.invoice.client.email }}</p>
                        <p>
                          <br />
                          {{ props.invoice.client.city }},{{
                            props.invoice.client.country
                          }}
                        </p>
                        <p class="text-sm">
                          <br />
                          {{ props.invoice.client.phone }}
                        </p>
                      </div>
                    </div> -->
                        <!-- <div class="col-40 col-span-1 w-60 pb-4">
                      <div class="text p-index-right">
                        <p class="mb-3">
                          <span class="font-semibold inline-block w-20">
                            Numéro de facture:
                          </span>
                          <span class="float-right inline-block">
                            {{ props.invoice.invoice_number }}
                          </span>
                        </p>
                        <p class="mb-3">
                          <span class="font-semibold inline-block w-20">
                            Date de facturation:
                          </span>
                          <span class="float-right">
                            {{ props.invoice.invoice_Date }}
                          </span>
                        </p>
                        <p class="mb-0">
                          <span class="font-semibold inline-block w-20">
                            Date d'échéance:
                          </span>
                          <span class="float-right">
                            {{ props.invoice.due_date }}
                          </span>
                        </p>
                      </div>
                    </div> -->
                        <!-- </div> -->
                        <div class="mt-4">
                          <div class="col-100">
                            Les surveillants :
                            <div
                              class="overflow-x-auto relative rounded-lg mt-7"
                            >
                              <table class="lines border">
                                <thead
                                  class="table-header-group bg-sky-500"
                                  style="
                                    background-color: rgb(
                                      85,
                                      88,
                                      139
                                    ) !important;
                                    -webkit-print-color-adjust: exact;
                                  "
                                >
                                  <tr
                                    class="border-b-0"
                                    style="display: revert"
                                  >
                                    <th
                                      class="py-2 md:py-1 pl-5 item text font-semibold text-alignment-left text-left text-white border-radius-first"
                                    >
                                      Nom
                                    </th>
                                    <th
                                      class="quantity text font-semibold text-alignment-right text-right text-white"
                                    >
                                      Prenom
                                    </th>
                                    <!-- <th
                                class="price text font-semibold text-alignment-right text-right text-white"
                              >
                                Telephone
                              </th> -->
                                    <th
                                      class="pr-5 total text font-semibold text-white text-alignment-right text-right border-radius-last"
                                    >
                                      Signateur
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="surveillant in item.surveillants"
                                    class="border-b"
                                    style="display: revert"
                                  >
                                    <td
                                      style="display: revert"
                                      class="item text text-alignment-left text-left border-b-0"
                                    >
                                      {{ surveillant.name }}
                                      <!-- <br />
                                <span class="text-xs">
                                  {{ surveillant.description }}
                                </span> -->
                                    </td>
                                    <td
                                      style="display: revert"
                                      class="quantity text text-alignment-right text-right border-b-0"
                                    >
                                      {{ surveillant.lastname }}
                                    </td>
                                    <!-- <td
                                style="display: revert"
                                class="price text text-alignment-right text-right border-b-0"
                              >
                                {{ surveillant.telephone }}
                              </td> -->
                                    <td
                                      style="display: revert"
                                      class="total text text-alignment-right text-right border-b-0"
                                    >
                                      ......................................
                                    </td>
                                  </tr>
                                  <tr v-if="item.surveillants.length == ''">
                                    Pas encore de surveillants...
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div class="mt-4">
                          <div class="col-100">
                            Les etudiants :
                            <div
                              class="overflow-x-auto relative rounded-lg mt-7"
                            >
                              <table class="lines border">
                                <thead
                                  class="table-header-group bg-sky-500"
                                  style="
                                    background-color: rgb(
                                      85,
                                      88,
                                      139
                                    ) !important;
                                    -webkit-print-color-adjust: exact;
                                  "
                                >
                                  <tr
                                    class="border-b-0"
                                    style="display: revert"
                                  >
                                    <th
                                      class="py-2 md:py-1 pl-5 item text font-semibold text-alignment-left text-left text-white border-radius-first"
                                    >
                                      Nom et Prenom
                                    </th>
                                    <th
                                      class="quantity text font-semibold text-alignment-left text-left text-white"
                                    >
                                      Apogee
                                    </th>
                                    <th
                                      class="price text font-semibold text-alignment-right text-right text-white"
                                    >
                                      CNI
                                    </th>
                                    <th
                                      class="pr-5 total text font-semibold text-white text-alignment-right text-right border-radius-last"
                                    >
                                      CNE
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="surveillant in item.etudiants"
                                    class="border-b"
                                    style="display: revert"
                                  >
                                    <td
                                      style="display: revert"
                                      class="item text text-alignment-left text-left border-b-0"
                                    >
                                      {{ surveillant.nom }}
                                      {{ surveillant.prenom }}
                                    </td>
                                    <td
                                      style="display: revert"
                                      class="quantity text text-alignment-left text-left border-b-0"
                                    >
                                      {{ surveillant.nbApogee }}
                                    </td>
                                    <td
                                      style="display: revert"
                                      class="price text text-alignment-right text-right border-b-0"
                                    >
                                      {{ surveillant.cin }}
                                    </td>
                                    <td
                                      style="display: revert"
                                      class="total text text-alignment-right text-right border-b-0"
                                    >
                                      {{ surveillant.cne }}
                                    </td>
                                  </tr>
                                  <tr v-if="item.etudiants.length == ''">
                                    Pas encore de etudiants...
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span
                v-show="form.itemsPaginated.length == 0"
                class="grid place-items-center text-gray-300 p-8"
              >
                Pas encore de pv...
              </span>
              <!-- <div class="p-3 lg:px-6 border-t dark:border-gray-800"> -->
              <!-- <level>
                  <jb-buttons>
                    <jb-button
                      v-for="page in pagesList"
                      :key="page"
                      :active="page === currentPage"
                      :label="page + 1"
                      :outline="darkMode"
                      small
                      @click="currentPage = page"
                    />
                  </jb-buttons>
                  <small
                    >Page {{ currentPageHuman }} sur
                    {{ numPages }} enregistrements.</small
                  >
                </level> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
