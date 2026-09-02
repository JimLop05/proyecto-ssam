/*Ruta: backend-ssam/src/config/db.js
Propósito: Configura y exporta el cliente de conexión a PostgreSQL usando pg.Pool, y prueba la conexión al iniciar.*/

// ============================================================
// CONFIGURACIÓN DE CONEXIÓN A POSTGRESQL
// Este archivo crea un pool de conexiones a la base de datos
// y exporta el objeto 'pool' para usarlo en toda la aplicación.
// ============================================================

const { Pool } = require('pg');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear el pool de conexiones con las credenciales del .env
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// Probar la conexión al iniciar
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err.stack);
    } else {
        console.log('✅ Conectado a la base de datos PostgreSQL');
        release();
    }
});

module.exports = pool;