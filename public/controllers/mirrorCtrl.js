'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', '$window', function($scope, $http,$location, $routeParams, $q, $window){

  const now = moment(new Date());
  const googleKey = 'AIzaSyBWxxUFMPhxC64LOxG-G_mD-oc0siASEY8'

  $scope.time = now.format('LT');
  $scope.date = moment().format('MMMM Do YYYY')

  const quoteApi = () => {
    $http.get('/api/quote').success((response) => {
      console.log("quote response", response);
      $scope.quote = response.contents.quotes[0].quote;
      $scope.author = response.contents.quotes[0].author;
    });
  }
  quoteApi();

  // $scope.map = { center: { latitude: 36.174465, longitude: -86.767960 }, zoom: 8 };

  const newsApi = () => {
    $http.get('/api/news').success((response) => {
      $scope.news = response.results;
    });
  }
  newsApi()

  const weatherApi = () => {
    $http.get('/api/weather').success((response) => {
      $scope.weather = response.currently;
      $scope.temperature = parseInt(response.currently.temperature)
      $scope.fiveDay = response.daily.data
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
