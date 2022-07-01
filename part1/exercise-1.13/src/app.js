const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('/', 'files'));
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

const removeFile = async () => new Promise((res) => fs.unlink(filePath, (err) => res()));

setInterval(async () => await removeFile(), 1000 * 60 * 60 * 24);

const todos = ['todo1', 'todo2'];

app.get('/', function (req, res) {
  findAFile();
  setTimeout(async () => {
    res.render('index', { todos: todos });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
