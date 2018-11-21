'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.flextronics-notifications',
  'myApp.flextronics-report',
  'myApp.invoice',
  'myApp.app_login',
  'myApp.flextronics-purchase-order',
  'myApp.schneider_goodReceipt',
  'myApp.schneider_invoice',
  'myApp.schneider_notifications',
  'myApp.schneider_payment',
  'myApp.schneider_purchaseOrder',
  'myApp.schneider_report',
  'myApp.schneider_purchaseOrder_search',
  'myApp.schneider_consumption',
  'myApp.flextronics-login',
  'myApp.schneider_login',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/app_login'});
}]);
