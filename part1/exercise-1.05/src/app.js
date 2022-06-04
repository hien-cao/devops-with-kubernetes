const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Exercise todo v0.3');
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
