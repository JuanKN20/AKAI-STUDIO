
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'AkaistudioDB',
  password: 'tu_contraseña',
  port: 5432,
});

module.exports = pool;
