const app = require('./server');
const server = app.listen();
const request = require('supertest').agent(server);

describe('PB 5p33d', () => {
  after(() => {
    server.close();
  });

  it('should serve SPA', done => {
    request
      .get('/')
      .expect(200)
      .expect(res => {
        if (!res.text.includes('<html'))
          throw new Error('No <html> returned');
        if (!res.text.includes('<html'))
          throw new Error('No <body> returned');
      })
      .end(done);
  });

  it('should serve SPA javascript bundle', done => {
    request
      .get('/static/js/main.60e3476d.js')
      .expect(200)
      .expect(res => {
        if (!res.text.includes('!function('))
          throw new Error('App JS bundle not served');
      })
      .end(done);
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
