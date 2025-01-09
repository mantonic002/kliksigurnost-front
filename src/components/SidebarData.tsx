import {
  AiOutlineBarChart,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineSliders,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Home from "./Home";
import Policies from "./Policies";
import Logs from "./Logs";
import Login from "./Login";
import Register from "./Register";

interface SidebarItem {
  title: string;
  icon: JSX.Element;
  element: JSX.Element;
  link: string;
}

export const SidebarData: SidebarItem[] = [
  {
    title: "Početna",
    icon: <AiOutlineHome />,
    element: <Home />,
    link: "/",
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
    title: "Prijava",
    icon: <AiOutlineLogin />,
    element: <Login />,
    link: "/login",
  },
  {
    title: "Registracija",
    icon: <AiOutlineUserAdd />,
    element: <Register />,
    link: "/register",
  },
];
