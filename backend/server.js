const fs = require('fs');
const path = require('path');
const { extname } = path;
const Koa = require('koa');
const app = (module.exports = new Koa());
const router = require('koa-router')();
const render = require('./libs/render');
const stat = require('./libs/stat');

async function index(ctx) {
  const fpath = path.join(__dirname, '../frontend/build/index.html');
  ctx.type = 'html';
  ctx.body = fs.createReadStream(fpath);
}

async function jsBundle(ctx) {
  const fpath = path.join(__dirname, '../frontend/build', ctx.path);
  const fstat = await stat(fpath);
  if (fstat.isFile()) {
    ctx.type = extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
}

async function track(ctx) {
  ctx.status = 201;
  ctx.body = {ok: true};
}

async function data(ctx) {
  ctx.status = 200;
  ctx.body = {
    data: [
      {id :1, value: 2, time: 123456789}
    ]
  }
}

app.use(render);

router
  .get('/', index)
  .get('/static/*', jsBundle)
  .get('/data', data)
  .post('/track', track);

app.use(router.routes());

if (!module.parent) app.listen(3000);
