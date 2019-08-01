const http = require('http');
const url = require('url');

const PORT = 8080;

const router = http.createServer( (req, res) => {
  const uri = url.parse(req.url);
  console.log(`Got request for ${uri.pathname}`);
  res.statusCode = 200;
  res.write(`${uri.pathname} OK`);
  res.end();
});

router.listen(PORT);

console.log(`Lightsuit router started on port ${PORT}`);
