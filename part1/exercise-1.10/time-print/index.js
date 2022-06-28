const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const directory = path.join('/', 'files');
const filePath = path.join(directory, 'text.txt');

const getTimeStamp = async () =>
  new Promise((res) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) return console.log('FAILED TO READ FILE', '----------------', err);
      res(buffer.toString('utf8'));
    });
  });

const server = http.createServer(async (req, res) => {
  const url = req.url;
  if (url === '/') {
    const randomString = crypto.randomBytes(20).toString('hex');
    const timeStamp = await getTimeStamp();
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>Current time stamp: ${timeStamp}</h1>`);
    res.write(`<h1>Random string: ${randomString}</h1>`);
    res.end();
  }
});

server.listen(3000);
