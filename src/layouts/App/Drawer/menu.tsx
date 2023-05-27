import { Icon, IconifyIcon } from "@iconify/react";
import { VscSignOut } from "react-icons/vsc";
import { IDrawerData } from "../types";

// export interface MenuItem {
//   name: string;
//   link: string;
//     icon: string | JSX.Element;
//     function?: () => void;
// }




export const menuData = (logout?: () => void): IDrawerData[] => [
  {
    title: "Personal",
    sublist: [
      {
        name: "Profile",
        icon: <Icon icon="material-symbols:person-rounded" />,
        to: "/app/settings",
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
