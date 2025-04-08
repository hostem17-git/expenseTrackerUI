// components/ToastManager.jsx
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";
import { dismissToast } from "../redux/toastSlice";

const ToastManager = ({ position = "top-right" }) => {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

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

  return (
    <div className={`fixed flex ${direction} ${alignment} ${notificationPosition[position]} z-50`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => dispatch(dismissToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastManager;
