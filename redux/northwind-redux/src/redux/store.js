import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './reducer/categorySlice';

export default configureStore({
    reducer: {
        category: categoryReducer
    },
});