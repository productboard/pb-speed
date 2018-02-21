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

const getAllActions = async () => {
  const sql = 'SELECT DISTINCT action from logs;';
  return pool.query(sql).then(res => res.rows.map(row => row.action));
};

const getAllSpaces = async () => {
  const sql = 'SELECT DISTINCT space_id from logs;';
  return pool.query(sql).then(res => res.rows.map(row => ({ id: row.space_id })));
};

const getMaxDurationForAction = async action => {
  const sql = 'SELECT max(duration) FROM logs WHERE action = $1';
  return pool.query(sql, [action]).then(res => res.rows[0].max);
};
const getGroupedDurations = async (action, spaceId) => {
  const spaceIdCondition = spaceId ? 'AND space_id = $2' : '';
  const sql = `
    SELECT
      count(id), round(duration, -3) AS rounded_duration
    FROM logs
    WHERE action = $1 ${spaceIdCondition} GROUP BY rounded_duration
  `;

  const params = spaceId ? [action, spaceId] : [action];

  return pool.query(sql, params).then(res =>
    res.rows.map(row => ({
      duration: parseInt(row.rounded_duration) / 1000,
      count: parseInt(row.count),
    })),
  );
};

const getGroupedDurationsByDate = async (action, spaceId) => {
  const spaceIdCondition = spaceId ? 'AND space_id = $2' : '';
  const sql = `
    SELECT
      --count(id),
      percentile_cont(0.5) within group ( order by duration ) AS median,
      percentile_cont(0.9) within group ( order by duration ) AS p90,
      percentile_cont(0.95) within group ( order by duration ) AS p95,
      to_char(date(created_at), 'YYYY-MM-DD') AS date
    FROM logs
    WHERE action = $1 ${spaceIdCondition} GROUP BY date
  `;

  const params = spaceId ? [action, spaceId] : [action];
  return pool.query(sql, params).then(res => res.rows);
};

module.exports = {
  pool,
  track,
  getRecord,
  getRecordsByAction,
  getGroupedDurations,
  getMaxDurationForAction,
  getAllActions,
  getAllSpaces,
  getGroupedDurationsByDate,
};
