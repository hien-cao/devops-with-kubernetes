const http = require('http');
let pongNum = 0;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>pong ${pongNum}</h1>`);
    pongNum += 1;
    res.end();
  }
});

server.listen(3000);
