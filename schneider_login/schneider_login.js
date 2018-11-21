'use strict';

angular.module('myApp.schneider_login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_login', {
    templateUrl: 'schneider_login/schneider_login.html',
    controller:'schneider_loginCtrl'
  });
}])

.controller('schneider_loginCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
    $scope.userId="";
    $scope.pass="";
  
    $scope.login=function(){
       $scope.userId=$scope.user
       $scope.pass=$scope.password
       if($scope.userId=="schneider" & $scope.pass=="pass"){
        location.replace("/index.html#!/schneider_purchaseOrder");
        }
       else
        alert('Login incorrect');
    }
       
      }]);