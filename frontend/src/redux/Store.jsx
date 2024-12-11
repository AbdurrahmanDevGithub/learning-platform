import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/AuthSlice';

const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default Store;