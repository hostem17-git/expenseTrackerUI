// redux/toastSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (toast) => ({
        payload: {
          id: uuidv4(),
          ...toast,
        },
      }),
    },
    dismissToast: (state, action) =>
      state.filter((toast) => toast.id !== action.payload),
  },
});

export const { showToast, dismissToast } = toastSlice.actions;
export default toastSlice.reducer;
