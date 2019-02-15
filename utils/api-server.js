const express = require('express');
const users = require('./api/users');

const app = express();

app.use('/api/users', users);

app.listen(3000, function() {
  console.log('server is listening on localhost:3000');
});
