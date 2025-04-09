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
import GpsTracking from "./GpsTracking";

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
    link: "/pocetna",
  },
  {
    title: "Pravila",
    iconOutline: <BsFileRuled />,
    iconFilled: <BsFileRuledFill />,
    element: <Policies />,
    link: "/pravila",
  },
  {
    title: "Uredjaji",
    iconOutline: <BsPhone />,
    iconFilled: <BsPhoneFill />,
    element: <Devices />,
    link: "/uredjaji",
  },
  {
    title: "Internet aktivnost",
    iconOutline: <BsBarChartLine />,
    iconFilled: <BsBarChartLineFill />,
    element: <Logs />,
    link: "/pracenje",
  },
  {
    title: "GPS lokacija",
    iconOutline: <BsPinMap />,
    iconFilled: <BsPinMapFill />,
    element: <GpsTracking />,
    link: "/lokacija",
  },
  {
    title: "Korisnička podrška",
    iconOutline: <BsHeadset />,
    element: <AppointmentForm />,
    link: "/podrska",
  },
  {
    title: "Odjava",
    iconOutline: <BsBoxArrowLeft />,
    element: <></>,
    link: "/odjava",
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
    link: "/odjava",
  },
];
