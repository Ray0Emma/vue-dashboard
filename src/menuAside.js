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
  {
    to: "/profile",
    label: "Profil",
    icon: mdiAccountCircle,
  },
  {
    to: "/help",
    label: "Aide",
    icon: mdiLifebuoy,
  },
];
