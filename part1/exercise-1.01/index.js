const crypto = require('crypto');

const randomString = crypto.randomBytes(20).toString('hex');

setInterval(() => console.log(randomString), 5000);
