const { exec } = require("child_process");
const hexRGB = require('hex-rgb');
const Koa = require('koa');
//const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const Router = require('koa-router');

const PORT = 8080;
const IMAGE_COMMAND = '/home/pi/lightsuit/scripts/draw_image.sh'
// I am a terrible person
const KILL_COMMAND = 'pkill -f led-image-viewer'

const app = new Koa();
const router = new Router();
// const matrix = new LedMatrix(32, 64);
// matrix.clear();

// router.get('/fill/:hexColor', (ctx, next) => {
//   console.log(`Received fill command, hexColor: ${ctx.params.hexColor}`);
//   const {red, green, blue} = hexRGB(ctx.params.hexColor);
//   console.log(`Filling with ${red} ${green} ${blue}`)
//   matrix.fill(red, green, blue);
//   console.log('Updating');
//   matrix.update();
//   console.log('Updated display');
// });

router.get('/image/:name', (ctx, next) => {
  console.log(`Received image command, name: ${ctx.params.name}`);
  console.log(`Executing image command`)
  exec(KILL_COMMAND, (err, stdout, stderr) => {
    console.log(`error killing viewer: ${error.message}`);
    return;
  });
  
  exec(IMAGE_COMMAND + ' ' + ctx.params.name + ' &', (err, stdout, stderr) => {
    if (error) {
      console.log(`error running viewer: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`Lightsuit display server started on port ${PORT}`);
