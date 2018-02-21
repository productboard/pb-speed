const assert = require('assert');
const {
  pool,
  track,
  getRecord,
  getRecordsByAction,
  deleteAllRecords,
  getGroupedDurations,
  getMaxDurationForAction,
  getAllActions,
  getAllSpaces,
} = require('../db');

const TEST_ACTION = 'MOCHA_TEST';

describe('database layer', () => {
  beforeEach(async () => {
    await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 888 });
    await track({ userId: 1, spaceId: 1, action: TEST_ACTION, duration: 1245 });
    await track({ userId: 1, spaceId: 2, action: TEST_ACTION, duration: 1466 });
    await track({ userId: 1, spaceId: 2, action: TEST_ACTION, duration: 2222 });
  });

  afterEach(() => {
    deleteAllTestLogs();
  });

  it('returns all action names', async () => {
    const actions = await getAllActions();
    assert.deepEqual(actions, [TEST_ACTION]);
  });

  it('returns all spaces', async () => {
    const actions = await getAllSpaces();
    assert.deepEqual(actions, [{ id: 1 }, { id: 2 }]);
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

  it('calculates max', async () => {
    const max = await getMaxDurationForAction(TEST_ACTION);
    assert.equal(max, 2222);
  });

  it('groupes durations for action', async () => {
    const result = await getGroupedDurations(TEST_ACTION);
    assert.deepEqual(result.find(row => row.duration === 1), {
      duration: 1,
      count: 3,
    });
  });

  it('groupes durations for action and spaceId', async () => {
    const result = await getGroupedDurations(TEST_ACTION, 2);
    assert.deepEqual(result.find(row => row.duration === 1), {
      duration: 1,
      count: 1,
    });
  });
});
