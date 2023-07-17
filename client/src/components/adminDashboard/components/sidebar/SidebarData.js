import { MdManageAccounts } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/adminDashboard",
    icon: AiFillHome,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/adminProfile",
    icon: MdManageAccounts,
    cName: "nav-text",
  },
  {
    title: "Log out",
    path: "/",
    icon: IoIosLogOut,
    cName: "nav-text",
  },
];
