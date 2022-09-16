<script setup>
import { reactive } from "vue";
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
const form = reactive({
  login: "admin",
  pass: "123",
});

// const loggedIn = computed(() => {
//   return useAuth().initialState.status.loggedIn;
// });

// if (loggedIn.value) {
//   router.push("/dashboard");
// }

const submit = async () => {
  const authStore = useAuthStore();
  await authStore.login(form.login, form.pass);

  // await axios
  //   .post("http://localhost:8080/login", {
  //     username: form.login,
  //     password: form.pass,
  //   })
  //   .then((resp) => {
  //     console.log(resp.data);
  //   });
  // loading = true;

  // useStore()
  //   .$patch("login", user)
  //   .then(
  //     () => {
  //       router.push("/profile");
  //     },
  //     (error) => {
  //       alert(error);
  //       // this.message =
  //       //   (error.response &&
  //       //     error.response.data &&
  //       //     error.response.data.message) ||
  //       //   error.message ||
  //       //   error.toString();
  //     }
  //   );

  // router.push("/dashboard");
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
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
