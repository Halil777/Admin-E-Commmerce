import React, { useState, useEffect, FC } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Duration for notification
    return () => clearTimeout(timer);
  }, [onClose]);

  return isVisible ? (
    <div
      className={`fixed top-4 right-4 z-50 ${backgroundColor} text-white rounded-md py-2 px-4 shadow-lg 
        transition-opacity duration-500 ease-in-out opacity-100 transform translate-y-0`}
    >
      {message}
    </div>
  ) : (
    <div
      className={`fixed top-4 right-4 z-50 ${backgroundColor} text-white rounded-md py-2 px-4 shadow-lg 
        transition-opacity duration-500 ease-in-out opacity-0 transform translate-y-[-20px]`}
    >
      {message}
    </div>
  );
};

export default Notification;
