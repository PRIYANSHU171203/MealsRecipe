import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealsReducer from './mealSlice';
import { safeStorage } from '../utils/safeStorage';

let preloadedState = {};
try {
  preloadedState = JSON.parse(safeStorage.getItem("reduxState")) || {};
} catch (err) {
  console.warn("Could not load reduxState from localStorage:", err);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer
    },
    preloadedState,
});

store.subscribe(() => {
  try {
    safeStorage.setItem("reduxState", JSON.stringify(store.getState()));
  } catch (err) {
    console.warn("Could not save reduxState to localStorage:", err);
  }
});


export default store;
