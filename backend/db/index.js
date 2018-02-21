const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({ connectionString: config.DATABASE_URL });

const track = async ({ userId, spaceId, action, duration }) => {
  const sql =
    'INSERT INTO logs(user_id, space_id, action, duration) VALUES($1, $2, $3, $4) RETURNING *';
  return pool
    .query(sql, [userId, spaceId, action, duration])
    .then(res => res.rows[0].id);
};

const getRecord = async uuid => {
  const sql = 'SELECT * FROM logs WHERE id = $1';
  return pool.query(sql, [uuid]).then(res => res.rows[0]);
};

const getRecordsByAction = async action => {
  const sql = 'SELECT * FROM logs WHERE action = $1';
  return pool.query(sql, [action]).then(res => res.rows);
};

module.exports = {
  pool,
  track,
  getRecord,
  getRecordsByAction,
};
