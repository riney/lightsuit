const Koa = require('koa');
const request = require('request');
const Router = require('koa-router');

const config = require('../conf/routerConfig.json');

const PORT = 8080;

const app = new Koa();
const router = new Router();

const putImagesOnBodyPart = (image, bodyPart) => {
  request(`http://${config['displays'][bodyPart]}/image/${image}`, (err, res, body) => {
    if (err) {
      console.log(`Error making request: ${err}`)
    } else {
      console.log(`From router: ${body}`);
    }
  });
};

router.get('/button/:id/:action', (ctx, next) => {
  var color;
  const id = ctx.params.id;
  if (id == 0) {
    putImagesOnBodyPart('IM_Head.png', 'head');
    putImagesOnBodyPart('IM_Chest.png', 'chest');
  } else if (id == 1) {
    putImagesOnBodyPart('IM_Head.png', 'head');
    putImagesOnBodyPart('IM_Chest.png', 'chest');
  } else {
    color = 'ff0000';
  }

  const displayUrl = config['displays']['test'];
  request(`${displayUrl}/fill/${color}`, (err, res, body) => {
    if (err) {
      console.log(`Error making request: ${err}`)
    } else {
      console.log(`From display: ${body}`);
    }
  });

  ctx.body = `Got button ${ctx.params.id} action: ${ctx.params.action}`
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`Lightsuit router started on port ${PORT}`);
