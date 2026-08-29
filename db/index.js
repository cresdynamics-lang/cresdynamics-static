const { Pool } = require('pg');

let pool;
let dbAvailable = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    pool = new Pool({ connectionString, connectionTimeoutMillis: 5000, idleTimeoutMillis: 10000 });
    pool.on('error', (err) => {
      console.error('DB pool error:', err.message);
    });
  }
  return pool;
}

async function isAvailable() {
  if (dbAvailable !== null) return dbAvailable;
  try {
    await getPool().query('SELECT 1');
    dbAvailable = true;
  } catch {
    dbAvailable = false;
    console.warn('Database not available. Forms and blog will not work without PostgreSQL.');
  }
  return dbAvailable;
}

async function query(text, params) {
  const client = await getPool().connect();
  try {
    return await client.query(text, params);
  } catch (err) {
    throw err;
  } finally {
    try { client.release(); } catch(_) {}
  }
}

async function queryOne(text, params) {
  try {
    const result = await query(text, params);
    return result.rows[0] || null;
  } catch (err) {
    console.error('DB queryOne error:', err.message);
    return null;
  }
}

async function queryMany(text, params) {
  try {
    const result = await query(text, params);
    return result.rows;
  } catch (err) {
    console.error('DB queryMany error:', err.message);
    return [];
  }
}

module.exports = { getPool, isAvailable, query, queryOne, queryMany };
