import {createSlice} from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        currentCategory: {}
    },
    reducers: {
        changesCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        getCategory: (state) => {
            return state.currentCategory;
        }
    },
});

export const {changesCategory, getCategory} = categorySlice.actions;

export default categorySlice.reducer;