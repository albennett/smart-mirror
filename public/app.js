var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps']);

myApp.config(function($routeProvider){
  $routeProvider.when('/',{
    controller: 'MirrorController',
    templateUrl: 'views/mirror.html'
  })
});
