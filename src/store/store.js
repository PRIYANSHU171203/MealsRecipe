import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealsReducer from './mealSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer
    },
});

export default store;
