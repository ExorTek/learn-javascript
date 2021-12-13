import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/counterSlice';
import authReducer from '../redux/auth';

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
});