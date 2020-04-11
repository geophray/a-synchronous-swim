const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////
const messagesQueue = require('./messageQueue');
let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

// module.exports.initialize(messages);

// const randInput = () => {
//   let options = ['left', 'right', 'up', 'down'];
//   return options[Math.floor(Math.random() * options.length)];
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(404, headers);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === 'GET'){
    if (req.url === '/'){
      res.writeHead(200, headers);
      res.end(messagesQueue.dequeue());
    } else if (req.url === '/background.jpg'){
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
        next();
      })
    }
  }
};
