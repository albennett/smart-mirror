'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const request = require('request');
const weatherUrl = 'https://api.forecast.io/forecast/88eb88be23406cc2c563c798d72aa649/36.1820800,-86.7278270'
const googleMapsUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=700+Wilsonwood+Pl.+Nashville,+TN+37206&destinations=500+Interstate+Blvd+S,+Nashville,+TN+37210&mode=driving&language=en&key=AIzaSyBWxxUFMPhxC64LOxG-G_mD-oc0siASEY8'

app.set('view engine', 'jade')
// app.setHeader('Access-Control-Allow-Origin', '*');

app.use(express.static('public'))

app.get('/');

app.get('/api/weather', (req, res) => {
  request.get(weatherUrl, (err, response, body) => {
    if (err) throw err;
    res.header('Access-Controll-Allow-Origin', '*');
    const weather = JSON.parse(body);
    console.log("weather",weather);
    res.send(weather)

  })
})

app.get('/api/maps', (req, res) => {
  request.get(googleMapsUrl, (err, response, body) => {
    if (err) throw err;
    res.header('Access-Controll-Allow-Origin', '*');
    const map = JSON.parse(body);
    console.log("map",map);
    res.send(map)

  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

