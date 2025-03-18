import Home from "./Home";
import Policies from "./PolicyManager";
import Logs from "./Logs";
import Devices from "./Devices";
import AppointmentForm from "./AppointmentForm";
import AdminDashboard from "./admin/AdminDashboard";
import {
  BsActivity,
  BsBarChartLine,
  BsBarChartLineFill,
  BsBoxArrowLeft,
  BsFileRuled,
  BsFileRuledFill,
  BsHeadset,
  BsHouse,
  BsHouseFill,
  BsPhone,
  BsPhoneFill,
  BsPinMap,
  BsPinMapFill,
} from "react-icons/bs";

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
    iconOutline: <BsHouse />,
    iconFilled: <BsHouseFill />,
    element: <Home />,
    link: "/home",
  },
  {
    title: "Pravila",
    iconOutline: <BsFileRuled />,
    iconFilled: <BsFileRuledFill />,
    element: <Policies />,
    link: "/policies",
  },
  {
    title: "Uredjaji",
    iconOutline: <BsPhone />,
    iconFilled: <BsPhoneFill />,
    element: <Devices />,
    link: "/devices",
  },
  {
    title: "Praćenje",
    iconOutline: <BsBarChartLine />,
    iconFilled: <BsBarChartLineFill />,
    element: <Logs />,
    link: "/logs",
  },
  {
    title: "GPS lokacija",
    iconOutline: <BsPinMap />,
    iconFilled: <BsPinMapFill />,
    element: <Logs />,
    link: "/logs",
  },
  {
    title: "Korisnička podrška",
    iconOutline: <BsHeadset />,
    element: <AppointmentForm />,
    link: "/support",
  },
  {
    title: "Odjava",
    iconOutline: <BsBoxArrowLeft />,
    element: <></>,
    link: "/logout",
  },
];

export const SidebarDataAdmin: SidebarItem[] = [
  {
    title: "Admin",
    iconOutline: <BsActivity />,
    element: <AdminDashboard />,
    link: "/admin",
  },
  {
    title: "Odjava",
    iconOutline: <BsBoxArrowLeft />,
    element: <></>,
    link: "/logout",
  },
];
