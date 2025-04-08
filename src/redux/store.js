// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    toasts: toastReducer,
  },
});
