import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications } from "../../features/Notification/notificationSlice";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import NotificationList from "./notification/NotificationList";

const NotificationIcon = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const [isOpen, setIsOpen] = useState(false); // State để điều khiển việc hiển thị danh sách thông báo

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleIconClick = () => {
    setIsOpen(!isOpen); // Chuyển đổi trạng thái hiển thị danh sách thông báo
  };

  return (
    <div className="cursor-pointer relative inline-flex items-center p-2 text-gray-500 hover:text-gray-700">
      <div onClick={handleIconClick} className="relative">
        <NotificationsOutlinedIcon fontSize="medium" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 top-8 mt-2 w-[23rem] z-50 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <NotificationList notifications={notifications} />
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
