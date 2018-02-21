const assert = require('assert');
const {
  pool,
  track,
  getRecord,
  getRecordsByAction,
  deleteAllRecords,
  getDurationsForAction,
  getMaxDurationForAction,
} = require('../db');

const TEST_ACTION = 'MOCHA_TEST';

const deleteAllTestLogs = async () => {
  const sql = 'DELETE FROM logs WHERE action = $1;';
  return pool.query(sql, [TEST_ACTION]);
};

describe('database layer', () => {
  afterEach(() => {
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

  describe('magic', () => {
    before(async () => {
      await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 888 });
      await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 1245 });
      await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 1466 });
      await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 2222 });
    });

    it('calculates max', async () => {
      const max = await getMaxDurationForAction(TEST_ACTION);
      assert.equal(max, 2222);
    });

    it('fetches actions', async () => {
      const result = await getDurationsForAction(TEST_ACTION);
      assert.deepEqual(result.find(row => row.label === 1), { label: 1, count: 3 });
    });
  });
});
