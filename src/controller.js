const { promisify } = require('util')
const { openStreamDeck, listStreamDecks } = require('elgato-stream-deck')
const request = require('request');

const DECK_WIDTH = 5;
const DECK_HEIGHT = 3;
const DECK_REZ = 72;
const ROUTER_URL = process.env.ROUTER_URL;

if (!ROUTER_URL) {
  console.log('ERROR: No router url specified. Set ROUTER_URL in the environment.');
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

const handleKeyEvent = (keyIndex, direction) => {
  request(`http://${ROUTER_URL}/${keyIndex}/${direction}`, (err, res, body) => {
    if (err) {
      console.log(`Error making request: ${err}`)
    } else {
      console.log(`From router: ${body}`);
    }
  });
};

deck.on('down', keyIndex => { handleKeyEvent(keyIndex, 'down') });
deck.on('up', keyIndex => { handleKeyEvent(keyIndex, 'up') });

console.log(`Lightsuit controller started.`);
console.log(`Router URL is ${ROUTER_URL}`);
