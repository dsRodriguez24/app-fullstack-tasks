// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    token: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isInitialized: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.user              = action.payload.user;
            state.token             = action.payload.token;
            state.isInitialized     = true;
        },
        logout: (state) => {
            state.user              = null;
            state.token             = null;
            state.isInitialized     = true;
            localStorage.setItem('refreshToken', 'false');
        },
        setInitialized: (state) => {
            state.isInitialized     = true;
        }
    },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;