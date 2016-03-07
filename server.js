'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ctrl = require('./controllers/mirror');

app.set('view engine', 'jade')

app.use(express.static('public'))

app.get('/', ctrl.index);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

