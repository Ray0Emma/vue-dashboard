<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { mdiTownHall, mdiPlusCircle, mdiBallot, mdiAccount } from "@mdi/js";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import DepartementDataService from "@/services/DepartementDataService";
import { computed, isProxy, onMounted, reactive, ref, toRaw } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SelectInput from "@/components/SelectInput.vue";

const test = reactive({});
const form = reactive({
  itemsPaginated: {},
  pv_id: "",
  etud_id: "",
});

DepartementDataService.retrieveAllData("pv/all")
  .then(async (resp) => {
    await resp.data.map((element) => {
      form.pv_id = element.id;
      // console.log(form.pv_id);

      element.etudiants.map((element) => {
        DepartementDataService.orderPv("orderPv", element.id, form.pv_id).then(
          (response) => {
            // console.log("etud " + element.id);
            // console.log("ord " + response.data.etudientOrder);

            test[element.id] = response.data.etudientOrder;
          }
        );
      });
    });
    // console.log(test);
    form.itemsPaginated = resp.data;

    form.itemsPaginated[form.itemsPaginated.length] = test;
    // console.log(form.itemsPaginated[form.itemsPaginated.length - 1]);
    // console.log(toRaw(form.itemsPaginated));
  })
  .catch((e) => {
    alert(e);
  });

