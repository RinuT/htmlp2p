
    'use strict';

    var app=angular.module('myApp.invoice', ['ngRoute'])
    
    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/invoice', {
        templateUrl: 'invoice/invoice.html',
        controller: 'invoiceCtrl'
      })
      .when('/invoice-success', {
        templateUrl: 'invoice-success/invoice-success.html',
        controller: 'invoice-successCtrl'
      });
    }])
    
    app.controller('invoiceCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
      $scope.poData={}
  $scope.poData.poNumber=" "
  $scope.poData.materialCode=" "
  $scope.poData.batchId=" "
  $scope.poData.invoiceDoc=" "
  $scope.poData.quantity=" "
  $scope.poData.amount=" "
  $scope.poData.poStatus=" "
  $scope.poData.invoiceStatus=""
  $scope.PODataPending=[]
  $scope.PODataPaid=[];
  $scope.PODataGenerated=[];

  
  $scope.navigate=function(url){
    window.location = url;
}

  $scope.loading=true
  $scope.id=""
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


  $scope.onloadI=function(){
   

        $http.get("http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/SelfInvoice")
  .then(function(response) {
      $scope.res = response.data;
      for( var n=0;n<$scope.res.length;n++){
        $scope.poData['poNumber']=$scope.res[n].poNumber
        $scope.poData['materialCode']=$scope.res[n].materialCode
        $scope.poData['invoiceDoc']=$scope.res[n].invDocNum
        $scope.poData['quantity']=$scope.res[n].consumptionQuantity
        $scope.poData['amount']=$scope.res[n].invoiceAmount
        $scope.poData['poStatus']=$scope.res[n].invoiceStatus
         console.log($scope.poData)
      if( $scope.res[n].invoiceStatus =="Payment Pending" ){
  
      $scope.PODataPending.push($scope.poData) 
      $scope.Pending=true
     
  
     }
     else if( $scope.res[n].invoiceStatus =="Invoice Generated" ){
     
      $scope.PODataGenerated.push($scope.poData)
      $scope.Unpaid=true
      }
      else if( $scope.res[n].invoiceStatus =="Paid" ){
     
        $scope.PODataPaid.push($scope.poData)
        $scope.paid=true
         
        }
      $scope.loading=false
      $scope.poData={}
       
      }
      
  }, function errorCallback(response){
    $scope.failuer2=true
    $scope.loading=false
   });
          }
         $scope.generateInvoice=function(id){
          myservice.xxx=id
         }
   }]);
      
         app.controller('invoice-successCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {$scope.POData=[];
         
          $scope.navigate=function(url){
            window.location = url;
        
          }
          $scope.materialCode=" "
          $scope.batchId=" "
          $scope.poNumber=" "
          $scope.invoiceId=" "
          $scope.quantity=" "
          $scope.perUnitPrice=" "
          $scope.loading=false
    
          $scope.onLoadS=function(){
            $scope.loading=true
           
             
            $http.get("http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/SelfInvoice/"+myservice.xxx)
            .then(function(response) {
                $scope.res =  response.data;
                $scope.materialCode= $scope.res.materialCode
         $scope.batchId= $scope.res.batch.batchCode
         $scope.poNumber= $scope.res.poNumber
         $scope.invoiceId= $scope.res.invDocNum
         $scope.quantity= $scope.res.consumptionQuantity
         $scope.perUnitPrice= $scope.res.amount
          $scope.loading=false
          $scope.fialuier1=false  
            }, function errorCallback(response){
              $scope.fialuier1=true
              $scope.loading=false
             });
               
             
               
          }
          $scope.generate = function(){
            $scope.loading=true
           $scope.setValueInvoice();
           }
           $scope.setValueInvoice=function() {
             var requestInvoice=
             {
              "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
              "invDocNum":  $scope.invoiceId,
              "invoiceStatus": "Payment Pending",
              "report": {
                "$class": "com.cts.ipm.p2pNetwork.newReport",
                "transactionType": "",
                "date": "",
                "quantity": "",
                "poNumber": "",
                "materialCode": ""
              }
            }
            
              
        
               var requestInfo = RequestInvoice();
             
               data : requestInfo
           
               var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/InvoiceStatus',requestInvoice).then(function successCallback(response){
                //   alert("Successfully placed order");
                   $scope.update_response=response;
                   $scope.loading=false
                   $scope.Search1=true
                   $scope.sucess2=true
                   $scope.transactionId=$scope.update_response.data.transactionId
                   
               }, function errorCallback(response){
                 $scope.fialuier3=true
                 $scope.loading=false
               });
         }
         
           function RequestInvoice() {
           
             return {
               "Request" : {
                "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
                "invDocNum": " ",
                "invoiceStatus": "Payment Pending",
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
        
              
          app.service('myservice', function() {
            this.xxx = "yyy";
          });
      