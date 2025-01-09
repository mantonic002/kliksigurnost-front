import {
  AiOutlineBarChart,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSliders,
} from "react-icons/ai";
import Home from "./Home";
import Policies from "./Policies";
import Logs from "./Logs";

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
