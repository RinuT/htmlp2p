'use strict';

angular.module('myApp.app_login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/app_login', {
    templateUrl: 'app_login/app_login.html',
    controller: 'app_loginCrtl'
  });
}])

.controller('app_loginCrtl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {

   
}]);