'use strict';
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var request = require('request');
var apicache = require('apicache').options({ debug: true }).middleware;
var weatherKey = process.env.WEATHER_KEY;
var newsKey = process.env.NEWS_KEY;
var weatherUrl = `https://api.forecast.io/forecast/${weatherKey}/36.1820800,-86.7278270`
var newsUrl = `http://api.nytimes.com/svc/topstories/v1/world.json?api-key=${newsKey}`;
var quoteUrl = 'http://quotes.rest/qod.json';

app.set('view engine', 'jade')
app.use(express.static('public'))
app.get('/');

app.get('/api/weather', apicache('10 minutes'), function (req, res) {
  request.get(weatherUrl, function (err, response, body){
    if (err) throw err;
    res.header('Access-Controll-Allow-Origin', '*');
    console.log("weatherUrl", weatherUrl);
    var weather = JSON.parse(body);
    res.send(weather)
  })
})

app.get('/api/news', apicache('1 hour'), function (req, res){
  request.get(newsUrl, function (err, response, body){
    if (err) throw err;
    var news = JSON.parse(body);
    console.log("news");
    res.send(news)
  })
})

app.get('/api/quote', apicache('12 hours'), function (req, res){
  request.get(quoteUrl, function (err, response, body){
    if (err) throw err;
    var quote = JSON.parse(body);
    console.log("quote",quote);
    res.send(quote)
  })
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});

