// src/api/axios.ts
import axios from 'axios';
import { store } from '../store/store';
import { setCredentials, logout } from '../store/authSlice';

const baseURL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Interceptor de Petición: Añade el Bearer Token desde Redux
api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de Respuesta: Maneja el Refresh automático
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si recibimos 401 y no hemos reintentado ya esta petición
        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            // Intentamos el refresh
            const res       = await axios.post(`${baseURL}refresh`, {}, { withCredentials: true });
            const newToken  = res.data.access_token;

            // Actualizamos el store de Redux
            store.dispatch(setCredentials({ user: res.data.user, token: newToken }));

            // Reintentamos la petición original con el nuevo token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            // Si el refresh falla, la cookie ya no es válida -> Logout total
            store.dispatch(logout());
            return Promise.reject(refreshError);
        }
        }
        return Promise.reject(error);
    }
);
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Llamamos a la ruta de Laravel que creamos
//                 const response = await axios.post(`${baseURL}refresh`, {}, { withCredentials: true });
//                 const { access_token, user } = response.data;

//                 // Actualizamos Redux
//                 store.dispatch( setCredentials( { user, token: access_token } ) );

//                 // Reintentamos la petición original con el nuevo token
//                 originalRequest.headers.Authorization   = `Bearer ${access_token}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 store.dispatch(logout());
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default api;