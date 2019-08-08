const hexRGB = require('hex-rgb');
const Koa = require('koa');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const Router = require('koa-router');

const PORT = 8080;

const app = new Koa();
const router = new Router();
const matrix = new LedMatrix(32, 64);
matrix.clear();

router.get('/fill/:hexColor', (ctx, next) => {
  console.log(`Received fill command, hexColor: ${ctx.params.hexColor}`);
  const {red, green, blue} = hexRGB(ctx.params.hexColor);
  console.log(`Filling with ${red} ${green} ${blue}`)
  matrix.fill(red, green, blue);
  console.log('Updating');
  matrix.update();
  console.log('Updated display');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`Lightsuit display server started on port ${PORT}`);
