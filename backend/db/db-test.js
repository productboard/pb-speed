const assert = require('assert');
const {
  pool,
  track,
  getRecord,
  getRecordsByAction,
  deleteAllRecords,
} = require('../db');

const TEST_ACTION = 'MOCHA_TEST';

const deleteAllTestLogs = async () => {
  const sql = 'DELETE FROM logs WHERE action = $1;';
  return pool.query(sql, [TEST_ACTION]);
};

describe('database layer', () => {
  after(() => {
    deleteAllTestLogs();
  });

  it('stores and fetches stuff', async () => {
    const duration = Math.floor(Math.random() * 1000);

    const id = await track({
      userId: 1,
      spaceId: 1,
      action: TEST_ACTION,
      duration,
    });

    const row = await getRecord(id);

    assert.equal(row.duration, duration);
  });
});
