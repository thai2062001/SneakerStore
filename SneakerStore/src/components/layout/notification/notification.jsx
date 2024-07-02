import React from "react";

const Notification = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      // Add more cases for other types like 'error', 'warning', etc.
      default:
        return null;
    }
  };

  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <span>{getIcon()}</span>
        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {message.title}
          </strong>
          <p className="mt-1 text-sm text-gray-700">{message.body}</p>
        </div>
        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss popup</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
