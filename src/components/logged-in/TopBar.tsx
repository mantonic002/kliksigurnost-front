import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Notification } from "../../models/Notification";
import notificationService from "../../services/notification-service";
import { CanceledError } from "axios";
import logo from "/images/logo_final2.png";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { SidebarData, SidebarDataAdmin } from "./SidebarData";
import "../../styles/components/TopBar.css";
import { BsBell, BsBellFill, BsList } from "react-icons/bs";
import React from "react";

const TopBar = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  // Custom dropdown toggle component
  const CustomToggle = React.forwardRef<
    HTMLDivElement,
    { onClick: (e: React.MouseEvent) => void }
  >(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="action-icon"
    >
      <div className="icon-wrapper">
        <BsBell size={25} className="action-blue outlined" />
        <BsBellFill size={25} className="action-blue filled" />
        <span className="notification-badge">{notificationCount}</span>
      </div>
    </div>
  ));

  useEffect(() => {
    fetchNotificationCount();
  }, []);

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

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);
  const handleSidebarClose = () => setShowSidebar(false);

  const handleNavigation = (link: string) => {
    handleSidebarClose();
    if (link === "/odjava") {
      logout();
      navigate("/prijava");
      window.location.reload();
    } else {
      navigate(link);
    }
  };

  return (
    <div className="TopBar">
      {/* Hamburger Menu Button */}
      <button className="sidebar-toggle" onClick={handleSidebarToggle}>
        <BsList size={24} />
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

      {/* Notifications Dropdown */}
      <div className="TopBar-element">
        {profile?.role !== "ADMIN" && (
          <Dropdown onToggle={(isOpen) => isOpen && fetchNotifications()}>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu className="notifications-dropdown p-0">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Dropdown.Item
                    key={notification.id}
                    className="notification-item p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="notification-message text-wrap"
                      style={{ fontWeight: "normal" }}
                    >
                      {notification.message}
                    </div>
                    <div className="notification-date text-muted small mt-1">
                      {notification.date}
                    </div>
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item className="notification-item p-3">
                  <div
                    className="notification-message"
                    style={{ fontWeight: "normal" }}
                  >
                    No new notifications
                  </div>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <Offcanvas
        show={showSidebar}
        onHide={handleSidebarClose}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="Logo" style={{ maxHeight: "40px" }} />
            <div className="user-details">
              <div className="user-email">{profile?.email}</div>
              <div className="user-organization">
                {profile?.organizationName}
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="sidebar-nav">
            {profile?.role !== "ADMIN" && (
              <ul>
                {SidebarData.map((item, index) => (
                  <li
                    key={index}
                    className="sidebar-item"
                    onClick={() => {
                      handleNavigation(item.link);
                    }}
                  >
                    <div className="sidebar-icon">{item.iconOutline}</div>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            )}
            {profile?.role === "ADMIN" && (
              <ul>
                {SidebarDataAdmin.map((item, index) => (
                  <li
                    key={index}
                    className="sidebar-item"
                    onClick={() => {
                      handleNavigation(item.link);
                    }}
                  >
                    <div className="sidebar-icon">{item.iconOutline}</div>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TopBar;
