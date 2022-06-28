const fs = require('fs');
const path = require('path');

const directory = path.join('/', 'files');
const filePath = path.join(directory, 'text.txt');

const updateTimeStamp = () => {
  const timeStamp = new Date().toLocaleString();
  fs.writeFile(filePath, timeStamp, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`${timeStamp} was saved`);
  });
};

setInterval(updateTimeStamp, 5000);
