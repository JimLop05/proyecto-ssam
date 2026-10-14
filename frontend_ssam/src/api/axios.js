// Ruta: src/api/axios.js
// ============================================================
// CONFIGURACIÓN DE AXIOS
// Usa VITE_API_URL en producción (Vercel) y detección dinámica
// en desarrollo (localhost o red local).
// ============================================================

import axios from 'axios';

// Si existe VITE_API_URL (producción en Vercel), se usa esa.
// Si no, se detecta el host dinámicamente (desarrollo local/celular).
const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : `http://${window.location.hostname}:5000/api`;

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