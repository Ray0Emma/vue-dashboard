<script setup>
import { computed, ref, toRaw, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useStyleStore } from "@/stores/style";
import { mdiPen, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

import DepartementDataService from "@/services/DepartementDataService";
import router from "@/router";

const props = defineProps({
  dataTable: Object,
  instructor: String,
});

const boxArray = ref(null);
boxArray.value = props.dataTable;
const styleStore = useStyleStore();

const mainStore = useMainStore();
console.log(props.dataTable);
const items = computed(() =>
  boxArray.value ? boxArray.value : mainStore.clients
);

const myId = ref(null);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const getId = (id) => {
  myId.value = id;
  console.log(id);
};

const remove = (inst, id) => {
  // console.log(myId.value);
  DepartementDataService.deleteData(inst, id).then(() => {
    DepartementDataService.retrieveAllData(inst).then((r) => {
      if (r.data) {
        boxArray.value = r.data;
      }
    });
    router.push("/" + props.instructor);
  });
};

const goUpdate = (id) => {
  router.push("/" + props.instructor + "/" + id);
};
</script>

<template>
  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Veuillez confirmer"
    @confirm="remove(instructor, myId)"
    button="danger"
    has-cancel
  >
    <p>Êtes-vous sûr?</p>
    <p>Vous ne pourrez pas <b>annuler</b> cela !</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th>
          <span v-if="instructor != 'departments'">Nom et Prenom</span>
          <span v-if="instructor == 'departments'">Nom</span>
        </th>
        <th v-if="instructor != 'departments'">CIN</th>
        <th v-if="instructor != 'departments'">CNE</th>
        <th v-if="instructor != 'departments'">
          <span v-if="instructor == 'students'">Apogée</span>
          <span v-if="instructor == 'professors'">Grade</span>
        </th>
        <th v-if="instructor != 'departments'">Date de naissance</th>
        <th v-if="instructor != 'departments'">Téléphone</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <td>{{ client.nom }} {{ client.prenom }}</td>
        <td v-if="client.cin">
          {{ client.cin }}
        </td>
        <td v-if="client.cne">{{ client.cne }}</td>
        <td class="lg:w-32" v-if="client.nbApogee || client.grade">
          {{ client.nbApogee }}
          <!-- {{ client.filiere }} -->
          {{ client.grade }}
        </td>
        <td v-if="client.dateDeNaissance">
          {{ client.dateDeNaissance.substring(0, 10) }}
        </td>
        <td class="lg:w-1 whitespace-nowrap" v-if="client.telephone">
          <small class="text-gray-500 dark:text-slate-400">{{
            client.telephone
          }}</small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiPen"
              small
              @click="goUpdate(client.id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="(isModalDangerActive = true), getId(client.id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = page"
        />
      </BaseButtons>
      <small
        >Page {{ currentPageHuman }} sur {{ numPages }} enregistrements.</small
      >
    </BaseLevel>
  </div>
</template>
