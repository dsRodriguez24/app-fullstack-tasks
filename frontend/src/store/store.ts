// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        auth: authReducer,
    },
});

// Tipos necesarios para TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Inferir los tipos `RootState` y `AppDispatch` del propio store
// 1. Extraemos el tipo de los estados
export type RootState = ReturnType<typeof store.getState>;

// 2. Extraemos el tipo del dispatch del PROPIO store (esto incluye Thunks)
export type AppDispatch = typeof store.dispatch;