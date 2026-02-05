// features/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, setInitialized } from './authSlice';
import api from 'api/axios';

export const refreshSession = createAsyncThunk( 'auth/refresh', async (_, { dispatch }) => {
        try {
            const response                = await api.post('/refresh');
            const { access_token, user }  = response.data;

            dispatch( setCredentials({ user, token: access_token }) );
        } catch (error) {
            // Si falla (ej. cookie expirada), simplemente marcamos como inicializado
            dispatch( setInitialized() ); 
        }
    }
);