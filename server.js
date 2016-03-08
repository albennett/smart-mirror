'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade')
// app.setHeader('Access-Control-Allow-Origin', '*');

app.use(express.static('public'))

app.get('/');


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

