'use strict'
const moment = require('moment');
const request = require('request');

const now = moment(new Date());
const momentTime = now.format('LT');

const apikey = '6b33eb7b78a214401d2766c100aeae6a:5:74631439';
const newsUrl = `http://api.nytimes.com/svc/topstories/v1/home.json?api-key=${apikey}`;
const quotesUrl = 'http://quotes.rest/qod.json';
const weatherUrl = 'https://api.forecast.io/forecast/88eb88be23406cc2c563c798d72aa649/36.1820800,-86.7278270'

module.exports.index = (req, res) => {

  request.get(weatherUrl, (err, response, body) => {
    if (err) throw err;
    const weather = JSON.parse(body);
    console.log("weather",weather.daily.data[0].temperatureMin);

    request.get(quotesUrl, (err, response, body) => {
      if (err) throw (err);
      // const quotes = JSON.parse(body);
      // console.log("topquote", quotes.contents.quotes[0]);
      // const topQuote = quotes.contents.quotes[0];

      request.get(newsUrl, (err, response, body) => {
        if (err) throw err;
        const news = JSON.parse(body);
        console.log("news", news.results[0].title);

        res.render('index', {
          weather: weather,
          time: momentTime
        })
      })
    });
  })

    // const topQuote = quotes.contents.quotes[0];


  // });



  //   res.render('index', {
  //     time: momentTime
  //     // quote: topQuote
  //   })
  // });




};
