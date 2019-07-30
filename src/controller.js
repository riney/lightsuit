const { promisify } = require('util')
const { openStreamDeck, listStreamDecks } = require('elgato-stream-deck')
const request = require('request');

const DECK_WIDTH = 5;
const DECK_HEIGHT = 3;
const DECK_REZ = 72;
const SERVER_URL = process.env.SERVER_URL;

if (!SERVER_URL) {
  console.log('ERROR: No server url specified. Set SERVER_URL in the environment.');
  process.exit(1);
}

if (listStreamDecks().length == 0) {
  console.log('ERROR: No StreamDeck devices detected.');
  process.exit(1);
}

const deck = openStreamDeck();

/* Show signs of life */
for(const k of Array(DECK_WIDTH * DECK_HEIGHT).keys()) {
  deck.fillColor(k, 0, !(k % 2) ? 255 : 0, (k % 2) ? 255 : 0)
}

deck.on('down', keyIndex => {
  request(`http://${SERVER_URL}/${keyIndex}/down`, (err, res, body) => {
    if (err) {
      console.log(`Error making request: ${err}`)
    } else {
      console.log(`From server: ${body}`);
    }
  });
});

console.log(`Lightsuit controller started.`);
console.log(`Server URL is ${SERVER_URL}`);
