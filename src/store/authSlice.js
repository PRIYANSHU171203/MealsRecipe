import { createSlice } from "@reduxjs/toolkit";
import { safeStorage } from "../utils/safeStorage";

let userDataFromStorage = null;
let statusFromStorage = false;

try {
  userDataFromStorage = JSON.parse(safeStorage.getItem("userData"));
  statusFromStorage = !!userDataFromStorage;
} catch (err) {
  console.warn("Could not read userData from localStorage:", err);
}

const initialState = {
  status: statusFromStorage,
  userData: userDataFromStorage || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      safeStorage.setItem("userData", JSON.stringify(action.payload));
      
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      safeStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
