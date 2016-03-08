'use strict'
var myApp = angular.module("myApp");

myApp.controller('MirrorController', ['$scope', '$http','$location','$routeParams', '$q', '$window', function($scope, $http,$location, $routeParams, $q, $window){
  console.log('Mirror Controller Initialized...');

  const now = moment(new Date());
  const apikey = '6b33eb7b78a214401d2766c100aeae6a:5:74631439';
  const newsUrl = `http://api.nytimes.com/svc/topstories/v1/home.json?api-key=${apikey}`;
  const quotesUrl = 'http://quotes.rest/qod.json';
  // const googleKey = 'AIzaSyBWxxUFMPhxC64LOxG-G_mD-oc0siASEY8'

  $scope.time = now.format('LT');

//   const quoteApi = () => {
//     var deferred = $q.defer();

//     $http.get(quotesUrl)
//     .then(function (quote) {
//       console.log("data", quote.data.contents.quotes[0]);
//       deferred.resolve(quote);
//       $scope.quote = quote.data.contents.quotes[0].quote
//       $scope.author = quote.data.contents.quotes[0].author
//     })

//     .catch(function () {
//       deferred.reject();
//     });

//     // return promise object
//     return deferred.promise;
//   }
// quoteApi();

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

      console.log("weather", response);
      console.log("weather --", response.currently);
    });
  }

  weatherApi();

  // const googleMapsApi = () => {
  //   $http.get('/api/maps').success((response) => {
  //     $scope.map = response.rows[0].elements[0].duration.text
  //   });
  // }
  // googleMapsApi()



  var map;
    $window.initMap = function () {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 36.174465, lng: -86.767960},
        zoom: 10
      });
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }

    // (function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //   directionsService.route({
    //     origin: "700 Wilsonwood Pl Nashville, TN 37206",
    //     destination: "500 Interstate Blvd S, Nashville, TN 37210, USA",
    //     provideRouteAlternatives: true,
    //     travelMode: google.maps.TravelMode.DRIVING,
    //     drivingOptions: {
    //       departureTime: new Date(/* now, or future date */),
    //       trafficModel: google.maps.TrafficModel.OPTIMISTIC
    //     }
    //   }, function(response, status) {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       directionsDisplay.setDirections(response);
    //     }
    //   });
    // })();



}]);
