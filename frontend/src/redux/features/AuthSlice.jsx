import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated : !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem("username") || null,
}


const AuthSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username; // Update username
            localStorage.setItem('token',  action.payload.token); //Save token in localStorage
            localStorage.setItem("username", action.payload.username); // Save username
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
            localStorage.removeItem('token'); //Clear token from local storage
            localStorage.removeItem("username");
        },
    },
});

export const { loginSuccess, logout } = AuthSlice.actions;

export default AuthSlice.reducer;