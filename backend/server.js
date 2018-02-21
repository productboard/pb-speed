const Koa = require('koa');
const app = (module.exports = new Koa());
const router = require('koa-router')();
const render = require('./libs/render');

async function index(ctx) {
  await ctx.render('index');
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

app.use(router.routes());

if (!module.parent) app.listen(3000);
