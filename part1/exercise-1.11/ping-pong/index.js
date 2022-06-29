const http = require('http');
const fs = require('fs');
const path = require('path');

const directory = path.join('/', 'files');
const filePath = path.join(directory, 'text.txt');
let pongNum = 0;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>pong ${pongNum}</h1>`);
    fs.writeFile(filePath, pongNum.toString(), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(`${pongNum} was saved`);
    });
    pongNum += 1;
    res.end();
  }
});

server.listen(3000);
