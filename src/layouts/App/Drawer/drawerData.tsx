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
      },
      {
        name: "Home",
        icon: <Icon icon="clarity:home-line" />,
        to: "/app/home",
      },
      // {
      //   name: "About",
      //   icon: <Icon icon="mdi:about-circle-outline" />,
      //   to: "/app/about",
      // },
      {
        name: "Executive",
        icon: <Icon icon="clarity:employee-group-line" />,
        to: "/app/executive",
      },
      {
        name: "Publications",
        icon: <Icon icon="carbon:catalog-publish" />,
        to: "/app/publications",
      },
      {
        name: "Gallery",
        icon: <Icon icon="solar:gallery-broken" />,
        to: "/app/gallery",
      },
    ],
  },
  {
    title: "Personal",
    sublist: [
      {
        name: "Moderators",
        icon: <Icon icon="solar:shield-user-linear" />,
        to: "/app/mods",
      },
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
