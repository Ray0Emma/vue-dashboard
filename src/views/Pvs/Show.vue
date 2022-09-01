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
    
    const form = reactive({
      filiere: "",
      filiere_id: "",
      semester: "",
      semester_id: "",
      time: "",
      module: "",
      module_id: "",
    });
    
    const submit = () => {
    
      router.push("/pv/show/" + form.filiere_id + "/" + form.semester_id + "/" + form.module_id + "/" + form.time);
      // DepartementDataService.createPv(
      //   "pv",
      //   form.filiere_id,
      //   form.semester_id,
      //   form.module_id,
      //   form.time
      // )
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((e) => {
      //     alert(e);
      //   });
    };
</script>
    
<template>
    <LayoutAuthenticated>
      <SectionMain>
    </SectionMain>
  </LayoutAuthenticated>
</template>
