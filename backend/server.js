const fs = require('fs');
const path = require('path');
const { extname } = path;
const Koa = require('koa');
const koaBody = require('koa-body');
const app = (module.exports = new Koa());
const router = require('koa-router')();
const render = require('./libs/render');
const stat = require('./libs/stat');

const { getGroupedDurations, track } = require('./db');

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

async function handleTrack(ctx) {
  const { userId, spaceId, action, duration } = ctx.request.body;
  const result = await track({ userId, spaceId, action, duration });
  ctx.status = 201;
  ctx.body = { ok: true };
}

async function data(ctx) {
  const { action, spaceId } = ctx.request.body;
  const data = await getGroupedDurations(action, spaceId);
  ctx.status = 200;
  ctx.body = { data };
}

app.use(koaBody());
app.use(render);

router
  .get('/', index)
  .get('/static/*', jsBundle)
  .get('/data', data)
  .post('/track', handleTrack);

app.use(router.routes());

if (!module.parent) app.listen(process.env.PORT || 3000);
