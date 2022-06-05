const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    const randomString = crypto.randomBytes(20).toString('hex');
    const timeStamp = new Date().getTime();
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>Current time stamp: ${timeStamp}</h1>`);
    res.write(`<h1>Random string: ${randomString}</h1>`);
    res.end();
  }
});

server.listen(3000);
