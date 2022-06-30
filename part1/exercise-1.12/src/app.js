const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const directory = path.join('/', 'files');
const filePath = path.join(directory, 'image.jpg');

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const findAFile = async () => {
  if (await fileAlreadyExists()) return;
  await new Promise((res) => fs.mkdir(directory, (err) => res()));
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(filePath));
};

const getFile = async () =>
  new Promise((res) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) return console.log('FAILED TO READ FILE', '----------------', err);
      res(buffer);
    });
  });

const removeFile = async () => new Promise((res) => fs.unlink(filePath, (err) => res()));

setInterval(async () => await removeFile(), 1000 * 60 * 60 * 24);

app.get('/', async (req, res) => {
  findAFile();
  setTimeout(async () => {
    const image = await getFile();
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(image);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
