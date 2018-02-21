const {
  pool,
} = require('../db');

const TEST_ACTION = 'MOCHA_TEST';

const deleteAllTestLogs = async () => {
  const sql = 'DELETE FROM logs WHERE action = $1;';
  return pool.query(sql, [TEST_ACTION]);
};

module.exports.deleteAllTestLogs = deleteAllTestLogs;
