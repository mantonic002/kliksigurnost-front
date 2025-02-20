import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";
import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import { Notification } from "../models/Notification";
import notificationService from "../services/notification-service";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { email } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const openNotifications = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      // Fetch notifications when the dropdown is opened
      fetchNotifications();
    }
  }, [isDropdownOpen]);

  const fetchNotifications = async () => {
    notificationService
      .getUnseenNotifications()
      .then((res) => {
        setNotifications(res);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
        setError(error.message || "Failed to fetch policies");
        setIsLoading(false);
      });
  };

  return (
    <div className="TopBar">
      <div className="Logo">Your Logo</div>
      <div className="PageTitle">{title}</div>
      <div className="TopBar-element">
        <div className="action-icon mb-3" onClick={openNotifications}>
          <AiOutlineBell size={25} className="action-blue outlined" />
          <AiFillBell size={25} className="action-blue filled" />
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
        <div className="UserEmail">{email}</div>
      </div>
    </div>
  );
};

export default TopBar;