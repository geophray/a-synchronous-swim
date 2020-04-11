const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

const randInput = () => {
  let options = ['left', 'right', 'up', 'down'];
  return options[Math.floor(Math.random() * options.length)];
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET'){
    let rand = randInput();
    console.log('rand: ', rand);
    const buf = Buffer.from(rand, 'utf8');
    console.log('buf: ', buf);
    console.log('string: ', buf.toString('utf8'));
    res.end(randInput());
  } else {
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
