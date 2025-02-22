import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SidebarData } from "./SidebarData";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../App.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`Sidebar ${collapsed ? "collapsed" : ""}`}>
      <ul className="SidebarList">
        {/* <li className="SidebarItemStatic">{email}</li> */}
        <li className="SidebarItem" onClick={() => setCollapsed(!collapsed)}>
          <div className="icon-container">
              {collapsed ? <AiOutlineMenu /> : <AiOutlineClose />}
          </div>
          {!collapsed && <div className="title">Zatvori</div>}
        </li>
        {SidebarData.map((item, index) => (
          <li
            key={index}
            className="SidebarItem"
            id={window.location.pathname === item.link ? "active" : ""}
            onClick={() => {
              if (item.title === "Odjava") {
                logout();
                navigate("/login");
                window.location.reload();
              } else {
                navigate(item.link);
              }
            }}
          >
            <div className="icon-container">{item.iconOutline}</div>
            {!collapsed && <div className="title">{item.title}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;