/*Ruta: backend-ssam/src/config/db.js
Propósito: Configura y exporta el cliente de conexión a PostgreSQL usando pg.Pool, y prueba la conexión al iniciar.*/

// ============================================================
// CONFIGURACIÓN DE CONEXIÓN A POSTGRESQL
// Este archivo crea un pool de conexiones a la base de datos
// y exporta el objeto 'pool' para usarlo en toda la aplicación.
// ============================================================

/* Ruta: backend-ssam/src/config/db.js
Propósito: Configura y exporta el pool de conexión a PostgreSQL usando pg.Pool.
Soporta tanto desarrollo local (variables DB_*) como producción (DATABASE_URL de Neon). */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Si existe DATABASE_URL (producción en Render/Neon), se usa esa.
// Si no, se usan las variables individuales (desarrollo local con Postgres).
const poolConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Requerido por Neon en Render
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
      };

const pool = new Pool(poolConfig);

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