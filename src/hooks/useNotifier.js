import { useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice";

export const useNotifier = () => {
  const dispatch = useDispatch();
  return (toast) => dispatch(showToast(toast));
};
