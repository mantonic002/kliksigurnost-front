import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AiFillBell, AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { Notification } from "../../models/Notification";
import notificationService from "../../services/notification-service";
import { CanceledError } from "axios";
import logo from "../../../public/images/logo_final2.png";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { SidebarData } from "./SidebarData";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { email, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  // Existing notification functions remain the same
  const openNotifications = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setNotificationCount(0);
    }
  }, [isDropdownOpen]);

  const fetchNotifications = async () => {
    notificationService
      .getUnseenNotifications()
      .then((res) => {
        setNotifications(res);
        setNotificationCount(res.length);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
      });
  };

  const fetchNotificationCount = async () => {
    notificationService
      .getUnseenNotificationCount()
      .then((res) => {
        setNotificationCount(res);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
      });
  };

  // Sidebar functions
  const handleSidebarToggle = () => setShowSidebar(!showSidebar);
  const handleSidebarClose = () => setShowSidebar(false);

  const handleNavigation = (link: string) => {
    handleSidebarClose();
    if (link === "logout") {
      logout();
      navigate("/login");
      window.location.reload();
    } else {
      navigate(link);
    }
  };

  return (
    <div className="TopBar">
      {/* Hamburger Menu Button */}
      <button className="sidebar-toggle" onClick={handleSidebarToggle}>
        <AiOutlineMenu size={24} />
      </button>

      {/* Logo */}
      <div className="Logo">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "100%", maxHeight: "40px" }}
        />
      </div>

      {/* Page Title */}
      {/* <div className="PageTitle">{title}</div> */}

      {/* Notifications and User Email */}
      <div className="TopBar-element">
        <div className="action-icon mb-3" onClick={openNotifications}>
          <AiOutlineBell size={25} className="action-blue outlined" />
          <AiFillBell size={25} className="action-blue filled" />
          <span className="notification-badge">{notificationCount}</span>
        </div>
        {isDropdownOpen && (
          <div className="notifications-dropdown">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-date">{notification.date}</div>
                </div>
              ))
            ) : (
              <div className="notification-item">No new notifications</div>
            )}
          </div>
        )}
        <div className="userEmail">{email}</div>
      </div>

      {/* Sidebar Offcanvas */}
      <Offcanvas
        show={showSidebar}
        onHide={handleSidebarClose}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="Logo" style={{ maxHeight: "40px" }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="sidebar-nav">
            <ul>
              {SidebarData.map((item, index) => (
                <li
                  key={index}
                  className="sidebar-item"
                  onClick={() => {
                    if (item.title === "Odjava") {
                      logout();
                      navigate("/");
                      window.location.reload();
                    } else {
                      handleNavigation(item.link);
                    }
                  }}
                >
                  <div className="sidebar-icon">{item.iconOutline}</div>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TopBar;
