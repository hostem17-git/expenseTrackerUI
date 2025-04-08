import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Toast({
  type = "info",
  message,
  onClose,
  duration = 5000,
  animation = "fadeIn",
}) {

  const notificationRef = useRef();

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  };

  const toastStyles = {
    error: "bg-red-500",
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  };

  const animationVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideIn: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 50, opacity: 0 },
    },
    pop: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
  };
  
  const ariaRole = type==="error" || type==="warning"?"alert":"status";
  const ariaLive = type==="error" || type==="warning"?"assetive":"polite";

  return (
    <motion.div
      role={ariaRole}
      aria-live={ariaLive}
      initial="initial"
      animate="animate"
      exit="exit"
      tabIndex={-1}
      ref={notificationRef}
      variants={animationVariants[animation] || animationVariants.fadeIn}
      className={`z-50 flex
        p-3 my-2 text-white justify-between rounded-lg shadow-lg w-fit max-w-sm
        ${toastStyles[type]}
        `}
    >
      <div className="flex space-x-3 items-center">
        {icons[type]}
        <p className="text-sm font-medium">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="p-1 rounded-full hover:bg-white/20 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </motion.div>
  );
}

export default Toast;
