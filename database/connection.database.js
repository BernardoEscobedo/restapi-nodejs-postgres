import 'dotenv/config';
import pg from 'pg';

const { Pool, Client } = pg;

// Conexión usando Pool (recomendado para múltiples queries concurrentes)
const db = new Pool({
    allowExitOnIdle: true,
});

try {
    await db.query('SELECT NOW()');
    console.log('Conexion al 100');
} catch (error) {
    console.log(error)
}
// Conexión usando Client (ideal para tareas puntuales)
const client = new Client();

export { db, client };