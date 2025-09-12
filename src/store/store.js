import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealsReducer from './mealSlice';

const preloadedState = JSON.parse(localStorage.getItem("reduxState")) || {};

const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer
    },
    preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});


export default store;
