'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', '$window', '$interval', function($scope, $http,$location, $routeParams, $q, $window, $interval){

  const now = moment(new Date());

  $scope.date = moment().format('MMMM Do YYYY')

  function updateTime() {
    var nIntervId = setInterval(flashTime, 1000*2);
  }

  function flashTime() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var time = h + ' : ' + m;
    $('#my_box1').html(time);
  }

  $(function() {
    updateTime();
  });

  function quoteApi () {
    $http.get('/api/quote').success((response) => {
      console.log("quote response", response);
      $scope.quote = response.contents.quotes[0].quote;
      $scope.author = response.contents.quotes[0].author;
    });
  }
quoteApi()
  function updateQuote() {
    var quoteInterval = setInterval(quoteApi, 10800000); //three hours
    console.log("quote updated");
  }

   $(function() {
      updateQuote();
    });

  function newsApi () {
    $http.get('/api/news').success((response) => {
      $scope.news = response.results;
    });
  }
newsApi()
  function updateNews() {
    var newsInterval = setInterval(quoteApi, 10800000); //three hours
    console.log("news updated");
  }
  $(function() {
    updateNews();
  });

  function weatherApi () {
    $http.get('/api/weather').success((response) => {
      $scope.weather = response.currently;
      $scope.temperature = parseInt(response.currently.temperature)
      $scope.fiveDay = response.daily.data
    });
  }
weatherApi()
  function updateWeather () {
    var interval = setInterval(weatherApi, 60000*2); //2 minutes
    console.log("weather updated");
  }

  $(function() {
    updateWeather();
  });

  const d = new Date();
  const weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  $scope.new = weekday[d.getDay()];

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  $scope.newdate = month + " " + day + ' , ' + year ;



}]);
