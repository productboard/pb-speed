const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({ connectionString: config.DATABASE_URL });

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
