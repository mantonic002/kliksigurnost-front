import {
  AiOutlineBarChart,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMobile,
  AiOutlineSliders,
} from "react-icons/ai";
import Home from "./Home";
import Policies from "./PolicyManager";
import Logs from "./Logs";
import Devices from "./Devices";

interface SidebarItem {
  title: string;
  icon: JSX.Element;
  element: JSX.Element;
  link: string;
  onClick?: () => void;
}

export const SidebarData: SidebarItem[] = [
  {
    title: "Početna",
    icon: <AiOutlineHome />,
    element: <Home />,
    link: "/home",
  },
  {
    title: "Pravila",
    icon: <AiOutlineSliders />,
    element: <Policies />,
    link: "/policies",
  },
  {
    title: "Uredjaji",
    icon: <AiOutlineMobile />,
    element: <Devices />,
    link: "/devices",
  },
  {
    title: "Praćenje",
    icon: <AiOutlineBarChart />,
    element: <Logs />,
    link: "/logs",
  },
  {
    title: "Odjava",
    icon: <AiOutlineLogout />,
    element: <></>,
    link: "/login",
  },
];
