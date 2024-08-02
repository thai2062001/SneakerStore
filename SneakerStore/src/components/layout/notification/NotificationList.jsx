import React from "react";
import NotificationItem from "./notificationItem";

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-list max-h-80 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications</p>
      )}
    </div>
  );
};

export default NotificationList;
