const app = require('./server');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Hello World', () => {
  after(() => {
    server.close();
  });

  it('should serve SPA', done => {
    request
      .get('/')
      .expect(200)
      .expect('<html />', done);
  });

  it('should serve graph data', done => {
    request
      .get('/data')
      .expect(200)
      .expect({data: [{id: 1, value: 2, time: 123456789}]}, done);
  });

  it('should save tracked data', done => {
    request
      .post('/track')
      .expect(201)
      .expect({ok: true}, done);
  });

  it('should reject non-existing routes', done => {
    request
      .get('/trolo')
      .expect(404, done);
  });
});
