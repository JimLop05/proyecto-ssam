// Ruta: src/api/axios.js
// ============================================================
// CONFIGURACIÓN DE AXIOS
// Detecta automáticamente el host: funciona en localhost,
// en red local (celular) y en producción sin cambiar código.
// ============================================================

import axios from 'axios';

// window.location.hostname devuelve:
//   - "localhost"       → cuando abres desde tu PC
//   - "192.168.X.X"     → cuando abres desde el celular
// Usamos el mismo host pero puerto 5000 (backend)
const API_URL = `http://${window.location.hostname}:5000/api`;

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