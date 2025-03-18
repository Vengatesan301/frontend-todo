import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || null;
const storedUser = localStorage.getItem("user");


const initialUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: initialToken,
        user: initialUser,
        isAuthenticated: !!initialToken,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
