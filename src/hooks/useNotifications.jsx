import { useCallback, useState } from "react";
import Toast from "../components/Toast";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";

const useNotification = (position = "bottom-left") => {
  const [notifications, setNotifications] = useState([]);

  const notificationPosition = {
    "bottom-right": "bottom-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "top-right": "top-10 right-10",
    "top-left": "top-10 left-10",
    "top-center": "top-10 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-10 left-1/2 -translate-x-1/2",
  };

  const [vertical, horizontal] = position.split("-");
  const alignment =
    horizontal === "left"
      ? "items-start"
      : horizontal === "right"
      ? "items-end"
      : "items-center";

  const direction = vertical === "top" ? "flex-col" : "flex-col-reverse";

  const handleNotificationClear = function (id) {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const triggerNotification = useCallback((notificationProps) => {
    const toastId = uuidv4();

    setNotifications((preNotifications) => [
      ...preNotifications,
      { id: toastId, ...notificationProps },
    ]);
  }, []);

  const NotificationComponent = (
    <AnimatePresence>
      {" "}
      <div
        className={`fixed flex 
    ${direction} 
    ${alignment}
    ${notificationPosition[position]} 
    `}
      >
        {notifications.map((notification, index) => (
          <Toast
            key={notification.id}
            {...notification}
            onClose={() => handleNotificationClear(notification.id)}
          />
        ))}
      </div>
    </AnimatePresence>
  );

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
