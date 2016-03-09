'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', '$window', 'CalendarService', function($scope, $http,$location, $routeParams, $q, $window, CalendarService){
  console.log('Mirror Controller Initialized...');

  const now = moment(new Date());
  const apikey = '6b33eb7b78a214401d2766c100aeae6a:5:74631439';
  const newsUrl = `http://api.nytimes.com/svc/topstories/v1/home.json?api-key=${apikey}`;
  const quotesUrl = 'http://quotes.rest/qod.json';
  const googleKey = 'AIzaSyBWxxUFMPhxC64LOxG-G_mD-oc0siASEY8'

  $scope.time = now.format('LT');
  $scope.date = moment().format('MMMM Do YYYY')

  const calendarApi = () => {
    CalendarService.checkAuth()
  }

   $scope.handleAuth = (event) => {
    CalendarService.handleAuthClick(event)
  }

  const quoteApi = () => {
    var deferred = $q.defer();

    $http.get(quotesUrl)
    .then(function (quote) {
      console.log("data", quote.data.contents.quotes[0]);
      deferred.resolve(quote);
      $scope.quote = quote.data.contents.quotes[0].quote
      $scope.author = quote.data.contents.quotes[0].author
    })

    .catch(function () {
      deferred.reject();
    });

    // return promise object
    return deferred.promise;
  }
quoteApi();

$scope.map = { center: { latitude: 36.174465, longitude: -86.767960 }, zoom: 8 };

  const newsApi = () => {
      var deferred = $q.defer();

      $http.get(newsUrl)
      .then(function (news) {
        console.log("news", news)
        deferred.resolve(news);
        $scope.news = news.data.results;
      })
      .catch(function () {
        deferred.reject();
      });

      // return promise object
      return deferred.promise;
    }
  newsApi();

  const weatherApi = () => {
    $http.get('/api/weather').success((response) => {
      $scope.weather = response.currently;
      $scope.temperature = parseInt(response.currently.temperature)
      $scope.fiveDay = response.daily.data
      console.log("fi", $scope.fiveDay);
      console.log("weather");
      console.log("weather --", response.currently);
    });
  }

  weatherApi();

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
