import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLifebuoy,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReceiptTextCheck,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  // {
  //   to: "/tables",
  //   label: "Tables",
  //   icon: mdiTable,
  // },
  // {
  //   to: "/forms",
  //   label: "Forms",
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/",
  //   label: "Styles",
  //   icon: mdiPalette,
  // },

  // {
  //   to: "/login",
  //   label: "Login",
  //   icon: mdiLock,
  // },
  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle,
  // },
  {
    label: "Data",
    icon: mdiViewList,
    menu: [
      {
        to: "/departements",
        label: "Departements",
      },
      {
        to: "/error",
        label: "Etudiants",
      },
      {
        to: "/error",
        label: "Professeurs",
      },
    ],
  },
  {
    to: "/profile",
    label: "PV..",
    icon: mdiReceiptTextCheck,
  },
  {
    to: "/profile",
    label: "Profil",
    icon: mdiAccountCircle,
  },
  {
    href: "https://github.com/justboil/admin-one-vue-tailwind",
    label: "Aide",
    icon: mdiLifebuoy,
  },
];
