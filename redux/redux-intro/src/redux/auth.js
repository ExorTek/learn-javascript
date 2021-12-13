import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
    name: 'auth',
    initialState: {
        user: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = false;
        }
    },
});

export const { login, logout } = auth.actions;

export default auth.reducer;