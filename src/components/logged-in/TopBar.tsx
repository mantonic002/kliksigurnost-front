import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import { Notification } from "../../models/Notification";
import notificationService from "../../services/notification-service";
import { CanceledError } from "axios";
import logo from "../../../public/images/logo_final2.png";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { email } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const openNotifications = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  return (
    <div className="TopBar">
      <div className="Logo">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: '100%', maxHeight: '40px' }}
        />
      </div>
      <div className="PageTitle">{title}</div>
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
                  <div className="notification-message">{notification.message}</div>
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
    </div>
  );
};

export default TopBar;