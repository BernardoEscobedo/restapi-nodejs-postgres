import 'dotenv/config';
import pg from 'pg';

const { Pool, Client } = pg;

// Configuración para Render (usa las variables del entorno y conexión SSL)
const db = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false, // IMPORTANTE para Render
    },
    allowExitOnIdle: true,
});

// Verifica la conexión
try {
    await db.query('SELECT NOW()');
    console.log('✅ Conexión exitosa a PostgreSQL');
} catch (error) {
    console.error('❌ Error en la conexión a la BD:', error);
}

// Client (opcional, si realmente lo usas en otro lado)
const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});

export { db, client };