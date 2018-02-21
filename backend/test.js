const app = require('./server');
const server = app.listen();
const request = require('supertest').agent(server);
const { deleteAllTestLogs } = require('./libs/test');

const TEST_ACTION = 'MOCHA_TEST';

describe('PB 5p33d', () => {
  after(() => {
    server.close();
    deleteAllTestLogs();
  });

  it('should serve SPA', done => {
    request
      .get('/')
      .expect(200)
      .expect(res => {
        if (!res.text.includes('<html')) throw new Error('No <html> returned');
        if (!res.text.includes('<html')) throw new Error('No <body> returned');
      })
      .end(done);
  });

  // it('should serve SPA javascript bundle', done => {
  //   request
  //     .get('/static/js/main.60e3476d.js')
  //     .expect(200)
  //     .expect(res => {
  //       if (!res.text.includes('!function('))
  //         throw new Error('App JS bundle not served');
  //     })
  //     .end(done);
  // });

  it('should save tracked data', done => {
    request
      .post('/track')
      .set('Content-Type', 'application/json')
      .send({ userId: 123, spaceId: 1, action: TEST_ACTION, duration: 999 })
      .expect(201)
      .expect({ ok: true }, done);
  });

  it('should serve graph data', done => {
    request
      .get(`/data?action=${TEST_ACTION}`)
      .expect(200)
      .expect({ data: [
          { count: 1, duration: 1 }
        ]
      }, done);
  });

  it('should serve metadata', done => {
    request
      .get('/metadata')
      .expect(200)
      .expect(
        { actions: [TEST_ACTION], spaces: [{ id: 1 }] },
        done,
      );
  });

  it('should reject non-existing routes', done => {
    request.get('/trolo').expect(404, done);
  });
});
