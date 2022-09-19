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
// import { useAuth } from "@/stores/auth.module.js";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

const router = useRouter();
const error = ref({});
const form = reactive({
  login: "",
  pass: "",
});

// const loggedIn = computed(() => {
//   return useAuth().initialState.status.loggedIn;
// });

// if (loggedIn.value) {
//   router.push("/dashboard");
// }

const submit = async () => {
  if (form.login && form.pass) {
    const authStore = useAuthStore();
    await authStore.login(form.login, form.pass);
  }

  error.value = {};

  if (!form.login) {
    error.value.login = "Login required.";
  }
  if (!form.pass) {
    error.value.pass = "Pass required.";
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" form @submit.prevent="submit">
        <FormField
          label="Login"
          :help="error?.login ? error?.login : 'Please enter your login'"
        >
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField
          label="Password"
          :help="error?.pass ? error?.pass : 'Please enter your password'"
        >
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
          />
        </FormField>

        <!-- <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <!-- <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
