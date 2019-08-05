var Koa = require('koa');
var Router = require('koa-router');

const PORT = 8080;

var app = new Koa();
var router = new Router();

router.get('/button/:id/:action', (ctx, next) => {
  ctx.body = `Got button ${ctx.params.id} action: ${ctx.params.action}` 
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`Lightsuit router started on port ${PORT}`);
