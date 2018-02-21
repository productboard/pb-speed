const fs = require('fs');
const path = require('path');
const { extname } = path;
const Koa = require('koa');
const app = (module.exports = new Koa());
const router = require('koa-router')();
const proxy = require('koa-proxy');
const superagent = require('superagent');
const render = require('./libs/render');
const stat = require('./libs/stat');

const PRODUCTION = process.env.NODE_ENV === 'production';

async function pipeToDev(ctx) {
  const result = await superagent('http://localhost:3000' + ctx.path);
  // console.log(ctx.path, result)
  return result;
}

function injectIndexMeta(html) {
  return html.replace('<body>', `<body><script>window.DATA = {data: 'meta'};</script>`);
}

async function index(ctx) {
  if (PRODUCTION) {
    const fpath = path.join(__dirname, '../frontend/build/index.html');
    ctx.type = 'html';
    ctx.body = fs.createReadStream(fpath);
  } else {
    const response = await pipeToDev(ctx);
    ctx.body = injectIndexMeta(response.text);
  }
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
  .get('/data', data)
  .post('/track', track);

async function dev(ctx) {
  const response = await pipeToDev(ctx);
  ctx.body = response.text;
  ctx.type = extname(ctx.path);
}

if (!PRODUCTION) {
  // router.get('*', dev);
  // router.get('*', proxy({
  //   url: 'http://localhost:3000'
  // }));
} else {
  // router.get('/static/*', jsBundle);
}

// app.use(router.routes());

app.use(proxy({
  url: 'http://localhost:3000',
  map: path => path,
}));

if (!module.parent) app.listen(process.env.PORT || 8080);
