'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', '$window', 'CalendarService', function($scope, $http,$location, $routeParams, $q, $window, CalendarService){
  console.log('Mirror Controller Initialized...');

  const now = moment(new Date());

  $scope.date = moment().format('MMMM Do')

  const calendarApi = () => {
    CalendarService.checkAuth()
  }

  $scope.handleAuth = (event) => {
    CalendarService.handleAuthClick(event)
  }

  function flashTime() {

    const time = moment().format('LT')
    $('#my_box1').html(time);
  }
  setInterval(flashTime, 1000*2);

  function quoteApi () {
    $http.get('/api/quote').success((response) => {
      $scope.quote = response.contents.quotes[0].quote;
      $scope.author = response.contents.quotes[0].author;
      console.log("quote updated");
    });
  }
  quoteApi()

  setInterval(quoteApi, 10800000); //three hours

  function newsApi () {
    $http.get('/api/news').success((response) => {
      $scope.news = response.results;
      console.log("news updated");
    });
  }
  newsApi()
  setInterval(quoteApi, 10800000); //three hours


  function weatherApi () {
    $http.get('/api/weather').success((response) => {
      $scope.fiveDay = response.daily.data;
      $scope.weather = response.currently;
      $scope.temperature = parseInt(response.currently.temperature)
      console.log("response", response);
      console.log("weather updated");
    });
  }
  weatherApi()
  setInterval(weatherApi, 60000*2); //2 minutes

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

}]);
