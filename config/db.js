require('dotenv').config(); // Cargar variables de entorno

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Asegurar que coincida con el .env
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433, // Convertir a número
    allowExitOnIdle: true
});

// Verificar conexión
pool.connect()
    .then(() => console.log("✅ Conectado a la base de datos"))
    .catch(err => console.error("❌ Error de conexión a la base de datos", err));

module.exports = pool; // Exportar la conexión
