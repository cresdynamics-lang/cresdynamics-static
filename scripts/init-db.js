require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function init() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('Database initialized successfully.');
  await pool.end();
}

init().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
