import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLifebuoy,
  mdiViewList,
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
    label: "Les données",
    icon: mdiViewList,
    menu: [
      {
        to: "/departments",
        label: "Departements",
      },
      {
        to: "/students",
        label: "Etudiants",
      },
      {
        to: "/professors",
        label: "Professeurs",
      },
      {
        to: "/filieres",
        label: "Filieres",
      },
      {
        to: "/modules",
        label: "Modules",
      },
      {
        to: "/semesters",
        label: "Semesters",
      },
    ],
  },
  {
    label: "Les Pvs",
    icon: mdiReceiptTextCheck,
    menu: [
      {
        to: "/pv/index",
        label: "Les Pvs",
      },
      {
        to: "/pv/add",
        label: "Nouveau Pv",
      }
    ],
  },
  // {
  //   to: "/pv/add",
  //   label: "PV..",
  //   icon: mdiReceiptTextCheck,
  // },
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