const printDiv = (elemId) => {
  let qrInput = document.getElementById("input_" + elemId).innerHTML;

  let qrImg = document.getElementById("img_" + elemId);
  console.log(qrImg.src);
  let preValue;
  let qrValue = qrInput;

  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  console.log(qrImg.src);
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
  }, 900);
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

        <div class="flex shrink-0 grow-0 items-center justify-center">
          <router-link
            to="/pv/add"
            class="px-3 py-1.5 mb-3 sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-gray-300 hover:bg-gray-400 text-white disabled:bg-green-100"
          >
            Nouveau pv</router-link
          >
          <!-- <a
            @click=""
            class="ml-7 px-3 py-1.5 mb-3 cursor-pointer sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-green-100"
          >
            Imprimer tout</a
          > -->
        </div>
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
                      <div class="font-medium truncate">Filière</div>
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
                      v-if="
                        item !=
                        form.itemsPaginated[form.itemsPaginated.length - 1]
                      "
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
                      v-if="
                        item !=
                        form.itemsPaginated[form.itemsPaginated.length - 1]
                      "
                      class="w-3/12 table-title hidden sm:table-cell pr-6 text-left cursor-pointer py-4 whitespace-nowrap text-sm font-normal text-black dark:text-gray-300 truncate"
                    >
                      <span
                        class="px-2.5 py-1 ml-2 text-xs font-medium rounded-xl bg-violet-300 dark:bg-violet-500"
                      >
                        {{ item.localDateTime }}
                      </span>
                    </td>
                    <td
                      v-if="
                        item !=
                        form.itemsPaginated[form.itemsPaginated.length - 1]
                      "
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
                      v-if="
                        item !=
                        form.itemsPaginated[form.itemsPaginated.length - 1]
                      "
                      class="mytd w-6/12 sm:w-2/12 pl-6 py-3 text-right text-sm font-medium text-black dark:text-gray-300 tracking-wider"
                    >
                      <button
                        @click="
                          printDiv(
                            item.filier +
                              item.localDateTime +
                              item.local +
                              item.localDate
                          )
                        "
                        class="px-3 py-1.5 mb-3 sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-violet-500 hover:bg-violet-700 text-white disabled:bg-green-100"
                      >
                        Imprimer Pv
                      </button>
                    </td>
                    <td
                      v-show="0"
                      v-if="
                        item !=
                        form.itemsPaginated[form.itemsPaginated.length - 1]
                      "
                    >
                      <div
                        :id="
                          item.filier +
                          item.localDateTime +
                          item.local +
                          item.localDate
                        "
                      >
                        <div
                          class="flex grid grid-cols-4 grid-flow-col gap-4 pb-10"
                        >
                          <div class="flex justify-start col-span-1">
                            Université Sultan Moulay Slimane <br />
                            Faculté Polydisciplinaire <br />
                            Beni Mellal
                          </div>

                          <div class="flex justify-center col-span-2">
                            <img
                              src="http://www.fpbm.ma/new/img/fplogo_145x154.png"
                              alt="fpbm logo"
                              class="relative object-contain max-h-28"
                            />
                          </div>
                          <div class="flex justify-end col-span-1">
                            <img
                              :id="
                                'img_' +
                                item.filier +
                                item.localDateTime +
                                item.local +
                                item.localDate
                              "
                              src=""
                              class="relative object-contain max-h-28"
                            />
                          </div>
                        </div>

                        <div
                          class="flex grid grid-cols-4 grid-flow-col gap-4 py-10"
                          :id="
                            'input_' +
                            item.filier +
                            item.localDateTime +
                            item.local +
                            item.localDate
                          "
                        >
                          <div class="flex justify-start col-span-1">
                            <div class="text-dark">
                              <p>Filière : {{ item.filier }}</p>
                              <p>Semester : {{ item.semester }}</p>
                              <p>Salle : {{ item.local }}</p>
                            </div>
                          </div>
                          <div class="flex justify-center col-span-2">
                            <div class="text-dark">
                              <h3 class="text-normal font-semibold">
                                Fiche D'absense
                              </h3>
                              <span class="text-sm"
                                >A.U : {{ new Date().getFullYear() }}-{{
                                  new Date().getFullYear() + 1
                                }}</span
                              >
                            </div>
                          </div>
                          <div class="flex justify-end col-span-1">
                            <div class="text-dark">
                              <p>Heure : {{ item.localDateTime }}</p>
                              <p>Date : {{ item.localDate }}</p>

                              <p class="text-sm">Module : {{ item.module }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="mt-4">
                          <div class="col-100">
                            Les surveillants :
                            <div
                              class="overflow-x-auto relative rounded-lg mt-7"
                            >
                              <table class="lines border">
                                <thead
                                  v-if="item.surveillants.length > 0"
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
                                      Prénom
                                    </th>

                                    <th
                                      class="pr-5 total text font-semibold text-white text-alignment-right text-right border-radius-last"
                                    >
                                      Signature
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
                                    </td>
                                    <td
                                      style="display: revert"
                                      class="quantity text text-alignment-right text-right border-b-0"
                                    >
                                      {{ surveillant.lastname }}
                                    </td>

                                    <td
                                      style="display: revert"
                                      class="total text text-alignment-right text-right border-b-0"
                                    >
                                      ......................................
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <span
                                v-show="item.surveillants.length == 0"
                                class="grid place-items-center text-gray-300 p-8"
                              >
                                Pas encore de surveillants...
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="mt-4">
                          <div class="col-100">
                            Les étudiants :
                            <div
                              class="overflow-x-auto relative rounded-lg mt-7"
                            >
                              <table class="lines border">
                                <thead
                                  v-if="item.etudiants.length > 0"
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
                                      v-if="
                                        form.itemsPaginated[
                                          form.itemsPaginated.length - 1
                                        ]
                                      "
                                      class="py-2 md:py-1 pl-5 item text font-semibold text-alignment-left text-left text-white border-radius-first"
                                    >
                                      Nº D'order
                                    </th>
                                    <th
                                      class="py-2 md:py-1 pl-5 item text font-semibold text-alignment-left text-left text-white border-radius-first"
                                    >
                                      Nom et Prénom
                                    </th>
                                    <th
                                      class="quantity text font-semibold text-alignment-left text-left text-white"
                                    >
                                      Apogée
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
                                    <th
                                      class="pr-4 total text font-semibold text-white text-alignment-right text-right border-radius-last"
                                    >
                                      ABS
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
                                      v-if="
                                        form.itemsPaginated[
                                          form.itemsPaginated.length - 1
                                        ]
                                      "
                                      style="display: revert"
                                      class="item text text-alignment-left text-left border-b-0"
                                    >
                                      {{
                                        form.itemsPaginated[
                                          form.itemsPaginated.length - 1
                                        ][surveillant.id.toString()]
                                      }}
                                    </td>
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
                                    <td
                                      style="display: revert"
                                      class="total text-black text-alignment-right text-right border-b-0"
                                    >
                                      <div
                                        class="inline-block align-baseline pb-1/2 border w-1/2"
                                      ></div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <span
                                v-show="item.etudiants.length == 0"
                                class="grid place-items-center text-gray-300 p-8"
                              >
                                Pas encore de étudiants...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span
                v-show="form.itemsPaginated.length == 1"
                class="grid place-items-center text-gray-300 p-8"
              >
                Pas encore de pv...
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
