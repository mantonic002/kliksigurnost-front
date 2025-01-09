import "../App.css";
import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  let navigate = useNavigate();
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((item, index) => (
          <li
            key={index}
            className="SidebarItem"
            id={window.location.pathname == item.link ? "active" : ""}
            onClick={() => {
              navigate(item.link);
            }}
          >
            <div id="icon">{item.icon}</div>
            <div id="title">{item.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
