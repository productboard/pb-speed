const app = require('./server');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Hello World', function() {
  after(function() {
    server.close();
  });

  it('should serve SPA', function(done) {
    request
      .get('/')
      .expect(200)
      .expect('<html />', done);
  });
});
