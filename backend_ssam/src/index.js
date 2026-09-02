/*Ruta: backend-ssam/src/index.js
Propósito: Punto de entrada principal del servidor. Configura Express, los middlewares globales y define las rutas de prueba iniciales.*/

// ============================================================
// PUNTO DE ENTRADA DEL BACKEND (SERVIDOR)
// Configura Express, middlewares, rutas base y arranca el servidor
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // <-- NUEVO
// Prueba Inicial... (después de las otras importaciones)
const estudianteRoutes = require('./routes/estudianteRoutes');
const configRoutes = require('./routes/configRoutes');
// Importar rutas de clases
const claseRoutes = require('./routes/claseRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================== MIDDLEWARES ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Prueba... (después de app.use('/api/auth', authRoutes))
app.use('/api/estudiantes', estudianteRoutes);
// Para pantalla principal de la pagina
app.use('/api/config', configRoutes);

// ================== RUTAS ====================================
app.get('/api/test', (req, res) => {
    res.json({ message: '🚀 Backend funcionando correctamente' });
});

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as hora_actual');
        res.json({ success: true, hora_servidor: result.rows[0].hora_actual });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ================== RUTAS DE AUTENTICACIÓN ===================
app.use('/api/auth', authRoutes); // <-- NUEVO

// Agregar después de las otras rutas (authRoutes, etc.)
app.use('/api/clases', claseRoutes);

// ================== INICIAR SERVIDOR =========================
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 Ruta de prueba: http://localhost:${PORT}/api/test`);
    console.log(`📡 Ruta BD: http://localhost:${PORT}/api/test-db`);
    console.log(`🔐 Ruta de registro: http://localhost:${PORT}/api/auth/register`);
    console.log(`🔐 Ruta de login: http://localhost:${PORT}/api/auth/login`);
});