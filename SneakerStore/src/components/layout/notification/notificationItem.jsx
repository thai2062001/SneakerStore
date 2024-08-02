// src/components/NotificationItem.js
import React from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const iconMap = {
  "Password Change": <AssignmentIndIcon className="text-blue-500" />,
  "Address Update": <HomeIcon className="text-green-500" />,
  Promotion: <CreditScoreIcon className="text-yellow-500" />,
  "Order Shipped": <LocalShippingIcon className="text-orange-500" />,
  order_success: <ConfirmationNumberIcon className="text-teal-500" />,
};

const NotificationItem = ({ notification }) => {
  const { type, message, createdAt, isRead } = notification;
  const Icon = iconMap[type] || null;

  return (
    <div
      className={`notification-item flex items-center  p-4 mb-2 border-l-4 ${
        isRead ? "border-gray-300 bg-gray-100" : "border-blue-500 bg-white"
      } rounded-lg shadow-sm`}
    >
      {Icon && <div className="icon mr-3">{Icon}</div>}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{type}</h3>
        <p className="text-sm">{message}</p>
        <span className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
