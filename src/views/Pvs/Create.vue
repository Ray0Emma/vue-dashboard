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

const file = ref(null);
const form = reactive({
  filiere: "",
  filiere_id: 4,
  filiere_name: "",
  semester: "",
  semester_id: 4,
  semester_name: "",
  time: "",
  module: "",
  module_id: "",
});

DepartementDataService.retrieveAllData("filiere")
  .then((response) => {
    form.filiere = response.data;
  })
  .catch((e) => {
    alert(e);
  });

DepartementDataService.retrieveAllData("ExamenTime")
  .then((response) => {
    form.examenTime = response.data;
  })
  .catch((e) => {
    alert(e);
  });

const getsem = () => {
  DepartementDataService.retrieveData("semester/filiere", form.filiere_id)
    .then((response) => {
      form.semester = response.data;
    })
    .catch((e) => {
      alert(e);
    });
};
getsem();
const getmod = () => {
  DepartementDataService.retrieveData("module/filiere", form.semester_id)
    .then((response) => {
      form.module = response.data;
    })
    .catch((e) => {
      alert(e);
    });
};
getmod();

const sendFil = (value) => {
  form.filiere_id = value.target.value;
  console.log(form.filiere_id);
};
const sendSem = (value) => {
  form.semester_id = value.target.value;
};
const sendMod = (value) => {
  form.module_id = value.target.value;
};
const sendExmTim = (value) => {
  form.time = value.target.value;
};

const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files;

  file.value = value[0];
  // this.$emit("update:modelValue", file.value);
  let formData = new FormData();
  formData.append("file", file.value);
  DepartementDataService.uploadExcel("pv", formData).then((response) => {
    // DepartementDataService.retrieveAllData("students")
    //   .then((response) => {
    console.log(response.data);
    // })
    // .catch((e) => {
    //   alert(e);
    // });
    // router.push("/students");
  });

  // Use this as an example for handling file uploads
};

const submit = async () => {
  await DepartementDataService.retrieveData("filiere", form.filiere_id)
    .then(async (response) => {
      console.log(response.data.name);
      form.filiere_name = response.data.name;
      await DepartementDataService.retrieveData("semester", form.semester_id)
        .then((response) => {
          console.log(response.data.name);
          form.semester_name = response.data.name;
        })
        .catch((e) => {
          alert(e);
        });
    })
    .catch((e) => {
      alert(e);
    });

  if (form.semester_name != "") {
    router.push(
      "/pv/show/" +
      form.filiere_name +
      "/" +
      form.semester_name +
      "/" +
      form.module_id +
      "/" +
      form.time
    );
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="xl:pt-6">
        <div class="flex flex-col sm:flex-row items-start justify-between">
          <div class="w-full sm:w-6/12 items-center mb-3 sm:mb-0">
            <div class="flex items-center">
              <h1 class="flex items-center text-2xl xl:text-5xl text-black dark:text-gray-300 font-light -ml-0.5 mb-5">
                Nouveau Pv
              </h1>
            </div>
          </div>
          <div class="w-full sm:w-6/12">
            <div
              class="flex flex-wrap flex-col sm:flex-row sm:items-center justify-end sm:space-x-2 sm:rtl:space-x-reverse">
              <a
                class="px-3 py-1.5 cursor-pointer sm:mb-0 rounded-xl text-sm font-medium leading-6 bg-violet-600 hover:bg-violet-700 text-white">
                <input type="file" ref="input" @input="upload" class="absolute opacity-0" />
                Importer l'Excel
              </a>
            </div>
          </div>

          <!-- <div class="w-full sm:w-6/12">
            <div
              class="flex flex-wrap flex-col sm:flex-row sm:items-center justify-end sm:space-x-2 sm:rtl:space-x-reverse"
            ></div>
          </div> -->
        </div>

        <div>
          <div class="flex flex-col lg:flex-row">
            <div class="relative lg:w-8/12 z-10">
              <div class="relative mt-4">
                <form @submit.prevent="submit" role="form" class="mb-0">
                  <div class="mb-14">
                    <div class="border-b-2 border-gray-200 pb-4">
                      <h2 class="lg:text-lg font-medium text-black dark:text-gray-300">
                        Generer Pv
                      </h2>
                      <span class="text-sm font-light text-black dark:text-gray-300">
                        Ajouter les informations pour generer un pv .
                      </span>
                    </div>
                    <div class="grid sm:grid-cols-6 gap-x-8 gap-y-6 my-3.5">
                      <div class="sm:col-span-3 grid gap-x-8 gap-y-6 grid-rows-2">
                        <div class="relative sm:col-span-3 required">
                          <select-input v-model="form.filiere_id" @change="sendFil($event), getsem()" label="Filiere">
                            <option v-for="filiere in form.filiere" :value="filiere.id">
                              {{ filiere.name }}
                            </option>
                          </select-input>
                          <!-- <span v-if="form.errors.name"
                            ><small class="text-red-300">{{
                              form.errors.name
                            }}</small></span
                          > -->
                          <!---->
                        </div>
                        <div class="relative sm:col-span-3 required">
                          <select-input v-model="form.semester_id" @change="sendSem($event), getmod()" label="Semester">
                            <option v-for="semester in form.semester" :value="semester.id">
                              {{ semester.name }}
                            </option>
                          </select-input>
                          <!-- <span v-if="form.errors.email"
                            ><small class="text-red-300">{{
                              form.errors.email
                            }}</small></span
                          > -->
                          <!---->
                        </div>
                      </div>
                      <div class="sm:col-span-3 grid gap-x-8 gap-y-6 grid-rows-2">
                        <div class="relative sm:col-span-3">
                          <select-input
                            @change="sendSem($event)"
                            label="Time"
                          >
                            <option
                              v-for="time in form.examenTime"
                              :value="time.time"
                            >
                              {{ time.time }}
                            </option>

                          </select-input>
                          <!-- <span v-if="form.errors.time"
                            ><small class="text-red-300">{{
                              form.errors.time
                            }}</small></span
                          > -->
                          <!---->
                        </div>
                        <select-input @change="sendMod($event)" label="Module" required>
                          <option v-for="modul in form.module" :value="modul.name">
                            {{ modul.name }}
                          </option>
                        </select-input>
                      </div>
                    </div>
                  </div>
                  <div class="mb-14">
                    <div class="flex items-center justify-end sm:col-span-6">
                      <a href="/dashboard"
                        class="px-6 py-1.5 hover:bg-gray-200 hover:text-gray-800 rounded-lg ltr:mr-2 rtl:ml-2">
                        Annuler
                      </a>
                      <button type="submit"
                        class="ml-5 relative flex items-center justify-center bg-violet-500 hover:bg-violet-700 px-6 py-1.5 text-base rounded-lg disabled:bg-violet-100">
                        <span class=""> Generer </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
