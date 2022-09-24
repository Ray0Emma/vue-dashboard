import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers/fetch-wrapper";
import router from "@/router";
// import { router } from '@/router';
// import { useAlertStore } from '@/stores';

const baseUrl = "http://localhost:8080";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: localStorage.getItem("user"),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const user = await fetchWrapper.post(`${baseUrl}/login`, {
          username: username,
          password: password,
        });

        this.user = user;
        console.log(`login ${JSON.stringify(user.role)}`);
        if (this.user.role) {
          this.user.role.forEach((element) => {
            if (element.authority == "admin") {
              // store user details and jwt in local storage to keep user logged in between page refreshes
              localStorage.setItem("user", JSON.stringify(this.user));

              // redirect to previous url or default to home page
              router.push(this.returnUrl || "/dashboard");
            } else {
              alert("this user is not authorized");
            }
          });
        }
      } catch (error) {
        // const alertStore = useAlertStore();
        alert(error);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/");
    },
  },
});
