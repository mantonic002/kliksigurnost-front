import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SidebarData } from "./SidebarData";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((item, index) => (
          <li
            key={index}
            className="SidebarItem"
            id={window.location.pathname === item.link ? "active" : ""}
            onClick={() => {
              // If the item is "Odjava" (logout), perform logout
              if (item.title === "Odjava") {
                logout();
                navigate("/login"); // Redirect to login
              } else {
                navigate(item.link); // Navigate to other links
              }
            }}
          >
            <div id="icon">{item.icon}</div>
            <div id="title">{item.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
