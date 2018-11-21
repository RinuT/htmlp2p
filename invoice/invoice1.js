
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
    $scope.POData=[];
    $scope.notGenerated=[];
    $scope.PODataGenerated=[];
    $scope.PODataPaid=[];
    $scope.poData={}
    $scope.poData.invoiceNo=""
    $scope.poData.invoiceStatus=""
    $scope.poData.consumptionQuantity=""
    $scope.poData.diffDays=""
    $scope.poData.materialCode=""
    $scope.val="1"
    $scope.Search=false
    $scope.Search1=false
    $scope.fialuier2=false
    $scope.fialuier=false
    $scope.fialuier1=false
    $scope.BatchId=""
    $scope.PONumber=""
    $scope.LineNo=" "
    $scope.price=" "
    $scope.SEmaterialCode=" "
    $scope.POQty=" "
    $scope.UOP=" "
    $scope.DeliveryDate=" "
   $scope.Currency=" "
   $scope.deliveryNoteNo=" "
   $scope.shippmentDate=" "
   $scope.shippedQty=" "
   $scope.Unpaid=false
   $scope.notGen=false
   $scope.paid=false
   $scope.display=true
   $scope.Pending=false
    $scope.PODataPending=[]
    $scope.loading=true
    $scope.id=""
    function init(){
    var websocket =new WebSocket("ws://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000");
    websocket.addEventListener('open',evt =>doSocketOpen(evt));
    websocket.addEventListener('message',evt =>doSocketMessage(evt));
    websocket.addEventListener('close',evt =>doSocketClose(evt));
    }
    function doSocketClose(evt) {
    console.log('Close.');
    }
    function doSocketMessage(evt) {
      
   let data =JSON.parse(evt.data);
   if(data.purchaseorder.batch.length>0){
    for(var i=0;i<data.purchaseorder.batch.length;i++){
      if(data.purchaseorder.batch[i].batch.invoice.length>0){
     
      for(var j=0;j<data.purchaseorder.batch[i].batch.invoice.length;j++){
      $scope.poData.poNumber=data.poNumber
      $scope.poData.materialCode=data.purchaseorder.materialCode
      $scope.poData.batchId=data.purchaseorder.batch[i].batchCode
      $scope.poData.invoiceDoc=data.purchaseorder.batch[i].batch.invoice[j].invDocNum
      $scope.poData.perUnitPrice=data.purchaseorder.price
      $scope.poData.quantity=data.purchaseorder.recievedQuantity
      $scope.poData.amount=data.purchaseorder.price*data.purchaseorder.recievedQuantity
      if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Status Pending" ){
      $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
      $scope.PODataPending.push($scope.poData) 
      console.log("$scope.PODataPending")
      console.log($scope.PODataPending)
      $scope.Pending=true
      }
      else if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Invoice Generated" ){
        $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
        $scope.PODataGenerated.push($scope.poData)
        console.log("$scope.PODataGenerated")
      console.log($scope.PODataGenerated)
        $scope.Unpaid=true
        }
        else if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Paid" ){
          $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
          $scope.PODataPaid.push($scope.poData)
          console.log("$scope.PODataPaid")
      console.log($scope.PODataPaid) 
           $scope.paid=true
          }
  
      }    
      
    }
    else{
      $scope.poData.poNumber=data.poNumber
      $scope.poData.materialCode=data.purchaseorder.materialCode
      $scope.poData.batchId=data.purchaseorder.batch[i].batchCode
     // $scope.poData.invoiceDoc=data.purchaseorder.batch[i].batch.invoice[j].invDocNum
      $scope.poData.perUnitPrice=data.purchaseorder.price
      $scope.POData.push($scope.poData) 
      console.log("$scope.POData")
      console.log($scope.POData)
      
   $scope.notGen=true
    }
      
      $scope.poData={}
      $scope.loading=false
      }
   }
   
    //window.location.reload();
    }
  
    function doSocketOpen(evt) {
    console.log('Open.');
    }
    $scope.onload=function(){
      init()
      var requestInfo = Request();
      var request=
      {
        "$class": "com.cts.ipm.p2pNetwork.displayOrders",
        "supplier":"flextronics"
  }     
    var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/displayOrders',request).then(function successCallback(response){
                 $scope.update_response=response;
                 $scope.transactionId=$scope.update_response.data.transactionId
                
                 
             }, function errorCallback(response){
                 console.log("POST-ing of data failed");
                 $scope.loading=false
             });
    
       
       function Request() {
       
         return {
           "Request" : {
            "$class": "com.cts.ipm.p2pNetwork.displayOrders",
            "supplier":"flextronics"
      }     
           }
         };  
        
         
         }
           
         
   
            $scope.navigate=function(url){
                window.location = url;
    }
  
   
     }]);
  
     app.controller('invoice-successCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {$scope.POData=[];
    $scope.notGenerated=[];
    $scope.PODataGenerated=[];
    $scope.PODataPaid=[];
    $scope.poData={}
    $scope.poData.invoiceNo=""
    $scope.poData.invoiceStatus=""
    $scope.poData.consumptionQuantity=""
    $scope.poData.diffDays=""
    $scope.poData.materialCode=""
    $scope.val="1"
    $scope.Search=false
    $scope.Search1=false
    $scope.fialuier2=false
    $scope.fialuier=false
    $scope.fialuier1=false
    $scope.BatchId=""
    $scope.PONumber=""
    $scope.LineNo=" "
    $scope.price=" "
    $scope.SEmaterialCode=" "
    $scope.POQty=" "
    $scope.UOP=" "
    $scope.DeliveryDate=" "
   $scope.Currency=" "
   $scope.deliveryNoteNo=" "
   $scope.shippmentDate=" "
   $scope.shippedQty=" "
   $scope.Unpaid=false
   $scope.notGen=false
   $scope.paid=false
   $scope.display=true
   $scope.Pending=false
    $scope.PODataPending=[]
    $scope.loading=true
    $scope.id=""
    function init(){
    var websocket =new WebSocket("ws://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000");
    websocket.addEventListener('open',evt =>doSocketOpen(evt));
    websocket.addEventListener('message',evt =>doSocketMessage(evt));
    websocket.addEventListener('close',evt =>doSocketClose(evt));
    }
    function doSocketClose(evt) {
    console.log('Close.');
    }
    function doSocketMessage(evt) {
      
   let data =JSON.parse(evt.data);
   $scope.invoiceId=data.invDocNum
   $scope.perUnitPrice=data.amount
   $scope.poNumber=data.selfinvoice.poNumber
   $scope.materialCode=data.selfinvoice.materialCode 
   if(data.selfinvoice.consumptionQuantity!=undefined)
 $scope.quantity=data.selfinvoice.consumptionQuantity
 else
 $scope.quantity=data.selfinvoice.quantity
 $scope.totalPrice=$scope.quantity*data.amount 
    //window.location.reload();
    }
  
    function doSocketOpen(evt) {
    console.log('Open.');
    }
   
      init()
      var requestInfo = Request();
      var request=
      {
        "$class": "com.cts.ipm.p2pNetwork.displayInvoice",
        "supplier": myservice.xxx
  }     
    var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/displayInvoice',request).then(function successCallback(response){
                 $scope.update_response=response;
                 $scope.transactionId=$scope.update_response.data.transactionId
                
                 
             }, function errorCallback(response){
                 console.log("POST-ing of data failed");
                 $scope.loading=false
             });
    
       
       function Request() {
       
         return {
           "Request" : {
            "$class": "com.cts.ipm.p2pNetwork.displayInvoice",
            "supplier":""
      }     
           
         };  
         $scope.submit = function(id){
          $scope.loading=true
           $scope.id=id
          $scope.setValuePay();
          }
          $scope.setValuePay=function() {
            var requestPay=
                        {
                         
                         "$class": "com.cts.ipm.p2pNetwork.Payment",
                         "invDocNum":  $scope.id
                       
                        }
              var requestInfo = RequestPay();
            
              data : requestInfo
          
            var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/Payment',requestPay).then(function successCallback(response){
                 //   alert("Successfully placed order");
                    $scope.update_response=response;
                   
                    $scope.sucess1=true
                    $scope.transactionId=$scope.update_response.data.transactionId
                    $scope.loading=false
                    
                }, function errorCallback(response){
                  $scope.fialuier=true
                  $scope.loading=false
                });
          }
          $scope.navigate=function(url){
           window.location = url;
         
         }
          function RequestPay() {
          
            return {
              "Request" : {
               "$class": "com.cts.ipm.p2pNetwork.Payment",
             "invDocNum": " " 
               }
              }
            };   
         
  
    }
    $scope.generate = function(){
   
     $scope.setValueInvoice();
     }
     $scope.setValueInvoice=function() {
       var requestInvoice=
       {
        "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
        "invDocNum":myservice.xxx
      }
      
        
  
         var requestInfo = RequestInvoice();
       
         data : requestInfo
     
       var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/InvoiceStatus',requestInvoice).then(function successCallback(response){
            //   alert("Successfully placed order");
               $scope.update_response=response;
              
               $scope.Search1=true
               $scope.sucess2=true
               $scope.transactionId=$scope.update_response.data.transactionId
               
           }, function errorCallback(response){
             $scope.fialuier3=true
           });
     }
     $scope.navigate=function(url){
      window.location = url;
  
    }
     function RequestInvoice() {
     
       return {
         "Request" : {
          "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
          "invDocNum": "1"
        }
        
         }
       };
  
   
     }]);
  
        
    app.service('myservice', function() {
      this.xxx = "yyy";
    });