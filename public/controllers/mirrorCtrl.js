'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', function($scope, $http,$location, $routeParams, $q){
  console.log('Mirror Controller Initialized...');

  const now = moment(new Date());
  const apikey = '6b33eb7b78a214401d2766c100aeae6a:5:74631439';
  const newsUrl = `http://api.nytimes.com/svc/topstories/v1/home.json?api-key=${apikey}`;
  const quotesUrl = 'http://quotes.rest/qod.json';
  const googleKey = 'AIzaSyBWxxUFMPhxC64LOxG-G_mD-oc0siASEY8'
  const weatherUrl = 'https://api.forecast.io/forecast/88eb88be23406cc2c563c798d72aa649/36.1820800,-86.7278270'
  const googleMapsUrl = 'https://maps.googleapis.com/maps/api/distancematrix/jsonp?origins=700+Wilsonwood+Pl.+Nashville,+TN+37206&destinations=500+Interstate+Blvd+S,+Nashville,+TN+37210&mode=driving&language=en'

  $scope.time = now.format('LT');

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
      $scope.weather = response;
      console.log("response", response);
    });
  }

  const googleMapsApi = () => {
    $http.get('/api/maps').success((response) => {
      $scope.map = response;
      console.log("response", response);
    });
  }


}]);
