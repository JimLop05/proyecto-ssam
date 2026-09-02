// Ruta: src/api/axios.js
// ============================================================
// CONFIGURACIÓN DE AXIOS
// Centraliza las peticiones al backend con el token JWT
// ============================================================

import axios from 'axios';

// URL base de tu backend (cambia si despliegas en otro puerto)
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor: si hay un token, lo agrega automáticamente a los headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;