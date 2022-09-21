<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { computed } from "@vue/reactivity";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

const router = useRouter();
const error = ref({});
const form = reactive({
  login: "",
  pass: "",
});

const submit = async () => {
  if (form.login && form.pass) {
    const authStore = useAuthStore();
    await authStore.login(form.login, form.pass);
  }

  error.value = {};

  if (!form.login) {
    error.value.login = "Le champ nom est obligatoire";
  }
  if (!form.pass) {
    error.value.pass = "Le champ mot de passe est obligatoire";
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }">
      <CardBox :class="cardClass" form @submit.prevent="submit">
        <FormField
          label="Nom"
          :help="error?.login ? error?.login : 'Veuillez entrer votre Nom'"
        >
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField
          label="Mot de passe"
          :help="
            error?.pass ? error?.pass : 'Veuillez entrer votre mot de passe'
          "
        >
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Se connecter" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
