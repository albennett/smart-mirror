'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const request = require('request');
var apicache = require('apicache').options({ debug: true }).middleware;
const weatherKey = process.env.WEATHER_KEY;
const newsKey = process.env.NEWS_KEY;
const weatherUrl = `https://api.forecast.io/forecast/${weatherKey}/36.1820800,-86.7278270`
const newsUrl = `http://api.nytimes.com/svc/topstories/v1/world.json?api-key=${newsKey}`;
const quoteUrl = 'http://quotes.rest/qod.json';

app.set('view engine', 'jade')
app.use(express.static('public'))
app.get('/');

app.get('/api/weather', apicache('10 minutes'), (req, res) => {
  request.get(weatherUrl, (err, response, body) => {
    if (err) throw err;
    res.header('Access-Controll-Allow-Origin', '*');
    const weather = JSON.parse(body);
    res.send(weather)
  })
})

app.get('/api/news', apicache('1 hour'), (req, res) => {
  request.get(newsUrl, (err, response, body) => {
    if (err) throw err;
    const news = JSON.parse(body);
    console.log("news");
    res.send(news)
  })
})

app.get('/api/quote', apicache('12 hours'), (req, res) => {
  request.get(quoteUrl, (err, response, body) => {
    if (err) throw err;
    const quote = JSON.parse(body);
    console.log("quote",quote);
    res.send(quote)
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

