'use strict';

angular.module('myApp.schneider_purchaseOrder', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_purchaseOrder', {
    templateUrl: 'schneider_purchaseOrder/schneider_purchaseOrder.html',
    controller:'schneider_purchaseOrderCtrl'
  });
}])

.controller('schneider_purchaseOrderCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
  $scope.fialuier=false
  $scope.loading = false;  
  $scope.sucess=false
  var acc = document.getElementsByClassName("accordion");
  var i;
  $scope.CreationDate = new Date();
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
  $scope.navigate=function(url){
    window.location = url;

  }
  
   $scope.submit = function(){

    $scope.loading = true;  
   $scope.setValue();
   }
   $scope.setValue=function() {
     var DeliveryDate = new Date();
     DeliveryDate=$scope.DeliveryDate
     var CreationDate = new Date();
     CreationDate=$scope.CreationDate
     if(CreationDate <DeliveryDate){
      var request=
                    {
          "$class": "com.cts.ipm.p2pNetwork.PlaceOrder",
          "poNumber": $scope.PONumber,
          "purchaseorder": {
            "$class": "com.cts.ipm.p2pNetwork.newpurchaseorder",
            "lineNumber": $scope.LineNo,
            "materialCode": $scope.SEmaterialCode,
            "orderQuantity": $scope.POQty,
            "shippedQuantity": "0",
            "receivedQuantity": "0",
            "requiredQuantity": "0",
            "availableQuantity": "0",
            "uop": $scope.UOP,
            "deliveryDate": DeliveryDate.toString(),
            "creationDate": CreationDate.toString(),
            "price":$scope.Price,
            "currency": $scope.Currency,
            "supplier":  "flextronics",
            "manufacturer": "",
            "orderStatus": "",
            "batch": []
          },
          "report": {
            "$class": "com.cts.ipm.p2pNetwork.newReport",
            "transactionType": "Place Order",
            "date": CreationDate.toString(),
            "quantity": $scope.POQty,
            "poNumber": $scope.PONumber,
            "materialCode": $scope.SEmaterialCode
          }
        }

                
       var requestInfo = Request();
     
       data : requestInfo
   
     var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/PlaceOrder',request).then(function successCallback(response){
             //alert("Successfully placed order");
             $scope.update_response=response;
             $scope.loading = false; 
             $scope.sucess=true
             $scope.fialuier_date=false
             $scope.fialuier=false
             $scope.transactionId=$scope.update_response.data.transactionId
             
         }, function errorCallback(response){
             $scope.fialuier=true
             $scope.loading = false; 
             $scope.fialuier_date=false
             $scope.sucess=false
         });

        }else{
          $scope.fialuier_date=true
          $scope.loading = false; 
        }
            }

   function Request() {
   
     return {
       "Request" : {
        "$class": "com.cts.ipm.p2pNetwork.PlaceOrder",
        "poNumber": "",
        "purchaseorder": {
          "$class": "com.cts.ipm.p2pNetwork.newpurchaseorder",
          "lineNumber": "",
          "materialCode": "",
          "orderQuantity": "",
          "shippedQuantity": "",
          "receivedQuantity": "",
          "requiredQuantity": "",
          "availableQuantity": "",
          "uop": "",
          "deliveryDate": "",
          "creationDate": "",
          "price": "",
          "currency": "",
          "supplier": "",
          "manufacturer": "",
          "orderStatus": "",
          "batch": []
        },
        "report": {
          "$class": "com.cts.ipm.p2pNetwork.newReport",
          "transactionType": "",
          "date": "",
          "quantity": "",
          "poNumber": "",
          "materialCode": ""
        }
      }

       }

     };
   }]);
