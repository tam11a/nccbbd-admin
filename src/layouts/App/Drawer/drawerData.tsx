import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (logout?: () => void): IDrawerData[] => [
  {
    title: "General",
    sublist: [
      {
        name: "Dashboard",
        icon: <Icon icon="mdi-light:view-dashboard" />,
        to: "/app",
      }
    ],
  },
  {
    title: "Informations",
    sublist: [
      {
        name: "Customers",
        icon: <Icon icon="fluent:people-20-regular" />,
        to: "/app/customer",
      },
    ],
  },
  // {
  //   title: "Reports",
  //   sublist: [
  //     {
  //       name: "Sales",
  //       icon: <Icon icon="carbon:report-data" />,
  //       to: "/app/sales",
  //     },
  //   ],
  // },
  {
    title: "Additional",
    sublist: [
      {
        name: "Executive body",
        icon: <Icon icon="clarity:employee-group-line" />,
        to: "/app/employees",
      },
    ],
  },
  {
    title: "Personal",
    sublist: [
      {
        name: "Settings",
        icon: <Icon icon="clarity:cog-line" />,
        to: "/app/settings",
      },
      {
        name: "Sign Out",
        icon: <VscSignOut />,
        function: logout,
      },
    ],
  },
];
