import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage (if user already logged in)
const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
const statusFromStorage = !!userDataFromStorage;

const initialState = {
  status: statusFromStorage, // true if logged in
  userData: userDataFromStorage || null, // { id, email, role }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload; // { id, email, name }

      // Save to localStorage for persistence
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;

      // Clear localStorage
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
