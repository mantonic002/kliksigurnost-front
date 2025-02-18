import {
  AiFillHome,
  AiFillMobile,
  AiFillSliders,
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
  iconOutline: JSX.Element;
  iconFilled?: JSX.Element;
  element: JSX.Element;
  link: string;
  onClick?: () => void;
}

export const SidebarData: SidebarItem[] = [
  {
    title: "Početna",
    iconOutline: <AiOutlineHome />,
    iconFilled: <AiFillHome />,
    element: <Home />,
    link: "/home",
  },
  {
    title: "Pravila",
    iconOutline: <AiOutlineSliders />,
    iconFilled: <AiFillSliders />,
    element: <Policies />,
    link: "/policies",
  },
  {
    title: "Uredjaji",
    iconOutline: <AiOutlineMobile />,
    iconFilled: <AiFillMobile />,
    element: <Devices />,
    link: "/devices",
  },
  {
    title: "Praćenje",
    iconOutline: <AiOutlineBarChart />,
    element: <Logs />,
    link: "/logs",
  },
  {
    title: "Odjava",
    iconOutline: <AiOutlineLogout />,
    element: <></>,
    link: "/login",
  },
];
