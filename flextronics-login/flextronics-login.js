'use strict';

angular.module('myApp.flextronics-login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-login', {
    templateUrl: 'flextronics-login/flextronics-login.html',
    controller:'flextronics-loginCtrl'
  });
}])

.controller('flextronics-loginCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
    $scope.userId="";
    $scope.pass="";
  
    $scope.login=function(){
       $scope.userId=$scope.user
       $scope.pass=$scope.password
       if($scope.userId=="flextronics" & $scope.pass=="pass"){
        location.replace("/index.html#!/flextronics-purchase-order");
        }
       else
        alert('Login incorrect');
    }
       
      }]);
  